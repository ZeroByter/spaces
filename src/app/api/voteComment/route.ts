import { getLoginSession } from "@/serverlib/auth";
import CommentsSQL from "@/serverlib/sql-classes/comments";
import CommentVotesSQL from "@/serverlib/sql-classes/commentvotes";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const user = getLoginSession(request);

  if (user == null) {
    return NextResponse.json({
      error: "You must be logged in",
    });
  }

  const { commentId, vote } = res;

  const comment = await CommentsSQL.getById(commentId);
  if (!comment) {
    return NextResponse.json({
      error: "Comment doesn't exist",
    });
  }

  if (typeof vote != "boolean") {
    return NextResponse.json({
      error: "Vote must be a boolean",
    });
  }

  const currentVote = await CommentVotesSQL.getVote(comment.id, user.id);

  await CommentVotesSQL.deleteVote(comment.id, user.id);

  if (!currentVote || currentVote.positive != vote) {
    await CommentVotesSQL.create(comment.id, user.id, vote);
  }

  const newVotes = await CommentVotesSQL.getVotes(comment.id);

  const response = NextResponse.json({
    error: null,
    data: {
      newVotes,
    },
  });

  return response;
}
