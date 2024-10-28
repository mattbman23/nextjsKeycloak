"use server";

import { auth } from "@/auth";
import { decrypt } from "@/utils/authTokens";

export const logout_session = async () => {
  const session = await auth();
  if (session) {
    const idToken = decrypt(session.id_token);
    try {
      const url = `${
        process.env.KEYCLOAK_LOGOUT_URL
      }?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(
        process.env.NEXTAUTH_URL
      )}`;
      await fetch(url, { method: "GET" });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  return false;
};
