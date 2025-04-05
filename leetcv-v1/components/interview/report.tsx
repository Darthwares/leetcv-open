import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { Interview } from "types/dashboardTypes";
import ReportHeader from "./reportHeader";
import SuccessfulGeneratedReport from "./successfullGeneratedReport";
import { useTranslations } from "next-intl";

interface ReportProps {
  interview: Interview;
}

const Report: React.FC<ReportProps> = ({ interview }) => {
  const t = useTranslations("Interview");
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="pb-4">
      {interview?.report?.length! > 0 ? (
        <Card className="shadow-none">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardHeader className="border-white border-b">
              <CardTitle className="text-2xl font-semibold">
                {t("interviewReportTitle")}
              </CardTitle>
            </CardHeader>
            <div>
              <ReportHeader interview={interview} />
            </div>
          </div>

          <CardContent className="py-2 sm:px-0 sm:rounded-b-lg">
            <div className="">
              {interview?.report?.map((qa, idx) => {
                return (
                  <div
                    key={idx}
                    className={`${
                      interview?.report?.length! - 1 === idx
                        ? ""
                        : "border-b-2 border-gray-400"
                    } sm:p-6 py-6 space-y-4`}
                  >
                    <div className="space-y-2">
                      <h2 className="text-xl font-semibold">
                        {t("questionPrefix")} {idx + 1}:
                      </h2>
                      <div className="text-gray-700 -pt-5 markdown-report">
                        <ReactMarkdown>{qa?.question}</ReactMarkdown>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        {t("studentsAnswerTitle")}
                      </h3>
                      <p className="text-gray-700">
                        {qa?.answer ? qa?.answer : t("noAnswerProvided")}
                      </p>
                    </div>

                    <div className="mb-4">
                      <details className="mt-4">
                        <summary className="text-blue-600 max-w-fit cursor-pointer">
                          {t("viewRecommendedAnswer")}
                        </summary>
                        <div className="p-4 mt-2 bg-gray-100 rounded-md shadow">
                          <div className="text-gray-700 markdown-report">
                            <ReactMarkdown>
                              {qa?.gptResponseContent}
                            </ReactMarkdown>
                          </div>
                        </div>
                      </details>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">
                        {t("areasForImprovementTitle")}
                      </h3>
                      <div className="text-gray-700 markdown-report">
                        <ReactMarkdown>{qa?.areasForImprovement}</ReactMarkdown>
                      </div>
                    </div>

                    <div className="font-semibold">
                      <span>{t("scoreLabel")} </span>
                      <span>{qa?.score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="pt-8">
          <SuccessfulGeneratedReport />
        </div>
      )}
    </div>
  );
};

export default Report;
