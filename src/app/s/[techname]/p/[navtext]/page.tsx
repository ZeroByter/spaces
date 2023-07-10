import Comments from "@/components/post/comments";
import CommentsSQL from "@/serverlib/sql-classes/comments";
import PostsSQL from "@/serverlib/sql-classes/posts";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { notFound } from "next/navigation";
import { FC } from "react";

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
  return CommentsSQL.getByPostId(postId);
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
    <div>
      <div>{post.title}</div>
      <div>{post.text}</div>
      <Comments post={post} initialComments={comments} />
    </div>
  );
};

export default Space;
