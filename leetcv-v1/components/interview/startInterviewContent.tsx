import { instructions } from "@constants/defaults";
import { Checkbox } from "shadcn/components/ui/checkbox";
import { ScrollArea } from "shadcn/components/ui/scroll-area";
import { ChevronRightIcon } from "@heroicons/react/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "shadcn/components/ui/cards";
import { Button } from "shadcn/components/ui/button";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import ReUsableWatchVideoBanner from "@components/reUsableWatchVideoBanner";
import ReUsableTransitionModal from "@components/reUsableTransitionModal";
import { sideBarOpenState } from "@state/state";

interface StartInterviewContentProps {
  isReadInstructions: boolean;
  setIsReadInstructions: (value: boolean) => void;
  nextStep: () => void;
}

export const StartInterviewContent: React.FC<StartInterviewContentProps> = ({
  isReadInstructions,
  setIsReadInstructions,
  nextStep,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Interview");
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <Card className="overflow-hidden shadow-none">
      <div
        className={`grid ${
          isSideBarClosed ? "lg:grid-cols-2" : "lg:grid-cols-1"
        } md:grid-cols-2 xl:grid-cols-2 gap-6`}
      >
        <div>
          <div className="-my-3">
            <ReUsableWatchVideoBanner
              title="How it works ?"
              setIsOpen={setIsOpen}
              isInterviewPage={true}
            />
          </div>
          <ReUsableTransitionModal
            title="Mock interview Feature"
            src="https://www.youtube.com/embed/OTzFgHwAdCs?si=f4wclkTDi_4Y_8Mz"
            isOpen={isOpen}
            setIsOpen={setIsOpen}
          />
          <div
            className={`bg-gradient-to-br from-indigo-100 to-pink-100 dark:from-indigo-900 dark:to-pink-900 p-6 md:flex items-center justify-center ${
              isSideBarClosed ? "lg:flex" : "lg:hidden"
            } hidden xl:flex`}
          >
            <lottie-player
              src="/assets/lottie/ai_interview.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              style={{ width: "100%", maxWidth: "400px", aspectRatio: "1" }}
            />
          </div>
        </div>
        <CardContent className="py-6 sm:p-6 space-y-6">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400">
              {t("interviewInstructionsTitle")}
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              {t("interviewInstructionsDescription")}
            </CardDescription>
          </CardHeader>
          <ScrollArea className="sm:h-[280px] pr-4">
            <ul className="space-y-4">
              {instructions.map((ins, ind) => (
                <li key={ins.id} className="flex text-[15px] items-start">
                  <span className="font-semibold mr-2">{ind + 1}.</span>
                  <span className="text-gray-500 dark:text-gray-200">
                    {ins.text}
                  </span>
                </li>
              ))}
            </ul>
          </ScrollArea>
          <div className="flex items-center space-x-4 cursor-pointer">
            <Checkbox
              id="readInstructions"
              checked={isReadInstructions}
              onCheckedChange={(checked) => {
                setIsReadInstructions(checked as boolean);
              }}
            />
            <label
              htmlFor="readInstructions"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-indigo-600 dark:text-indigo-400"
            >
              {t("readInstructionsLabel")}
            </label>
          </div>
          <Button
            disabled={!isReadInstructions}
            onClick={nextStep}
            className="w-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {t("nextButtonLabel")}
            <ChevronRightIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </div>
    </Card>
  );
};
