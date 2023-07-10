"use client";

import { FC } from "react";
import css from "./searchResult.module.scss";
import ClientPost from "@/types/clientPost";
import ClientComment from "@/types/clientComment";
import ServerSpace from "@/types/serverSpace";
import ClientUser from "@/types/clientUser";
import { renderTimestamp } from "@/clientlib/essentials";
import Link from "next/link";

type Props = {
  result: any;
};

const SearchResult: FC<Props> = ({ result }) => {
  if (result.type == "post") {
    const post = result as ClientPost;

    // TODO: need to get info about space somehow

    return (
      <Link href={`/s/placeholder/p/placeholder`}>
        <div className={css.root}>
          <div>s/placeholder at {renderTimestamp(post.timecreated)}</div>
          <div>{post.title}</div>
        </div>
      </Link>
    );
  } else if (result.type == "comment") {
    const comment = result as ClientComment;

    // TODO: need to get info about space somehow
    // TODO: need to get info about post somehow

    return (
      <Link href={`/s/placeholder/p/placeholder`}>
        <div className={css.root}>
          <div>
            Under &apos;placeholder&apos; at s/placeholder at{" "}
            {renderTimestamp(comment.timecreated)}
          </div>
          <div>{comment.text}</div>
        </div>
      </Link>
    );
  } else if (result.type == "space") {
    const space = result as ServerSpace;

    return (
      <Link href={`/s/${space.techname}`}>
        <div className={css.root}>s/{space.name}</div>
      </Link>
    );
  } else if (result.type == "user") {
    const user = result as ClientUser;

    return <div className={css.root}>{user.username}</div>;
  }

  return null;
};

export default SearchResult;
