import { getLoginSession } from "@/serverlib/auth";
import CommentsSQL from "@/serverlib/sql-classes/comments";
import CommentVotesSQL from "@/serverlib/sql-classes/commentvotes";
import PostsSQL from "@/serverlib/sql-classes/posts";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const user = getLoginSession(request);

  if (user == null) {
    return NextResponse.json({
      error: "You must be logged in",
    });
  }

  const post = await PostsSQL.getById(res.postId);

  if (post == null) {
    return NextResponse.json({
      error: "Post does not exist",
    });
  }

  const commentId = await CommentsSQL.create(
    user.id,
    post.id,
    undefined,
    res.text
  );
  await CommentVotesSQL.create(commentId, user.id, true);

  const newComments = await CommentsSQL.getByPostId(post.id);

  const response = NextResponse.json({
    error: null,
    data: {
      newComments,
    },
  });

  return response;
}
