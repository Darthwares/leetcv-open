import { handleNavigation, handlePath } from "@constants/defaults";
import { UserIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SignInButton = () => {
  const t = useTranslations("Appbar");
  const router = useRouter();
  const { status } = useSession();
  const queryParams = router.query;
  const [query, setQuery] = useState<string>("");

  const path =
    handlePath[query] !== undefined ? handlePath[query] : location.pathname;

  useEffect(() => {
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value === "true") {
        setQuery(key);
      }
    });
  }, [router.query]);

  return (
    <button
      data-testid="loginButton"
      onClick={() => {
        router.asPath === "/"
          ? signIn()
          : handleNavigation(path, status, router);
      }}
    >
      <div className="mx-1 rounded-md hover:bg-indigo-600 transition-all duration-200 bg-indigo-500 text-white px-3 py-2 dark:bg-gray-900 dark:text-white flex md:gap-1.5 text-sm items-center">
        <UserIcon strokeWidth={2.5} className="w-[18px] h-[18px]" />
        <span className="block font-semibold pl-1 md:pl-0">{t("login")}</span>
      </div>
    </button>
  );
};

export default SignInButton;
