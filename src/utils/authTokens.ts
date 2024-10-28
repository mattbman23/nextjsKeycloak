import { auth } from "@/auth";
import Cryptr from "cryptr";

export const encrypt = (text: string) => {
  const secret_key = process.env.AUTH_SECRET;
  const cryptr = new Cryptr(secret_key);
  const encrypted = cryptr.encrypt(text);
  return encrypted;
};

export const decrypt = (encryptedString: string) => {
  const secret_key = process.env.AUTH_SECRET;
  const cryptr = new Cryptr(secret_key);
  const decrypted = cryptr.decrypt(encryptedString);
  return decrypted;
};

export const getAccessToken = async () => {
  const session = await auth();
  if (session) {
    const decryptedAccessToken = decrypt(session.access_token);
    return decryptedAccessToken;
  }
  return null;
};
