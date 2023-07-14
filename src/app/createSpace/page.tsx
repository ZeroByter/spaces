"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import css from "./createSpace.module.scss";
import { useDebounce } from "usehooks-ts";

type Inputs = {
  techname: string;
  name: string;
};

export default function CreateSpace() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>();

  const watchName = watch("name");
  const watchTechName = watch("techname");

  const debouncedWatchTechName = useDebounce(watchTechName, 250);

  useEffect(() => {
    if (watchName) {
      setValue("techname", watchName.toLowerCase().replace(/[\W\d_]/g, ""));
    }
  }, [watchName]);

  useEffect(() => {
    (async () => {
      const rawResponse = await fetch(
        `/api/spaceCheckTechNameAvailable?techName=${encodeURIComponent(
          debouncedWatchTechName
        )}`
      );
      const response = await rawResponse.json();

      if (!response.data.available) {
        setError("techname", { message: "Technical name not available!" });
      } else {
        clearErrors("techname");
      }
    })();
  }, [debouncedWatchTechName]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!isValid) return;

    await fetch("/api/createSpace", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.push(`/s/${data.techname}`);
  };

  const isValid = !errors.techname;

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
          {errors.techname && (
            <div className={css.error}>{errors.techname?.message}</div>
          )}
          <div className={css.buttons}>
            <button type="submit" disabled={!isValid}>
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
