import UsersSQL from "@/serverlib/sql-classes/users";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();

  UsersSQL.create(res.username, res.password, res.email);

  return NextResponse.json({
    error: null,
  });
}
