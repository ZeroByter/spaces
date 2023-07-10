"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./createSpace.module.scss";

type Inputs = {
  techname: string;
  name: string;
};

export default function CreateSpace() {
  const router = useRouter();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();

  const watchName = watch("name");

  useEffect(() => {
    if (watchName) {
      setValue("techname", watchName.toLowerCase().replace(/[\W\d_]/g, ""));
    }
  }, [watchName]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/createSpace", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(await rawResponse.json());
    // router.push("/");
  };

  return (
    <main className={css.root}>
      <div className={css.container}>
        <div className={css.header}>
          Create <b>space</b>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <input required placeholder="Name" {...register("name")} />
          </div>
          <div>
            <input
              required
              placeholder="Technical name"
              {...register("techname")}
            />
          </div>
          <div className={css.buttons}>
            <button type="submit">
              <b>Create</b>
            </button>
            <Link href="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
