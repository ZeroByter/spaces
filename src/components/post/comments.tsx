"use client";

import { FC, useState } from "react";
import CreateComment from "./createComment";
import Comment from "../shared/comment";
import ClientPost from "@/types/clientPost";
import ClientComment from "@/types/clientComment";

type Props = {
  post: ClientPost;
  initialComments: ClientComment[];
};

const Comments: FC<Props> = ({ post, initialComments }) => {
  const [comments, setComments] = useState(initialComments);

  const renderComments = comments.map((comment) => {
    return <Comment key={comment.id} comment={comment} />;
  });

  return (
    <div>
      <CreateComment post={post} setComments={setComments} />
      <div>{renderComments}</div>
    </div>
  );
};

export default Comments;
