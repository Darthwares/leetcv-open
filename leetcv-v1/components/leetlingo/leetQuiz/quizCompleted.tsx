import { getTextBeforeUnderscore } from "@constants/defaults";
import { isQuizVisibleState, practiceQuizState } from "@state/state";
import { GemIcon, Trophy } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

type QuizCompletionProps = {
  nextLesson: () => void;
  onRestart: () => void;
  totalQuestions: number;
  correctAnswers: number;
};

const QuizCompletion = ({
  nextLesson,
  onRestart,
  totalQuestions,
  correctAnswers,
}: QuizCompletionProps) => {
  const score = Math.round((correctAnswers / totalQuestions) * 100);
  const router = useRouter();
  const [isPracticeQuiz, setIsPracticeQuiz] = useRecoilState(practiceQuizState);
  const setIsQuizVisible = useSetRecoilState(isQuizVisibleState);
  const { courseName } = router.query;

  return (
    <div className="bg-white rounded-2xl sm:min-w-[400px] px-5 pb-5 md:px-8 md:pb-8 w-full text-center shadow-xl">
      <div className="w-36 h-36 mx-auto">
        <lottie-player
          src="/assets/lottie/party-popper.json"
          speed="1"
          loop
          autoplay
        />
      </div>
      <div className="flex items-center justify-center gap-2 mb-2">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-gray-900 text-xl md:text-2xl font-bold">
          {isPracticeQuiz ? "Practice" : "Topic"} Completed!
        </h2>
      </div>

      <p className="text-gray-600 text-lg mb-4 capitalize">
        You have successfully completed the{" "}
        {isPracticeQuiz
          ? "Practice"
          : getTextBeforeUnderscore(courseName as string)}{" "}
        Quiz!
      </p>

      <p className="text-indigo-500 inline-flex items-center gap-2 justify-center bg-gray-100 py-2 px-5 rounded-full font-medium mb-5">
        You earned 10 gems! <GemIcon className="w-4 h-4 text-indigo-500" />{" "}
      </p>

      <div className="space-y-6 mb-8">
        <div className="text-left">
          <h3 className="text-2xl font-bold mb-2">Score: {score}%</h3>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full w-full bg-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>

        {!isPracticeQuiz && (
          <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
            <div className="text-left">
              <div className="text-sm text-gray-500">Correct Answers</div>
              <div className="text-xl font-semibold">
                {correctAnswers} / {totalQuestions}
              </div>
            </div>
          </div>
        )}
      </div>

      {isPracticeQuiz ? (
        <button
          className="py-4 w-full bg-indigo-500 hover:bg-indigo-600 text-gray-900 font-bold rounded-2xl transition-colors"
          onClick={() => {
            setIsPracticeQuiz(false);
            setIsQuizVisible(false);
          }}
        >
          Go to Lessons
        </button>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={onRestart}
            className="py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-colors"
          >
            Retry Topic
          </button>
          <button
            className="py-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-2xl transition-colors"
            onClick={nextLesson}
          >
            Next Topic
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizCompletion;
