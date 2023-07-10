import { FC } from "react";
import css from "./post.module.scss";
import Link from "next/link";
import ClientPost from "@/types/clientPost";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import { renderTimestamp } from "@/clientlib/essentials";

type Props = {
  post: ClientPost;
};

const getSpace = async (post: ClientPost) => {
  return await SpacesSQL.getById(post.spaceid);
};

const Post: FC<Props> = async ({ post }) => {
  const space = await getSpace(post);

  return (
    <div className={css.root}>
      <div className={css.header}>
        <div className={css.source}>
          <Link href={`/s/${space.techname}`}>s/{space.name}</Link> -{" "}
          {post.createdBy.username}
        </div>
        <div className={css.time}>{renderTimestamp(post.timecreated)}</div>
      </div>
      <Link href={`/s/${space.techname}/p/${post.navtext}`}>
        <div className={css.text}>{post.text}</div>
      </Link>
    </div>
  );
};

export default Post;
