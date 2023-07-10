import ClientComment from "@/types/clientComment";
import { FC } from "react";
import css from "./comment.module.scss";
import { renderTimestamp } from "@/clientlib/essentials";

type Props = {
  comment: ClientComment;
};

const Comment: FC<Props> = ({ comment }) => {
  return (
    <div className={css.root}>
      <div className={css.header}>
        {comment.createdBy.username} - {renderTimestamp(comment.timecreated)}
      </div>
      <div className={css.text}>{comment.text}</div>
    </div>
  );
};

export default Comment;
