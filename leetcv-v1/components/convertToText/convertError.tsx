import { SyncSvg } from "@components/svg";
import { useTranslations } from "next-intl";
import React from "react";

const ConvertError = () => {
  const t = useTranslations("Convert");

  return (
    <div
      className="flex flex-col justify-center items-center relative -top-6"
      data-testid="convert-error"
    >
      <div className="h-72 lg:h-64 w-full max-w-fit" data-testid="error-lottie">
        <lottie-player
          src="/assets/lottie/AI-finding-something.json"
          background=""
          speed="1"
          loop
          autoplay
          className="bg-gradient-to-r from-indigo-100 to-pink-200"
        />
      </div>
      <p
        className="text-red-500 text-sm font-medium -mt-4"
        data-testid="error-msg"
      >
        {t("somethingWentWrong")}
      </p>
      <button
        className="flex gap-2 items-center text-white transition-all duration-200 hover:bg-indigo-600 font-medium rounded-md bg-indigo-500 text-sm px-3 py-2.5 text-center mt-5"
        onClick={() => window.location.reload()}
        data-testid="reload-btn"
      >
        {t("tryAgain")}
        <SyncSvg className="w-[18px] h-[18px]" />
      </button>
    </div>
  );
};

export default ConvertError;
