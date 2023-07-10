"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
};

export default function CreateSpace() {
  const router = useRouter();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const rawResponse = await fetch("/api/createSpace", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log(await rawResponse.json());
    // router.push("/");
  };

  return (
    <div>
      <div>
        Create <b>space</b>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input required placeholder="Name" {...register("name")} />
        </div>
        <div>
          <button>
            <b>Create</b>
          </button>
          <Link href="/">
            <button>Cancel</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
