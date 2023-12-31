import { getLoginSession } from "@/serverlib/auth";
import CommentsSQL from "@/serverlib/sql-classes/comments";
import PostsSQL from "@/serverlib/sql-classes/posts";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = getLoginSession(request);

  const searchParams = new URLSearchParams(request.url);

  let search = "";
  for (const value of searchParams.values()) {
    search = value;
    break;
  }

  const searchSpaces = (await SpacesSQL.search(search)).map((space) => ({
    ...space,
    type: "space",
  }));
  const searchPosts = (await PostsSQL.search(search, user?.id)).map((post) => ({
    ...post,
    type: "post",
  }));
  const searchComments = (await CommentsSQL.search(search)).map((comment) => ({
    ...comment,
    type: "comment",
  }));
  // const searchUsers = (await UsersSQL.search(search)).map((user) => ({
  //   ...user,
  //   type: "user",
  // }));

  return NextResponse.json({
    error: null,
    data: [...searchSpaces, ...searchPosts, ...searchComments],
  });
}
