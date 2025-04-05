import React from "react";
import { LightBulbIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

const FetchingText = () => {
  const t = useTranslations("Convert");

  return (
    <>
      <div className="mt-5 max-w-lg flex items-center justify-center">
        <div className="w-60">
          <lottie-player
            src="/assets/lottie/document-scanning-processing.json"
            background="white"
            speed="1"
            loop
            autoplay
          />
        </div>
      </div>
      <div className="flex pt-1 space-x-1 items-start flex-wrap">
        <p className="flex gap-1">
          <LightBulbIcon className="w-5 text-indigo-500 relative -top-2.5 md:top-0" />
          <span className="w-60 text-sm flex-wrap flex md:w-full">
            {t("pleaseWait")}
          </span>
        </p>
      </div>
    </>
  );
};

export default FetchingText;
