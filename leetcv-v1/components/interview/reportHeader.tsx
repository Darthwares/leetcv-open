import React from "react";
import { Card, CardContent } from "shadcn/components/ui/cards";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BookOpenIcon,
} from "@heroicons/react/solid";
import { Interview } from "types/dashboardTypes";
import { formatShortTime } from "@constants/defaults";
import { useTranslations } from "next-intl";

interface ReportHeaderProps {
  interview: Interview;
}

const ReportHeader: React.FC<ReportHeaderProps> = ({ interview }) => {
  const unattemptedQuestions =
    interview?.totalQuestions - interview?.answeredQuestions;
  const t = useTranslations("Interview");

  const formattedTime = formatShortTime(
    interview?.timeTaken || "0 minutes 0 seconds"
  );

  return (
    <Card className="w-full rounded-none border-none">
      <div className="rounded-none py-3.5 border-none" />
      <CardContent className="p-6">
        <div className="flex flex-wrap sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BookOpenIcon className="w-5 h-5 text-yellow-500 flex-shrink-0" />
            <span className="font-semibold">{t("topicLabel")}</span>
            <span className="capitalize">{interview?.topic}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClockIcon className="w-5 h-5 text-white flex-shrink-0" />
            <span className="font-semibold">{t("timeTakenLabel")}</span>
            <span>{formattedTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="font-semibold">
              {t("attemptedQuestionsLabel")}
            </span>
            <span>{interview?.answeredQuestions}</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircleIcon className="w-5 h-5 text-red-500 flex-shrink-0" />
            <span className="font-semibold">
              {t("unattemptedQuestionsLabel")}
            </span>
            <span>{unattemptedQuestions}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportHeader;
