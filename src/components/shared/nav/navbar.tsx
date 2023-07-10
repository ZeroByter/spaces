import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  return (
    <div>
      <div>
        <Link href="/">Spaces</Link>
      </div>
      <div>
        <Link href="/createSpace">Create space</Link>
      </div>
      <div>
        <Link href="/login">Sign in</Link>
      </div>
      <div>
        <Link href="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Navbar;
