"use client";

import SpacesSQL from "@/serverlib/sql-classes/spaces";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

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
    <div>
      <div>Create post</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input required placeholder="Title" {...register("title")} />
        </div>
        <div>
          <textarea required placeholder="Text" {...register("text")} />
        </div>
        <div>
          <button type="submit">
            <b>Create</b>
          </button>
          <Link href={`/s/${params.techname}`}>
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Space;
