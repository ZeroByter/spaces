import { getLoginSession, setLoginSession } from "@/serverlib/auth";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const user = getLoginSession(request);

  if (user == null) {
    return NextResponse.json({
      error: "You must be logged in",
    });
  }

  SpacesSQL.create(res.name, res.techname);

  const response = NextResponse.json({
    error: null,
  });

  return response;
}
