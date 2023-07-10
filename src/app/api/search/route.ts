import CommentsSQL from "@/serverlib/sql-classes/comments";
import PostsSQL from "@/serverlib/sql-classes/posts";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import UsersSQL from "@/serverlib/sql-classes/users";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  const searchPosts = (await PostsSQL.search(search)).map((post) => ({
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
