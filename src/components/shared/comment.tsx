import { FC } from "react";

type Props = {
  comment: any;
};

const Comment: FC<Props> = ({ comment }) => {
  return <div>{comment.text}</div>;
};

export default Comment;
