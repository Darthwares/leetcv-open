import ReusableHeader from "@components/reusableHeader";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import ConvertText from "./convertText";
const ConvertHeader = () => {
  const t = useTranslations("Convert");
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div>
      <ReusableHeader>
        <div className="flex flex-col items-start justify-start max-w-fit gap-3">
          <h2 className="text-xl md:text-2xl font-semibold">
            {t("convertWithLeet")}
          </h2>
          <p className="text-sm font-medium w-full md:w-[27rem] text-gray-600">
            {t("transformYourCV")}
          </p>
        </div>
        <div className="h-36 w-full max-w-fit hidden lg:flex jce">
          <lottie-player
            src="/assets/lottie/convert.json"
            background=""
            speed="1"
            loop
            autoplay
            className="bg-gradient-to-r from-indigo-100 to-pink-200"
          ></lottie-player>
        </div>
      </ReusableHeader>
      <div className="mx-auto lg:px-8">
        <div
          className={`flex lg:px-10 lg:flex-row flex-col items-center justify-center mt-10 lg:gap-20 gap-7`}
        >
          <div className="flex flex-col items-center gap-y-3">
            <ConvertText />
          </div>
        </div>
      </div>
    </div>
  );
};
