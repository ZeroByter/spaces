import { FC } from "react";
import Post from "../shared/post";

type Props = {
  posts: any[];
};

const Posts: FC<Props> = ({ posts }) => {
  const renderPosts = posts.map((post) => {
    return <Post key={post.id} post={post} />;
  });

  return <div>{renderPosts}</div>;
};

export default Posts;