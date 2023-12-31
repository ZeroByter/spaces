import { getLoginSession } from "@/serverlib/auth";
import PostsSQL from "@/serverlib/sql-classes/posts";
import PostVotesSQL from "@/serverlib/sql-classes/postvotes";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const res = await request.json();

  const user = getLoginSession(request);

  if (user == null) {
    return NextResponse.json({
      error: "You must be logged in",
    });
  }

  const { postId, vote } = res;

  const post = await PostsSQL.getById(postId);
  if (!post) {
    return NextResponse.json({
      error: "Post doesn't exist",
    });
  }

  if (typeof vote != "boolean") {
    return NextResponse.json({
      error: "Vote must be a boolean",
    });
  }

  const currentVote = await PostVotesSQL.getVote(post.id, user.id);

  await PostVotesSQL.deleteVote(post.id, user.id);

  if (!currentVote || currentVote.positive != vote) {
    await PostVotesSQL.create(post.id, user.id, vote);
  }

  const newVotes = await PostVotesSQL.getVotes(post.id);

  const response = NextResponse.json({
    error: null,
    data: {
      newVotes,
      newUserVote: await PostVotesSQL.getVoteAsNumber(post.id, user.id),
    },
  });

  return response;
}
