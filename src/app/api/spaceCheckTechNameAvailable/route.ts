import { getLoginSession, setLoginSession } from "@/serverlib/auth";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const params = new URLSearchParams(request.url);

  let techname = "";
  for (const value of params.values()) {
    techname = value;
    break;
  }

  const user = getLoginSession(request);

  if (user == null) {
    return NextResponse.json({
      error: "You must be logged in",
    });
  }

  return NextResponse.json({
    error: null,
    data: {
      available: (await SpacesSQL.getByTechName(techname)) == null,
    },
  });
}
