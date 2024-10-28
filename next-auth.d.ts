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
    };
    id_token: string;
    expires_at: number;
    refresh_token: string | undefined;
    error: string?;
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
  }
  interface User {
    role: string;
  }
}
