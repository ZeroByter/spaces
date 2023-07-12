"use client";

import { FC } from "react";
import css from "./logoutButton.module.scss";
import { useRouter } from "next/navigation";

const LogoutButton: FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const rawResponse = await fetch("/api/logout");
    router.refresh();
  };

  return (
    <span className={css.link} onClick={handleLogout}>
      Logout
    </span>
  );
};

export default LogoutButton;
