"use client";

import { FC } from "react";
import css from "./searchResult.module.scss";
import { ClientPostWithSpace } from "@/types/clientPost";
import { ClientCommentWithSpaceAndPost } from "@/types/clientComment";
import ServerSpace from "@/types/serverSpace";
import ClientUser from "@/types/clientUser";
import { renderTimestamp } from "@/clientlib/essentials";
import Link from "next/link";

type Props = {
  result: any;
  clearSearch: () => void;
};

const SearchResult: FC<Props> = ({ result, clearSearch }) => {
  if (result.type == "post") {
    const post = result as ClientPostWithSpace;

    return (
      <Link
        href={`/s/${post.space.techname}/p/${post.navtext}`}
        onClick={clearSearch}
      >
        <div className={css.root}>
          <div className={css.type}>Post</div>
          <div className={css.header}>
            s/{post.space.name} at {renderTimestamp(post.timecreated)}
          </div>
          <div>{post.title}</div>
        </div>
      </Link>
    );
  } else if (result.type == "comment") {
    const comment = result as ClientCommentWithSpaceAndPost;

    return (
      <Link
        href={`/s/${comment.post.space.techname}/p/${comment.post.navtext}`}
        onClick={clearSearch}
      >
        <div className={css.root}>
          <div className={css.type}>Comment</div>
          <div className={css.header}>
            Under &apos;{comment.post.title}&apos; at s/
            {comment.post.space.name} at {renderTimestamp(comment.timecreated)}
          </div>
          <div>{comment.text}</div>
        </div>
      </Link>
    );
  } else if (result.type == "space") {
    const space = result as ServerSpace;

    return (
      <Link href={`/s/${space.techname}`} onClick={clearSearch}>
        <div className={css.root}>
          <div className={css.type}>Space</div>
          <div>s/{space.name}</div>
        </div>
      </Link>
    );
  } else if (result.type == "user") {
    const user = result as ClientUser;

    return (
      <div className={css.root}>
        <div className={css.type}>User</div>
        <div>{user.username}</div>
      </div>
    );
  }

  return null;
};

export default SearchResult;
