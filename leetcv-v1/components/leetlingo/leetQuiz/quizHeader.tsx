import { HeartSvg, UnlimitedHeartsSvg } from "@components/svg";
import { XIcon } from "@heroicons/react/outline";
import { livesState, subscriptionPlanState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

type QuizHeaderProps = {
  currentQuestion: number;
  handleClose: () => void;
  progressValue: number;
  isPracticeQuiz: boolean;
  isHeartBeating: boolean;
};

const QuizHeader = ({
  currentQuestion,
  handleClose,
  progressValue,
  isPracticeQuiz,
  isHeartBeating,
}: QuizHeaderProps) => {
  const [plan] = useRecoilState(subscriptionPlanState);
  const [lives] = useRecoilState(livesState);

  return (
    <div className="max-w-5xl mx-auto flex items-center gap-5 mb-8">
      <div
        className={`${currentQuestion > 0 && "cursor-pointer"}`}
        onClick={handleClose}
      >
        <XIcon className="w-6 h-6 text-gray-500" />
      </div>
      <div className="relative w-full h-3 bg-gray-100 rounded-full">
        <div
          className="absolute h-full bg-indigo-500 rounded-full transition-all duration-300"
          style={{ width: `${progressValue}%` }}
        />
      </div>
      {!isPracticeQuiz && (
        <div className="relative flex items-center gap-1">
          {plan === "Pro" ? (
            <UnlimitedHeartsSvg />
          ) : (
            <HeartSvg
              lives={lives}
              isQuizComponent={true}
              isHeartBeating={isHeartBeating}
            />
          )}
          {plan !== "Pro" && (
            <span className={lives === 0 ? "text-gray-300" : "text-red-500"}>
              {lives}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizHeader;
