import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    access_token: string;
    decoded: {
      realm_access: {
        sub: string;
        roles: string[];
        name: string;
        email: string;
      };
      email: string;
      name: string;
    };
    id_token: string;
    expires_in: number;
    refresh_token: string | undefined;
    error: string?;
    type: string?;
  }
}

declare module "next-auth" {
  interface Session {
    // user: {
    //   role: string;
    //   access_token: string;
    // } & DefaultSession["user"];
    id_token: string;
    access_token: string;
    roles: string[];
    error: string?;
    ac: string;
  }
  interface User {
    role: string;
    access_token: string?;
    id_token: string;
    expires_in: number;
    refresh_token: string;
  }
}
