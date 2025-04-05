import ReusableHeader from "@components/reusableHeader";
import { useTranslations } from "next-intl";
import React from "react";

const RefiningHeader = () => {
  const t = useTranslations("Convert");

  return (
    <div
      className="p-4 flex items-center justify-center"
      data-testid="refining-header"
    >
      <h2 className="mt-2 text-xl md:text-2xl lg:text-3xl font-semibold dark:text-white text-gray-900 sm:text-4xl">
        <ReusableHeader>
            <div className="max-w-6xl text-sm leading-6 text-gray-900">
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold animate-pulse">
                  {t("refiningProjectAndExperience")}
                </h2>
              </div>
              <p className="mt-3 text-base md:text-lg">{t("wipedOut")}</p>
            </div>
        </ReusableHeader>
      </h2>
    </div>
  );
};

export default RefiningHeader;
