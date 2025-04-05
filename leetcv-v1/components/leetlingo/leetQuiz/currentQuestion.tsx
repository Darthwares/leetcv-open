import React from "react";
import ContinueButton from "./continueButton";
import CheckButton from "./checkButton";
import { CheckIcon, XIcon } from "@heroicons/react/solid";

interface CurrentQuestionProps {
  currentQuestionData: any;
  showResult: boolean;
  isCorrect: boolean;
  selectedOption: string | null;
  buttonTitle: string;
  handleOptionSelect: (option: string) => void;
  handleCheck: () => void;
  handleContinue: () => void;
  questionNumber: number;
}

const CurrentQuestion = ({
  currentQuestionData,
  showResult,
  isCorrect,
  selectedOption,
  buttonTitle,
  handleOptionSelect,
  handleCheck,
  handleContinue,
  questionNumber,
}: CurrentQuestionProps) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="mb-4">
        <span className="text-xl mb-6 font-bold">
          <span>
            {questionNumber + 1}
            {") "}
          </span>
          {currentQuestionData?.questions}
        </span>
      </div>

      <div className="space-y-4">
        {currentQuestionData.multipleChoices.map(
          (option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={showResult}
              className={`w-full p-2 rounded-2xl border-2 text-left transition-all shadow-sm
                  ${
                    selectedOption === option
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }
                  ${showResult ? "opacity-75 cursor-not-allowed" : ""}`}
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-200 text-center mr-4">
                {index + 1}
              </span>
              {option}
            </button>
          )
        )}
      </div>

      {showResult && (
        <div
          className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
            isCorrect
              ? "bg-[#58cc02]/20 text-[#58cc02]"
              : "bg-red-500/10 text-red-500"
          }`}
        >
          {isCorrect ? (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-6 h-6" />
                <span>Nice!</span>
              </div>
              <ContinueButton
                handleContinue={handleContinue}
                buttonText={buttonTitle}
                bgColor="bg-green-500 hover:bg-green-600 hidden md:block"
              />
            </div>
          ) : (
            <div className="flex items-center justify-between w-full">
              <div className="flex md:items-center gap-2">
                <XIcon className="w-6 h-6" />
                <span>Correct answer: {currentQuestionData.correctAnswer}</span>
              </div>
              <ContinueButton
                handleContinue={handleContinue}
                buttonText={buttonTitle}
                bgColor="bg-red-500 hover:bg-red-600 hidden md:block"
              />
            </div>
          )}
        </div>
      )}

      {!showResult && (
        <div className="mt-5 hidden md:flex justify-end">
          <CheckButton
            handleCheck={handleCheck}
            selectedOption={selectedOption!}
          />
        </div>
      )}

      <div className="mt-6 flex justify-end md:hidden">
        {showResult ? (
          <ContinueButton
            handleContinue={handleContinue}
            buttonText={buttonTitle}
            bgColor="bg-indigo-500 hover:bg-indigo-600"
          />
        ) : (
          <CheckButton
            handleCheck={handleCheck}
            selectedOption={selectedOption!}
          />
        )}
      </div>
    </div>
  );
};

export default CurrentQuestion;
