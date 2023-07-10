import Posts from "@/components/space/posts";
import PostsSQL from "@/serverlib/sql-classes/posts";
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

const getPosts = async (spaceId: string) => {
  return await PostsSQL.clientGetBySpaceId(spaceId);
};

type Props = {
  params: {
    techname: string;
  };
};

const Space: FC<Props> = async ({ params }) => {
  const space = await getSpace(params.techname);
  const posts = await getPosts(space.id);

  return (
    <div>
      <div>{space.name}</div>
      <div>
        <Link href={`/s/${params.techname}/createPost`}>
          <button>Create post</button>
        </Link>
      </div>
      <Posts posts={posts} />
    </div>
  );
};

export default Space;
