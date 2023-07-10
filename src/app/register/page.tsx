"use client";

import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./register.module.scss";

type Inputs = {
  username: string;
  password: string;
  email?: string;
};

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(await rawResponse.json());
  };

  return (
    <main className={css.root}>
      <div className={css.container}>
        <div className={css.header}>Sign up</div>
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
          <div>
            <input placeholder="email (optional)" {...register("email")} />
          </div>
          <div className={css.buttons}>
            <button type="submit">
              <b>Sign up</b>
            </button>
            <Link href="/login">
              <button type="button">Sign in</button>
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
