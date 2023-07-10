"use client";

import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./createPost.module.scss";

type Inputs = {
  title: string;
  text: string;
};

type Props = {
  params: {
    techname: string;
  };
};

const Space: FC<Props> = ({ params }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/createPost", {
      method: "POST",
      body: JSON.stringify({ ...data, space: params.techname }),
    });

    const response = await rawResponse.json();

    router.push(`/s/${params.techname}/p/${response.data.navtext}`);
  };

  return (
    <main className={css.root}>
      <div className={css.container}>
        <div className={css.header}>Create post</div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <input required placeholder="Title" {...register("title")} />
          </div>
          <div>
            <textarea required placeholder="Text" {...register("text")} />
          </div>
          <div className={css.buttons}>
            <button type="submit">
              <b>Create</b>
            </button>
            <Link href={`/s/${params.techname}`}>
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Space;
