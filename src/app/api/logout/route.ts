import { deleteLoginSession } from "@/serverlib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const response = NextResponse.json({});

  await deleteLoginSession(response);

  return response;
}
