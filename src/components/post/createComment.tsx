"use client";

import ClientComment from "@/types/clientComment";
import ClientPost from "@/types/clientPost";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./createComment.module.scss";

type Props = {
  post: ClientPost;
  setComments: (newComments: ClientComment[]) => void;
};

type Inputs = {
  text: string;
};

const CreateComment: FC<Props> = ({ post, setComments }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify({ ...data, postId: post.id }),
    });

    const response = await rawResponse.json();

    setComments(response.data.newComments);
  };

  return (
    <div className={css.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea
            className={css.textarea}
            placeholder="Write an awesome reply!"
            required
            {...register("text")}
          />
        </div>
        <div>
          <button type="submit">post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
