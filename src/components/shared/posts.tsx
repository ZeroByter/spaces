import { FC } from "react";
import Post from "./post";
import PostsSQL from "@/serverlib/sql-classes/posts";
import css from "./posts.module.scss";

type Props = {
  source: "global" | "space";
  spaceId?: string;
};

const Posts: FC<Props> = async ({ source, spaceId }) => {
  const getPosts = async () => {
    if (source == "global") {
      return await PostsSQL.getLatestGlobal();
    } else if (source == "space") {
      return await PostsSQL.getBySpaceId(spaceId as string);
    }

    return [];
  };

  const posts = await getPosts();

  const renderPosts = posts.map((post) => {
    return <Post key={post.id} post={post} />;
  });

  return (
    <div className={css.root}>
      <div className={css.posts}>{renderPosts}</div>
    </div>
  );
};

export default Posts;
