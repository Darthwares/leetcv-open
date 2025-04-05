import React from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

const LogOutButton = () => {
  const t = useTranslations("Appbar");

  return (
    <button
      className="text-sm font-medium flex items-center gap-2 cursor-pointer bg-red-500 text-white px-3 rounded-md max-w-fit py-2"
      data-testid="signOutButton"
      onClick={async () => {
        signOut({
          callbackUrl: "/",
        });
      }}
    >
      <LogoutIcon className="w-5" /> <span>{t("signOut")}</span>
    </button>
  );
};

export default LogOutButton;
