import Posts from "@/components/space/posts";
import PostsSQL from "@/serverlib/sql-classes/posts";
import { FC } from "react";

const getPosts = async () => {
  return PostsSQL.getLatestGlobal();
};

const Home: FC = async () => {
  const posts = await getPosts();

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default Home;
