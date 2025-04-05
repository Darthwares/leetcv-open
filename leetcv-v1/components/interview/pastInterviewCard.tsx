import { Interview } from "types/dashboardTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { CalendarDaysIcon, ClockIcon } from "@components/svg";
import { QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { Button } from "shadcn/components/ui/button";
import { useTranslations } from "next-intl";

type PastInterviewCardProps = {
  interview: Interview;
  onViewDetails: (interview: Interview) => void;
};

export const PastInterviewCard = ({
  interview,
  onViewDetails,
}: PastInterviewCardProps) => {
  const t = useTranslations("Interview");
  return (
    <>
      <Card className="w-full transition-all hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="space-y-2.5 pb-4">
          <CardTitle className="text-lg font-semibold line-clamp-1 text-indigo-600 dark:text-indigo-400">
            {interview.topic}
          </CardTitle>
          <CardDescription>
            <span className="flex items-center gap-3">
              <CalendarDaysIcon className="w-4 h-4" />
              {interview.attemptedAtDate} ({interview.attemptedAtTime})
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          <CardDescription>
            <div className="flex items-center">
              <ClockIcon className="w-[18px] h-[18px] mr-2 text-gray-500" />
              <span>Time taken: {interview.timeTaken}</span>
            </div>
          </CardDescription>
          <CardDescription>
            <div className="flex items-center">
              <QuestionMarkCircleIcon className="w-5 h-5 mr-2 text-gray-500" />
              <span>Total question(s): {interview.totalQuestions}</span>
            </div>
          </CardDescription>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <span className="text-green-600 ">Answered</span>:{" "}
                {interview.answeredQuestions} |{" "}
                <span className="text-red-600 ">Unanswered</span>:{" "}
                {interview.unansweredQuestions}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-indigo-600 text-white hover:bg-indigo-500"
            onClick={() => {
              onViewDetails(interview);
            }}
          >
            {t("viewDetails")}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
