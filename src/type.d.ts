declare global {
  namespace NodeJS {
    interface ProcessEnv {
      AUTH_SECRET: string;
      NEXTAUTH_URL: string;
      KEYCLOAK_CLIENT_ID: string;
      KEYCLOAK_SECRET: string;
      KEYCLOAK_ISSUER: string;
      KEYCLOAK_REFRESH_URL: string;
      KEYCLOAK_LOGOUT_URL: string;
    }
  }
}

export {};
