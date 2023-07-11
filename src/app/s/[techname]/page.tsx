import Posts from "@/components/shared/posts";
import SpacesSQL from "@/serverlib/sql-classes/spaces";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC } from "react";

const getSpace = async (techname: string) => {
  const space = await SpacesSQL.getByTechName(techname);

  if (!space) {
    notFound();
  }

  return space;
};

type Props = {
  params: {
    techname: string;
  };
};

const Space: FC<Props> = async ({ params }) => {
  const space = await getSpace(params.techname);

  return (
    <div>
      <div>{space.name}</div>
      <div>
        <Link href={`/s/${params.techname}/createPost`}>
          <button>Create post</button>
        </Link>
      </div>
      <Posts source="space" spaceId={space.id} />
    </div>
  );
};

export default Space;
