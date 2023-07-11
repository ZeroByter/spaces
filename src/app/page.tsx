import Posts from "@/components/shared/posts";
import { FC } from "react";
import css from "./home.module.scss";

const Home: FC = async () => {
  return (
    <div className={css.root}>
      <Posts source="global" />
    </div>
  );
};

export default Home;
