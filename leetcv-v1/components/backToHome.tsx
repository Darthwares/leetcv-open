import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";

const BackToHome = () => {
  const router = useRouter();
  const t = useTranslations("Pricing");

  return (
    <button
      onClick={() => router.push("/")}
      type="button"
      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-300 focus-visible:outline-indigo-600"
    >
      {t("goHome")}
    </button>
  );
};

export default BackToHome;
