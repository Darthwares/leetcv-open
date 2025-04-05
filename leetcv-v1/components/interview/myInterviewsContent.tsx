import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { PastInterviewCard } from "./pastInterviewCard";
import { Interview } from "types/dashboardTypes";
import { useRecoilState } from "recoil";
import { interviewState } from "@state/state";
import NoInterviewsFound from "./noInterviewsFound";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "shadcn/components/ui/table";
import { Button } from "shadcn/components/ui/button";
import { useTranslations } from "next-intl";

interface MyInterviewsContentProps {
  handleViewDetails: (interview: Interview) => void;
}
export const MyInterviewsContent: React.FC<MyInterviewsContentProps> = ({
  handleViewDetails,
}) => {
  const [allInterview] = useRecoilState(interviewState);
  const t = useTranslations("Interview");

  return (
    <>
      {allInterview && allInterview.length! === 0 ? (
        <NoInterviewsFound />
      ) : (
        <Card className="border-none shadow-none sm:shadow sm:pb-20">
          <CardHeader className="px-2 sm:px-6 py-6">
            <CardTitle className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              {t("myInterviewsTitle")}
            </CardTitle>
            <CardDescription className="text-gray-600 text-base">
              {t("myInterviewsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-0 py-6">
            <div className="hidden lg:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("tableHeadTopic")}</TableHead>
                    <TableHead className="whitespace-nowrap">
                      {t("tableHeadDateTime")}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {t("tableHeadTimeTaken")}
                    </TableHead>
                    <TableHead className="whitespace-nowrap">
                      {t("tableHeadTotalQuestions")}
                    </TableHead>
                    <TableHead>{t("tableHeadActions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allInterview.map((interview: Interview) => (
                    <TableRow
                      key={interview.id}
                      className="odd:bg-gray-50 rounded-sm"
                    >
                      <TableCell className="font-medium text-indigo-600 dark:text-indigo-400 capitalize line-clamp-2">
                        {interview.topic}
                      </TableCell>
                      <TableCell>{`${interview.attemptedAtDate} (${interview.attemptedAtTime})`}</TableCell>
                      <TableCell>{interview.timeTaken}</TableCell>
                      <TableCell>{interview.totalQuestions}</TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleViewDetails(interview)}
                          className="w-full bg-indigo-600 whitespace-nowrap text-white hover:bg-indigo-500"
                        >
                          {t("viewDetailsButton")}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="grid grid-cols-1 sm:px-6 md:grid-cols-2 lg:hidden gap-6">
              {allInterview.map((interview: Interview) => (
                <PastInterviewCard
                  key={interview.id}
                  interview={interview}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};
