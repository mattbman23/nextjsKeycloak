"use server";

import { auth, signIn } from "@/auth";
import { decrypt } from "@/utils/authTokens";
import { AuthError } from "next-auth";

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

interface ILogin {
  username: string;
  password: string;
}

export const login = async ({ username, password }: ILogin) => {
  try {
    await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong..." };
      }
    }
    throw err;
  }
};
