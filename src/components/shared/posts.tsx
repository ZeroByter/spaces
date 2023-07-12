import { FC } from "react";
import Post from "./post";
import PostsSQL from "@/serverlib/sql-classes/posts";
import css from "./posts.module.scss";
import { cookies } from "next/headers";
import { decryptAccountToken } from "@/serverlib/auth";

type Props = {
  source: "global" | "space";
  spaceId?: string;
};

async function getUserId() {
  const account = cookies().get("account")?.value;

  if (!account) {
    return null;
  }

  const { id } = decryptAccountToken(account);

  return id;
}

const Posts: FC<Props> = async ({ source, spaceId }) => {
  const getPosts = async () => {
    if (source == "global") {
      return await PostsSQL.getLatestGlobal(await getUserId());
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
