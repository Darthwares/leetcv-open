import React, { useEffect } from "react";
import { Button } from "shadcn/components/ui/button";
import { CircleArrowPathIcon } from "@components/svg";
import { isMobile } from "mobile-device-detect";
import { useTranslations } from "next-intl";

interface StartedInterviewProps {
  time: number;
  popupDismissed: boolean;
  setPopupDismissed: (value: boolean) => void;
  qaHistory: { question: string; answer: string }[];
  question: string;
  listening: boolean;
  isLoading: boolean;
  answer: string;
  answerScrollRef: React.RefObject<HTMLParagraphElement>;
  transcript: string;
  submitAnswer: () => void;
  handleAgainRecord: () => void;
}

const StartedInterview: React.FC<StartedInterviewProps> = ({
  listening,
  isLoading,
  answer,
  answerScrollRef,
  transcript,
  submitAnswer,
  handleAgainRecord,
}) => {
  const t = useTranslations("Interview");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="w-full bg-white mt-5 md:mt-0 rounded-md md:w-2/3">
      <div className="relative p-3 overflow-auto w-full border-2 border-dashed rounded-md">
        {!answer && !listening && (
          <div className="flex flex-col justify-center items-center">
            <div className="flex gap-5 items-center space-y-3"></div>
            <div className="h-60 flip-image">
              <lottie-player
                src="/assets/lottie/speaking.json"
                background="white"
                speed="1"
                loop
                autoplay
                data-testid="lottie"
              ></lottie-player>
            </div>
            {!isMobile && (
              <p className="pb-2 text-sm italic block overflow-hidden text-gray-600 text-center">
                {t("transcriptPlaceholder")}
              </p>
            )}
            <p className="text-gray-700 text-sm text-center hidden sm:block">
              {t("recordingInstructions")}
            </p>
          </div>
        )}
        {answer && (
          <p className={`w-full overflow-auto`} ref={answerScrollRef}>
            {answer}
          </p>
        )}
      </div>

      <div className="flex items-center max-w-lg w-full mt-5 gap-5">
        {transcript && (
          <Button
            onClick={submitAnswer}
            disabled={isLoading || !transcript}
            className="bg-indigo-600 w-full sm:max-w-fit hover:bg-indigo-500 text-white p-2 whitespace-nowrap font-medium text-sm rounded"
          >
            {isLoading ? t("submittingLabel") : t("submitAnswerLabel")}
          </Button>
        )}

        {transcript && (
          <Button
            onClick={handleAgainRecord}
            disabled={isLoading}
            className="bg-indigo-600 w-full sm:max-w-fit hover:bg-indigo-500 text-white p-2 whitespace-nowrap flex gap-1 font-medium text-sm rounded"
          >
            <CircleArrowPathIcon className="w-5 h-5" />
            {t("recordAgainLabel")}
          </Button>
        )}
      </div>
    </div>
  );
};

export default StartedInterview;
