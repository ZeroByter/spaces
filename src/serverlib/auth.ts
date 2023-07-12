import cryptoJs from "crypto-js";
import {
  MAX_AGE,
  setTokenCookie,
  getTokenCookie,
  deleteTokenCookie,
} from "./authCookies";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

const TOKEN_SECRET = process.env.TOKEN_SECRET;

export function getDeleteToken() {
  return cryptoJs.AES.encrypt(JSON.stringify({}), TOKEN_SECRET);
}

export function getToken(session: { [name: string]: string }) {
  const createdAt = Date.now();
  // // Create a session object with a max age that we can validate later
  const obj = { ...session, createdAt, maxAge: MAX_AGE };
  const token = cryptoJs.AES.encrypt(JSON.stringify(obj), TOKEN_SECRET);
  // const token = await Iron.seal(obj, TOKEN_SECRET, Iron.defaults)

  return token;
}

export function setLoginSession(
  res: NextResponse,
  session: { [name: string]: string }
) {
  const token = getToken(session);

  setTokenCookie(res, token.toString());
}

export function deleteLoginSession(res: NextResponse) {
  const token = getDeleteToken();

  deleteTokenCookie(res, token.toString());
}

export function decryptAccountToken(token: string) {
  // const session = await Iron.unseal(token, TOKEN_SECRET, Iron.defaults)
  const session = JSON.parse(
    Buffer.from(
      cryptoJs.AES.decrypt(token, TOKEN_SECRET).toString(),
      "hex"
    ).toString("binary")
  );
  const expiresAt = session.createdAt + session.maxAge * 1000;

  // Validate the expiration date of the session
  if (Date.now() > expiresAt) {
    return;
    //throw new Error('Session expired')
  }

  return session;
}

export function getLoginSession(req: NextRequest) {
  const token = getTokenCookie(req);

  if (!token) return;

  return decryptAccountToken(token);
}
