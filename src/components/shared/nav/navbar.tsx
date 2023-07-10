import Link from "next/link";
import { cookies } from "next/headers";
import { FC } from "react";
import { decryptAccountToken } from "@/serverlib/auth";
import UsersSQL from "@/serverlib/sql-classes/users";

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
        <div>
          <Link href="/login">Sign in</Link>
        </div>
        <div>
          <Link href="/register">Sign up</Link>
        </div>
      </>
    );
  };

  const renderLoggedIn = () => {
    if (!user) return;

    return (
      <div>
        <Link href="/createSpace">Create space</Link>
      </div>
    );
  };

  return (
    <div>
      <div>
        <Link href="/">Spaces</Link>
        {renderLoggedIn()}
        {renderLoggedOut()}
      </div>
    </div>
  );
};

export default Navbar;
