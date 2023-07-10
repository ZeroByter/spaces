"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./login.module.scss";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });

    router.push("/");
    router.refresh();
  };

  return (
    <main className={css.root}>
      <div className={css.container}>
        <div className={css.header}>Sign in</div>
        <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
          <div>
            <input required placeholder="username" {...register("username")} />
          </div>
          <div>
            <input
              required
              type="password"
              placeholder="password"
              {...register("password")}
            />
          </div>
          <div className={css.buttons}>
            <button type="submit">
              <b>Sign in</b>
            </button>
            <Link href="/register">
              <button type="button">Sign up</button>
            </Link>
            <Link href="/">
              <button type="submit">Cancel</button>
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
