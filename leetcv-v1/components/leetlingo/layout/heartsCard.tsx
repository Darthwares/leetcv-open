import { useRecoilState, useSetRecoilState } from "recoil";
import {
  userIdState,
  livesState,
  gemsState,
  isQuizVisibleState,
  practiceQuizState,
  practiceQuestionsState,
  subscriptionPlanState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { HeartSvg, UnlimitedHeartsSvg } from "@components/svg";
import { GemIcon } from "lucide-react";
import {
  GEM_COST_PER_LIFE,
  getMaxLives,
  REFILL_COST,
} from "@constants/defaults";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";

const HeartsCard = () => {
  const [userId] = useRecoilState(userIdState);
  const [lives, setLives] = useRecoilState(livesState);
  const [gems, setGems] = useRecoilState(gemsState);
  const [nextHeartHours, setNextHeartHours] = useState(0);
  const [nextHeartMinutes, setNextHeartMinutes] = useState(0);
  const setIsQuizVisible = useSetRecoilState(isQuizVisibleState);
  const isPracticeQuiz = useSetRecoilState(practiceQuizState);
  const [isPracticeQuestionsThere] = useRecoilState(practiceQuestionsState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const maxLives = getMaxLives(plan);

  const { data: courseLives } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseLives", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (courseLives) {
      const hours = Math.floor(courseLives.nextHeartIn / 60);
      const minutes = courseLives.nextHeartIn % 60;
      setNextHeartHours(hours);
      setNextHeartMinutes(minutes);
    }
  }, [courseLives]);

  const setLeetCourseLives = trpc.useMutation(
    "fs.leetCourse.updateLeetCourseLive"
  );
  const setLeetCourseGems = trpc.useMutation(
    "fs.leetCourse.updateLeetCourseGems"
  );

  const handleRefill = () => {
    if (gems < REFILL_COST || lives === maxLives) return;

    const livesToRefill = maxLives! - lives;
    const newGems = gems - livesToRefill * GEM_COST_PER_LIFE;

    setLives(maxLives!);
    setGems(newGems);

    setLeetCourseLives.mutate({ id: userId, live: maxLives! });
    setLeetCourseGems.mutate({ id: userId, gems: newGems });
  };

  const handlePracticeQuiz = () => {
    if (isPracticeQuestionsThere) {
      isPracticeQuiz(true);
      setIsQuizVisible(true);
    } else {
      toast.info(
        "Practice Questions are not available for this course, we will add them as soon as possible"
      );
    }
  };

  return (
    <div className="max-w-sm mx-auto">
      <h2 className="text-center text-lg font-bold text-gray-800">Hearts</h2>

      {plan === "Pro" ? (
        <div className="flex justify-center my-2">
          <UnlimitedHeartsSvg className="w-12 h-12" />
        </div>
      ) : (
        <>
          {lives === 0 ? (
            <div className="flex justify-center mt-2 mb-4 gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <HeartSvg key={index} lives={lives} isHeartBeating={false} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center mt-2 mb-4 gap-2">
              {Array.from({ length: Math.min(lives, 5) }, (_, index) => (
                <HeartSvg key={index} lives={lives} isHeartBeating={false} />
              ))}
              {lives > 5 && (
                <span className="text-sm text-gray-500">+{lives - 5}</span>
              )}
            </div>
          )}
        </>
      )}

      <div className="text-center flex flex-col gap-2">
        {plan === "Pro" ? (
          <>
            <p className="text-gray-800 font-medium">
              You have unlimited hearts
            </p>
            <p className="text-gray-500 text-sm">Keep on learning</p>
          </>
        ) : (
          <>
            {lives > 0 ? (
              <>
                <p className="text-gray-800 font-medium">
                  {lives === maxLives
                    ? "You have full hearts"
                    : "You still have hearts left!"}
                </p>
                <p className="text-gray-500 text-sm">Keep on learning</p>
              </>
            ) : (
              <p className="flex flex-col gap-2 items-center text-sm text-gray-800 font-medium">
                <span>You need hearts to start new lessons!</span>
                {nextHeartHours > 0 ? (
                  <span>Next heart in {nextHeartHours} hours</span>
                ) : (
                  <span>Next heart in {nextHeartMinutes} minutes</span>
                )}
              </p>
            )}
          </>
        )}
      </div>

      {plan !== "Pro" && (
        <>
          <UnlimitedHeartsSection />
          <button
            className={`w-full ${
              lives === maxLives ? "disabled:cursor-default" : "cursor-pointer"
            } text-xs flex justify-between items-center mt-3 p-3 bg-gray-100 rounded-xl border border-gray-300`}
            disabled={lives === maxLives}
            onClick={handleRefill}
          >
            <div className="flex items-center text-gray-600">
              <HeartSvg lives={0} isHeartBeating={false} />
              <span className="font-medium text-gray-600 pl-2">
                REFILL HEARTS
              </span>
            </div>
            <div className="flex items-center text-gray-600">
              <span className="font-medium">{REFILL_COST}</span>
              <GemIcon className="w-8 text-indigo-600" />
            </div>
          </button>
        </>
      )}

      {lives === 0 && (
        <button
          className={`w-full  text-xs flex justify-between items-center mt-3 p-3 bg-gray-100 rounded-xl border border-gray-300`}
          onClick={handlePracticeQuiz}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center text-gray-600">
              <HeartSvg lives={2} isHeartBeating={false} />
              <p className="font-medium text-sm text-gray-600 pl-2">+1 Heart</p>
            </div>
            <p className="text-sm font-medium text-gray-800">Practice</p>
          </div>
        </button>
      )}
    </div>
  );
};

const UnlimitedHeartsSection = () => (
  <div className="text-xs flex justify-between cursor-pointer items-center mt-6 p-3 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300">
    <div className="flex items-center">
      <UnlimitedHeartsSvg />
      <span className="font-medium text-gray-700">UNLIMITED HEARTS</span>
    </div>
    <Link href="/pricing">
      <button className="text-indigo-600 font-semibold">GET PRO</button>
    </Link>
  </div>
);

export default HeartsCard;
