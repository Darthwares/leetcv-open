import { ReviewMistakesSvg } from "@components/svg";
import { ArrowRightIcon } from "@heroicons/react/outline";
import React from "react";

type ReviewPromptProps = {
  wrongQuestions: number;
  startReviewMode: () => void;
};

const ReviewPrompt = ({
  wrongQuestions,
  startReviewMode,
}: ReviewPromptProps) => {
  return (
    <div className="max-w-xl mx-auto text-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="relative">
            <div className="w-24 h-24 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
              <ReviewMistakesSvg className="w-12 h-12 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-gray-900">
            Let&apos;s Review Your Mistakes
          </h2>
          <p className="text-gray-600">
            You had {wrongQuestions} incorrect answers. Let&apos;s practice them
            again!
          </p>
        </div>

        <div className="flex justify-center pt-4">
          <button
            className="inline-flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors group"
            onClick={startReviewMode}
          >
            <span>Start Review</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPrompt;
