import { ArrowRightIcon } from "@heroicons/react/outline";
import { activeTabState, isReadInstructionsState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "shadcn/components/ui/button";
import { Card, CardContent } from "shadcn/components/ui/cards";

const NoInterviewsFound = () => {
  const setActiveTab = useSetRecoilState(activeTabState);
  const setIsReadInstructions = useSetRecoilState(isReadInstructionsState);
  const t = useTranslations("Interview");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <Card className="w-full max-w-7xl mx-auto border-none shadow">
      <div className="pb-10 sm:py-20">
        <CardContent className="flex w-full flex-col md:flex-row items-center justify-between">
          <div className="sm:h-72 h-56 w-full dark:bg-gray-800 flex items-center justify-center">
            <lottie-player
              src="/assets/lottie/notfound.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              data-testid="lottie"
              style={{ width: "100%", height: "100%" }}
            ></lottie-player>
          </div>
          <div className="w-full flex flex-col items-start space-y-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
              {t("noInterviewsFoundTitle")}
            </h1>
            <p className="text-left text-gray-600 dark:text-gray-300">
              {t("noInterviewsFoundDescription")}
            </p>
            <Button
              onClick={() => {
                setActiveTab("start-interview");
                setIsReadInstructions(false);
              }}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              <span>{t("startFirstInterviewButton")}</span>
              <ArrowRightIcon className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default NoInterviewsFound;
