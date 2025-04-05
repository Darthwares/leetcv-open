import { useEffect, useRef, useState } from "react";
import { useWizard } from "react-use-wizard";
import { PlusIcon, ViewListIcon } from "@heroicons/react/outline";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shadcn/components/ui/tabs";
import { Interview } from "types/dashboardTypes";
import ViewInterviewModal from "./viewInterviewModal";
import { StartInterviewContent } from "./startInterviewContent";
import { MyInterviewsContent } from "./myInterviewsContent";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  activeTabState,
  interviewState,
  isReadInstructionsState,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

interface TabData {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: React.ReactNode;
}

const Instructions: React.FC = () => {
  const [isReadInstructions, setIsReadInstructions] = useRecoilState(
    isReadInstructionsState
  );
  const [activeTab, setActiveTab] = useRecoilState(activeTabState);
  const { nextStep } = useWizard();
  const [selectedInterview, setSelectedInterview] = useState<Interview | null>(
    null
  );
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [userId] = useRecoilState(userIdState);
  const { status } = useSession();
  const setAllInterviews = useSetRecoilState(interviewState);
  const t = useTranslations("Interview");

  const { data: interviews } = trpc.useQuery(
    ["fs.mockInterviewRouter.getAllMockInterviews", { id: userId }],
    {
      enabled: status === "authenticated",
    }
  );

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === "my-interviews" && interviews) {
      setAllInterviews(interviews);
    }
  };

  const handleViewDetails = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpen(true);
  };

  const tabData: TabData[] = [
    {
      value: "start-interview",
      icon: <PlusIcon className="w-5 h-5" />,
      label: t("startInterview"),
      content: (
        <StartInterviewContent
          isReadInstructions={isReadInstructions}
          setIsReadInstructions={setIsReadInstructions}
          nextStep={nextStep}
        />
      ),
    },
    {
      value: "my-interviews",
      icon: <ViewListIcon className="w-5 h-5" />,
      label: t("myInterviews"),
      content: <MyInterviewsContent handleViewDetails={handleViewDetails} />,
    },
  ];

  const currentTabData = tabData.find((tab) => tab.value === activeTab);

  return (
    <div className="sm:px-4 md:py-3 max-w-7xl">
      <h1 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
        {t("aiVoiceInterviewsTitle")}
      </h1>
      <Tabs
        defaultValue="start-interview"
        className="mb-8 space-y-4"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full flex">
          {tabData.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className={`flex items-center w-full justify-center space-x-2 sm:text-lg transition-all duration-200 ${
                activeTab === tab.value
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleTabChange(tab.value)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {tabData.map((tab) => (
          <TabsContent key={tab.value} value={tab.value}>
            {currentTabData?.content}
          </TabsContent>
        ))}
      </Tabs>
      <ViewInterviewModal
        open={open}
        setOpen={setOpen}
        interview={selectedInterview!}
        cancelButtonRef={cancelButtonRef}
      />
    </div>
  );
};

export default Instructions;
