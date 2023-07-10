import { getLoginSession, setLoginSession } from "@/serverlib/auth";
import { randomId } from "@/serverlib/essentials";
import PostsSQL from "@/serverlib/sql-classes/posts";
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

  const space = await SpacesSQL.getByTechName(res.space);

  if (space == null) {
    return NextResponse.json({
      error: "Space does not exist",
    });
  }

  // Generating navtext for post
  const title = res.title as string;
  const originalNavText = title
    .toLowerCase()
    .split(" ")
    .map((str) => str.replace(/[\W\d_]/g, ""))
    .slice(0, 10)
    .join("-");
  let finalNavText = originalNavText;

  if (await PostsSQL.getByNavText(finalNavText)) {
    while (true) {
      finalNavText = originalNavText + randomId(4);
      const existingNavText = await PostsSQL.getByNavText(finalNavText);

      if (!existingNavText) {
        break;
      }
    }
  }

  await PostsSQL.create(user.id, space.id, title, res.text, finalNavText);

  const response = NextResponse.json({
    error: null,
    data: {
      navtext: finalNavText,
    },
  });

  return response;
}
