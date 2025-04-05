import { AnimateSpin } from "@components/svg";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React from "react";
import { Card, CardContent, CardTitle } from "shadcn/components/ui/cards";

const SuccessfulGeneratedReport = () => {
  const t = useTranslations("Interview");
  return (
    <Card className="max-w-7xl mx-auto">
      <CardContent className="flex flex-col md:flex-row items-center p-8">
        <div className="w-full mb-8 md:mb-0 md:pr-8 ">
          <lottie-player
            src="/assets/lottie/success.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            style={{ width: "100%", maxWidth: "400px", aspectRatio: "1" }}
          ></lottie-player>
        </div>
        <div className="w-full text-center md:text-left">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mb-6 mx-auto md:mx-0" />
          <CardTitle className="text-lf sm:text-2xl font-bold text-gray-800 mb-4">
            {t("interviewCompletedTitle")}
          </CardTitle>
          <p className="text-gray-600 mb-8">{t("interviewReviewingAnswers")}</p>
          <div className="flex items-center justify-center md:justify-start space-x-2 text-gray-600">
            <AnimateSpin className="animate-spin h-10 w-10 text-indigo-600" />
            <span>{t("generatingReportMessage")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SuccessfulGeneratedReport;
