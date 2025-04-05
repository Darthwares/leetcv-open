import React from "react";
import { ExternalLinkIcon } from "@heroicons/react/outline";
import { ClickSvg } from "@components/svg";
import { useTranslations } from "next-intl";

const OpenLinkedinButton = () => {
  const t = useTranslations("Convert");

  return (
    <div className="w-full" data-testid="open-linkedin-container">
      <div className="flex -mt-3 lg:mt-0 w-full z-50 items-center justify-between py-3 pr-5 rounded-b-lg lg:rounded-t-lg gap-3 bg-gradient-to-l from-indigo-50 to-pink-100 lg:bg-indigo-100 mb-8 lg:mb-4">
        <div className="flex gap-1 font-semibold">
          <h2
            data-testid="title"
            className="font-semibold px-5 py-3 text-sm sm:text-base to-pink-100"
          >
            {t("openLinkedinProfile")}
          </h2>
        </div>
        <a
          className="bg-indigo-500 hover:bg-indigo-600 transition-all duration-200 text-white rounded-md flex items-center gap-1.5 py-2 px-2.5 font-medium text-sm"
          href="https://www.linkedin.com/in/me"
          target="_blank"
          rel="noreferrer"
          data-testid="open-linkedin-btn"
        >
          {t("open")}
          <ClickSvg />
          <ExternalLinkIcon className="w-4 h-4 hidden lg:block" />
        </a>
      </div>
    </div>
  );
};

export default OpenLinkedinButton;
