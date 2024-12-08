export interface IGlobalStore {
  chat_elements: JSX.Element[];
  clear_chat: () => void;
  update_chat_elements: (chatEle: JSX.Element) => void;
}

export interface IMessage {
  by: string;
  message: string;
  datetime: Date;
}

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
      POSTGREST_API_URL: string;
      BACKEND_URL: string;
      NEXT_PUBLIC_BACKEND_URL: string;
      BACKEND_URL: string;
    }
  }
}

export {};
