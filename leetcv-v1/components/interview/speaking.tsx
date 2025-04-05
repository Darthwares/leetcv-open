import { useTranslations } from "next-intl";
import React from "react";

const Speaking = () => {
  const t = useTranslations("Interview");
  return (
    <>
      <div className="flex items-center justify-center space-x-8">
        <div className="relative flex items-center justify-center">
          <div className="relative flex flex-row  gap-3 items-center justify-center ">
            <div className="flex items-center justify-center">
              <span className="text-red-600 font-bold">{t("stop")}</span>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full bg-gray-200 animate-ping" />
              <div className="absolute w-8 h-8 rounded-full bg-gray-300 animate-ping" />
              <div className="relative flex items-center justify-center w-8 h-8 bg-gray-300 rounded-full">
                <div className="absolute w-4 h-4 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Speaking;
