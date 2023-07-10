import Comments from "@/components/post/comments";
import CommentsSQL from "@/serverlib/sql-classes/comments";
import PostsSQL from "@/serverlib/sql-classes/posts";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { notFound } from "next/navigation";
import { FC } from "react";
import css from "./page.module.scss";
import { renderTimestamp } from "@/clientlib/essentials";

const getSpace = async (techname: string) => {
  const space = await SpacesSQL.getByTechName(techname);

  if (!space) {
    notFound();
  }

  return space;
};

const getPost = async (navtext: string) => {
  const post = await PostsSQL.getByNavText(navtext);

  if (!post) {
    notFound();
  }

  return post;
};

const getComments = async (postId: string) => {
  return await CommentsSQL.getByPostId(postId);
};

type Props = {
  params: {
    techname: string;
    navtext: string;
  };
};

const Space: FC<Props> = async ({ params }) => {
  await getSpace(params.techname); //still called to check if space exists
  const post = await getPost(params.navtext);
  const comments = await getComments(post.id);

  return (
    <div className={css.root}>
      <div>
        <span className={css.title}>{post.title}</span> - created at{" "}
        {renderTimestamp(post.timecreated)}
      </div>
      <div className={css.text}>{post.text}</div>
      <Comments post={post} initialComments={comments} />
    </div>
  );
};

export default Space;
