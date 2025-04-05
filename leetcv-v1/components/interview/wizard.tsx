import { useWizard, Wizard } from "react-use-wizard";
import Instructions from "./instructions";
import Report from "./report";
import { useEffect, useState } from "react";
import { Interview } from "types/dashboardTypes";
import { Button } from "shadcn/components/ui/button";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  interviewState,
  isReadInstructionsState,
  mockInterviewTopicState,
  userIdState,
} from "@state/state";
import ProcessInterview from "./processInterview";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

function ProcessReport(props: any) {
  const { goToStep } = useWizard();
  const setIsReadInstructions = useSetRecoilState(isReadInstructionsState);
  const setTopic = useSetRecoilState(mockInterviewTopicState);
  const t = useTranslations("Interview");

  return (
    <div className="w-full">
      {props.report! && (
        <div className="w-full flex justify-end py-4 sm:py-8">
          <Button
            onClick={() => {
              props.setReport(null);
              setIsReadInstructions(false);
              setTopic("");
              goToStep(0);
            }}
            className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white max-w-fit font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {t("startNewInterview")}
          </Button>
        </div>
      )}

      <Report interview={props.report!} />
    </div>
  );
}

const WizardStep = () => {
  const [report, setReport] = useState<Interview | null>(null);
  const { status } = useSession();
  const [userId] = useRecoilState(userIdState);
  const [allInterviews, setAllInterviews] = useRecoilState(interviewState);
  const { data: interviews } = trpc.useQuery(
    ["fs.mockInterviewRouter.getAllMockInterviews", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    if (allInterviews && report) {
      setAllInterviews([...allInterviews, report]);
    }
  }, [report, interviews, setAllInterviews]);

  return (
    <div
      className="flex flex-col justify-center lg:mt-0 sm:mt-6 items-center w-full"
      data-testid="wizard"
    >
      <div className="w-full">
        <div
          className={` mt-2 flex flex-col max-w-7xl lg:px-1 mx-auto w-full`}
          data-testid="wizard-list"
        >
          <Wizard>
            <Instructions />
            <ProcessInterview setReport={setReport} />
            <ProcessReport
              report={report}
              setReport={setReport}
            ></ProcessReport>
          </Wizard>
        </div>
      </div>
    </div>
  );
};
export default WizardStep;
