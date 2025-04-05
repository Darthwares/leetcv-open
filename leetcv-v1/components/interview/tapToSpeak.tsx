import { MicIcon } from "@components/svg";
import { useTranslations } from "next-intl";
import React from "react";

const TapToSpeak = () => {
  const t = useTranslations("Interview");
  return (
    <div className="flex gap-3 items-center justify-center  cursor-pointer">
      <div className="">
        <span className="text-indigo-600 font-bold">{t("record")}</span>
      </div>
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full bg-gray-200 animate-ping" />
        <div className="absolute w-10 h-10 rounded-full bg-gray-300 animate-ping" />
        <div className="relative flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-full">
          <MicIcon className="text-white w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default TapToSpeak;
