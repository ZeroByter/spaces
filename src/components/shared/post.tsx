import { FC } from "react";

type Props = {
  post: any;
};

const Post: FC<Props> = ({ post }) => {
  return <div>{post.title}</div>;
};

export default Post;
