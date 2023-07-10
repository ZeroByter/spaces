"use client";

import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  post: any;
  setComments: (newComments: any[]) => void;
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
    <div>
      <div>Post reply</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <textarea required {...register("text")} />
        </div>
        <div>
          <button type="submit">post</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
