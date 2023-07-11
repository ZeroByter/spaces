"use client";

import { FC, MouseEvent } from "react";
import css from "./post.module.scss";
import Link from "next/link";
import { ClientPostWithSpace } from "@/types/clientPost";
import { renderTimestamp } from "@/clientlib/essentials";
import classNames from "classnames";
import { useRouter } from "next/navigation";

type Props = {
  post: ClientPostWithSpace;
};

const isTargetInsideLinkOrButton = (target: Element): boolean => {
  if (target == null) return false;

  if (target.tagName === "A" || target.tagName === "BUTTON") {
    return true;
  }

  return isTargetInsideLinkOrButton(target.parentNode as Element);
};

const Post: FC<Props> = ({ post }) => {
  const router = useRouter();

  const postUrl = `/s/${post.space.techname}/p/${post.navtext}`;

  const handleRootClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isTargetInsideLinkOrButton(e.target as Element)) {
      router.push(postUrl);
    }
  };

  return (
    <div className={css.root} onClick={handleRootClick}>
      <div className={css.score}>
        <button className={classNames(css.button, css.positiveButton)}>
          +
        </button>
        <div className={css.scoreCounter}>0</div>
        <button className={classNames(css.button, css.negativeButton)}>
          -
        </button>
      </div>
      <div className={css.contents}>
        <div className={css.header}>
          <div className={css.source}>
            <Link href={`/s/${post.space.techname}`}>s/{post.space.name}</Link>{" "}
            - <span className={css.author}>{post.createdBy.username}</span>
          </div>
          <div className={css.time}>{renderTimestamp(post.timecreated)}</div>
        </div>
        <Link href={postUrl}>
          <div className={css.title}>{post.title}</div>
        </Link>
        <Link href={postUrl}>
          <div className={css.text}>{post.text}</div>
        </Link>
      </div>
    </div>
  );
};

export default Post;
