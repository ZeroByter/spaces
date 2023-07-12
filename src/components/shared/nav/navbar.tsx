import Link from "next/link";
import { cookies } from "next/headers";
import { FC } from "react";
import { decryptAccountToken } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";
import css from "./navbar.module.scss";
import Spacer from "../spacer";
import Search from "./search";
import LogoutButton from "./logoutButton";

async function getUser() {
  const account = cookies().get("account")?.value;

  if (!account) {
    return null;
  }

  const { id } = decryptAccountToken(account);

  const user = await UsersSQL.getById(id);

  return user;
}

const Navbar: FC = async () => {
  const user = await getUser();

  const renderLoggedOut = () => {
    if (user) return;

    return (
      <>
        <Link className={css.link} href="/login">
          Sign in
        </Link>
        <Link className={css.link} href="/register">
          Sign up
        </Link>
      </>
    );
  };

  const renderLoggedIn = () => {
    if (!user) return;

    return (
      <>
        <Link className={css.link} href="/createSpace">
          Create space
        </Link>
        <LogoutButton />
      </>
    );
  };

  return (
    <div className={css.root}>
      <span>
        <Link href="/" className={css.logo}>
          Spaces
        </Link>
        <Link href="/about#alpha" className={css.alpha}>
          (alpha) (click for more info)
        </Link>
      </span>
      <Spacer />
      <Search />
      <Spacer />
      {renderLoggedIn()}
      {renderLoggedOut()}
      <Link
        className={css.link}
        href="https://github.com/ZeroByter/spaces"
        target="_blank"
      >
        GitHub
      </Link>
    </div>
  );
};

export default Navbar;
