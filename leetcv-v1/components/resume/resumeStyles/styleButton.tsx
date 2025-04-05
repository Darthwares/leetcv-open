import { SparklesIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";
import React from "react";

const StyleButton = () => {
  const t = useTranslations("ResumeStyles");

  return (
    <button className="flex items-center gap-2 px-5 py-3 rounded-lg text-white bg-gradient-to-r from-[#8e2de2] to-[#4a00e0] -mt-2 resume-style-btn">
      <SparklesIcon className="w-5 h-5 text-white" />
      {t("resumeStyling")}
    </button>
  );
};

export default StyleButton;
