import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";
import KeycloakProvider from "next-auth/providers/keycloak";
import CredentialProvider from "next-auth/providers/credentials";
import { encrypt } from "./utils/authTokens";
import axios from "axios";

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
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", text: "text" },
        password: { label: "Password", text: "password" },
      },
      async authorize(credentials) {
        const data = new URLSearchParams();
        data.append("client_id", process.env.KEYCLOAK_CLIENT_ID);
        data.append("client_secret", process.env.KEYCLOAK_SECRET);
        data.append("grant_type", "password");
        data.append("scope", "openid");
        data.append("username", credentials.username as string);
        data.append("password", credentials.password as string);

        try {
          const response = await axios.post(
            process.env.KEYCLOAK_REFRESH_URL,
            data,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );
          return response.data;
        } catch (err) {
          console.error("Invalid credentials");
          return null;
        }
      },
    }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID,
      clientSecret: process.env.KEYCLOAK_SECRET,
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  trustHost: true,
  callbacks: {
    // @ts-expect-error jwt type error
    async jwt({ token, account, user }) {
      // using credentials provider
      if (account?.provider === "credentials") {
        token.decoded = jwtDecode(user.access_token!);
        token.access_token = user.access_token!;
        token.id_token = user.id_token!;
        token.expires_in = user.expires_in;
        token.refresh_token = user.refresh_token;
        return token;
      } else {
        // use keycloak provider
        if (account) {
          token.decoded = jwtDecode(account.access_token!);
          token.access_token = account.access_token!;
          token.id_token = account.id_token!;
          token.expires_in = account.expires_in!;
          token.refresh_token = account.refresh_token;
          token.type = "credential";
          return token;
        } else if (Date.now() < token.expires_in * 1000) {
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
      }
    },
    async session({ session, token }) {
      session.user.email = token.decoded.email;
      session.user.name = token.decoded.name;

      session.access_token = encrypt(token.access_token);
      session.id_token = encrypt(token.id_token);
      session.roles = token.decoded.realm_access.roles;
      session.error = token.error;
      session.ac = token.access_token;

      return session;
    },
  },
});
