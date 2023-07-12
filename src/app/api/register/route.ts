import { setLoginSession } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  const newUserId = await UsersSQL.create(
    res.username,
    res.password,
    res.email
  );

  const response = NextResponse.json({
    error: null,
  });

  await setLoginSession(response, { id: newUserId });

  return response;
}
