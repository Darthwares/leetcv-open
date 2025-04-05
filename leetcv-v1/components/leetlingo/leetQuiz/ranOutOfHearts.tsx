import React, { useEffect, useState } from "react";
import { GemIcon, Heart, X } from "lucide-react";
import Link from "next/link";
import {
  gemsState,
  isQuizVisibleState,
  livesState,
  practiceQuestionsState,
  practiceQuizState,
  subscriptionPlanState,
  userIdState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getMaxLives, REFILL_COST } from "@constants/defaults";
import { trpc } from "@utils/trpc";
import { UnlimitedHeartsSvg } from "@components/svg";
import { toast } from "react-toastify";

type RanOutOfHeartsProps = {
  isQuizComponent: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const RanOutOfHearts: React.FC<RanOutOfHeartsProps> = ({
  isQuizComponent,
  setShowModal,
}) => {
  const [userId] = useRecoilState(userIdState);
  const [lives, setLives] = useRecoilState(livesState);
  const [gems, setGems] = useRecoilState(gemsState);
  const setIsQuizVisible = useSetRecoilState(isQuizVisibleState);
  const isPracticeQuiz = useSetRecoilState(practiceQuizState);
  const [nextHeartHours, setNextHeartHours] = useState(0);
  const [nextHeartMinutes, setNextHeartMinutes] = useState(0);
  const [isPracticeQuestionsThere] = useRecoilState(practiceQuestionsState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const maxLives = getMaxLives(plan);

  const setLeetCourseLives = trpc.useMutation(
    "fs.leetCourse.updateLeetCourseLive"
  );
  const setLeetCourseGems = trpc.useMutation(
    "fs.leetCourse.updateLeetCourseGems"
  );

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

  const handleRefill = () => {
    if (gems < REFILL_COST) return;

    const newGems = gems - REFILL_COST;

    setLives(maxLives!);
    setGems(newGems);

    setLeetCourseLives.mutate({ id: userId, live: maxLives! });
    setLeetCourseGems.mutate({ id: userId, gems: newGems });
  };

  const handleClose = () => {
    setShowModal(false);
    setIsQuizVisible(false);
    setLives((prevLives) => {
      setLeetCourseLives.mutate({ id: userId, live: prevLives });
      return prevLives;
    });
    setGems((prevGems) => {
      setLeetCourseGems.mutate({ id: userId, gems: prevGems });
      return prevGems;
    });
  };

  const handlePracticeQuiz = () => {
    if (isPracticeQuestionsThere) {
      isPracticeQuiz(true);
      setIsQuizVisible(true);
      setShowModal(false);
    } else {
      toast.info(
        "Practice Questions are not available for this course, we will add them as soon as possible"
      );
    }
  };

  return (
    <div className="rounded-2xl sm:min-w-[450px] w-full p-6">
      <div className="text-center mb-6">
        {isQuizComponent && (
          <div className="flex justify-end mt-8">
            <div className="flex items-center justify-center gap-2">
              <div className="bg-blue-500/20 px-3 py-1 rounded-lg">
                <span className="text-indigo-600 font-medium flex items-center gap-1">
                  <GemIcon className="w-4 h-4 text-indigo-500" /> {gems}
                </span>
              </div>
            </div>
          </div>
        )}
        <h2 className="mt-3 text-2xl font-bold mb-2">
          {isQuizComponent ? (
            <span>You ran out of hearts!</span>
          ) : (
            <div className="flex flex-col items-center gap-2.5">
              <span>You need hearts to start new lessons!</span>
              {nextHeartHours > 0 ? (
                <span>Next heart in {nextHeartHours} hours</span>
              ) : (
                <span>Next heart in {nextHeartMinutes} minutes</span>
              )}
            </div>
          )}
        </h2>
      </div>

      <div className="bg-gradient-to-r from-indigo-300 to-pink-400 rounded-xl p-4 mb-4 border border-purple-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <UnlimitedHeartsSvg />
            <span className="text-white font-medium">Unlimited Hearts</span>
          </div>
          <Link href={"/pricing"}>
            <button className="bg-pink-500 text-sm hover:bg-pink-600 text-white px-3 py-2 rounded-lg font-medium transition-colors">
              GET PRO PLAN
            </button>
          </Link>
        </div>
      </div>

      <div
        className="bg-gray-200 rounded-xl cursor-pointer p-4 mb-6"
        onClick={handleRefill}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="text-red-500" size={24} fill="currentColor" />
            <span className="text-gray-800 font-semibold">Refill</span>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
            <GemIcon className="w-4 h-4 text-white" />
            500
          </button>
        </div>
      </div>

      {!isQuizComponent && (
        <div
          className="bg-gray-200 cursor-pointer rounded-xl p-4 mb-6"
          onClick={handlePracticeQuiz}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="text-red-500" size={24} fill="currentColor" />
              <span className="text-gray-800 font-semibold">+1 Heart</span>
            </div>
            <div className="text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors flex text-sm items-center gap-2">
              Practice
            </div>
          </div>
        </div>
      )}
      {/* 
      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 text-sm rounded-xl mb-4 transition-colors"> */}
      {/* Free trial button */}
      {/* <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3.5 text-sm rounded-xl mb-4 transition-colors">
        TRY 2 WEEKS FOR FREE
      </button> */}

      <button
        onClick={handleClose}
        className="w-full text-sm text-blue-500 hover:text-blue-600 font-medium transition-colors"
      >
        NO THANKS
      </button>
    </div>
  );
};

export default RanOutOfHearts;
