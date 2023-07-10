import { setLoginSession } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  const existingUser = await UsersSQL.getByUsernameAndPassword(
    res.username,
    res.password
  );

  if (existingUser == null) {
    return NextResponse.json({
      error: "User does not exist",
    });
  }

  const response = NextResponse.json({
    error: null,
  });

  await setLoginSession(response, { id: existingUser.id });

  return response;
}
