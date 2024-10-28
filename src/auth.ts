import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import KeycloakProvider from "next-auth/providers/keycloak";
import { encrypt } from "./utils/authTokens";

async function refreshAccessToken(token: JWT) {
  const resp = await fetch(process.env.KEYCLOAK_REFRESH_URL, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID!,
      client_secret: process.env.KEYCLOAK_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refresh_token!,
    }),
    method: "POST",
  });
  const refreshToken = await resp.json();
  if (!resp.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token),
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  trustHost: true,
  callbacks: {
    // @ts-expect-error jwt type error
    async jwt({ token, account }) {
      if (account) {
        token.decoded = jwtDecode(account.access_token!);
        token.access_token = account.access_token!;
        token.id_token = account.id_token!;
        token.expires_at = account.expires_at!;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (Date.now() < token.expires_at * 1000) {
        return token;
      } else {
        // token expired. Will refresh
        try {
          const refreshToken = await refreshAccessToken(token);
          return refreshToken;
        } catch (err) {
          console.error("Error refreshing access token: ", err);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },
    async session({ session, token }) {
      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      session.roles = token.decoded.realm_access.roles;
      session.error = token.error;
      return session;
    },
  },
});
