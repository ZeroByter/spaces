import { serialize, parse } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const TOKEN_NAME = "account";

export const MAX_AGE = 60 * 60 * 64 * 365; // 6 hours

export function setTokenCookie(res: NextResponse, token: string) {
  res.cookies.set(TOKEN_NAME, token, {
    // maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000), //only session test...
    httpOnly: false,
    secure: false, //process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict",
  });
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TOKEN_NAME, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

export function parseCookies(req: NextRequest) {
  return req.cookies;
}

export function getTokenCookie(req: NextRequest) {
  const cookies = parseCookies(req);
  return cookies.get(TOKEN_NAME)?.value;
}
