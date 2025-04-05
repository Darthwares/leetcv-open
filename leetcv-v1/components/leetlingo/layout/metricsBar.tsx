import { PlusIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import {
  CoursesLeetLingoSvg,
  FireSvg,
  GemsSvg,
  HeartSvg,
  TreasureSvg,
  UnlimitedHeartsSvg,
} from "@components/svg";
import { useRecoilState } from "recoil";
import {
  gemsState,
  livesState,
  resumeState,
  userIdState,
  subscriptionPlanState,
} from "@state/state";
import HeartsCard from "./heartsCard";
import StreakCard from "./streakCard";
import { useSession } from "next-auth/react";
import { trpc } from "@utils/trpc";
import { Skeleton } from "shadcn/components/ui/skeleton";
import { useEffect, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";

const MetricsBar = () => {
  const [lives] = useRecoilState(livesState);
  const [gems] = useRecoilState(gemsState);
  const router = useRouter();
  const { courseName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);

  const { status } = useSession();
  const { data: userCurrentCourses } = trpc.useQuery(
    ["fs.leetCourseRouter.getUserCurrentCourses", { userId }],
    { enabled: status === "authenticated" }
  );
  const [days, setDays] = useState([]);
  const [plan] = useRecoilState(subscriptionPlanState);

  const { data: streak } = trpc.useQuery(
    ["fs.leetCourse.getStreak", { userId: userId }],
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    if (streak?.days) {
      setDays(streak?.days);
    }
  }, [streak]);

  const { isLoading: isLoadingLives } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseLives", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { isLoading: isLoadingGems } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseGems", { id: userId }],
    {
      enabled: !!userId,
    }
  );
  const handleCourseClick = (course: any) => {
    let section = "basic";
    if (course.difficulty === "advancedList") {
      section = "advance";
    } else if (course.difficulty === "expertList") {
      section = "expert";
    }

    router.push(
      `/s/course/${course.courseName}_${course.courseId}/sections/${section}`
    );
  };

  return (
    <div className="max-w-lg mx-auto flex items-center justify-between gap-2 lg:gap-6">
      <div className="relative group hover:bg-gray-100 p-2 rounded-lg">
        <CoursesLeetLingoSvg className="w-7 h-7 cursor-pointer text-indigo-500 dark:text-indigo-600" />
        <div className="pt-4 text-center hidden absolute group-hover:block top-8 left-[5px] lg:-left-12 mt-2 z-50 w-[17rem] sm:w-[19rem]">
          <div className=" bg-white shadow-lg rounded-lg border border-gray-300 overflow-y-auto h-auto max-h-[22rem]">
            <div className="absolute top-2 left-3 lg:left-14 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-300 z-10" />
            <div className=" text-left pl-4 font-bold py-4 text-gray-500 border-b border-gray-300">
              My courses
            </div>
            <div className="flex flex-col">
              <div className="border-b border-gray-300 flex items-center py-4 font-bold px-6  gap-2 whitespace-nowrap cursor-pointer text-indigo-600 bg-indigo-50 z-20">
                {courseTitle}
              </div>
              {userCurrentCourses?.map(
                (course: any) =>
                  course.courseName !== courseTitle && (
                    <button
                      key={course.courseName}
                      className={`w-full text-left text-gray-500 border-b border-gray-300 flex items-center py-4 font-bold px-6 gap-2 whitespace-nowrap hover:bg-gray-100`}
                      onClick={() => handleCourseClick(course)}
                    >
                      {course.courseName}
                    </button>
                  )
              )}
            </div>
            <button
              className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-4 py-4 px-6"
              onClick={() => {
                router.push("/s/course");
              }}
            >
              <PlusIcon className="w-6 h-6 border border-gray-300 rounded-md p-1 font-bold text-gray-600" />
              Add a new course
            </button>
          </div>
        </div>
      </div>
      <div className="relative group flex items-center p-2 rounded-lg hover:bg-gray-100">
        <FireSvg
          className={`w-7 pr-2 ${
            days?.length > 0 ? "text-indigo-500" : "text-gray-400"
          }`}
        />
        <span
          className={`${
            days?.length > 0 ? "text-indigo-500" : "text-gray-400"
          }`}
        >
          {days?.length}
        </span>
        <div className="pt-4 hidden absolute group-hover:block top-6 left-[-3.5rem] md:-left-20 mt-2 w-72 md:w-80 z-50">
          <div className=" bg-white shadow-lg rounded-lg border border-gray-300">
            <div className="absolute top-2 left-20 md:left-24 w-4 h-4 bg-gray-100 transform rotate-45 border-t border-l border-gray-300" />
            <StreakCard days={days} />
          </div>
        </div>
      </div>
      <div className="relative group flex items-center gap-1 p-2 rounded-lg text-indigo-600 hover:bg-gray-100">
        <GemsSvg className="w-8 text-indigo-600 " />
        {isLoadingGems ? <Skeleton className="w-7 h-7" /> : <span>{gems}</span>}
        <div className="pt-4 hidden absolute group-hover:block top-6 lg:-left-28 -left-28 z-50 mt-2 w-64">
          <div className=" bg-white shadow-lg rounded-lg border p-4 border-gray-300">
            <div className="absolute top-2 left-40 lg:left-36 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-300" />
            <div className="flex justify-around">
              <TreasureSvg className="w-14 h-14" />
              <div className="text-sm flex flex-col gap-y-2">
                <p className="font bold text-lg">Gems Earned</p>
                <p className="text-gray-500">You have {gems} gems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative group flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100">
        {plan === "Pro" ? (
          <UnlimitedHeartsSvg className="w-9 h-9" />
        ) : (
          <HeartSvg lives={lives} isHeartBeating={false} />
        )}
        {plan !== "Pro" && (
          <>
            {isLoadingLives ? (
              <Skeleton className="w-7 h-7" />
            ) : (
              <span
                className={`${lives > 0 ? "text-red-500" : "text-gray-400"}`}
              >
                {lives}
              </span>
            )}
          </>
        )}
        <div className="pt-4 hidden absolute z-50  group-hover:block top-6 right-[-1rem] md:right-0 mt-2 w-64 md:w-80">
          <div className=" bg-white shadow-lg rounded-lg border p-4 border-gray-300">
            <div className="absolute top-2 right-5 w-4 h-4 bg-white transform rotate-45 border-t border-l border-gray-300" />
            <HeartsCard />
          </div>
        </div>
      </div>
      <div className="block lg:hidden">
        <button
          className=" text-indigo-600 hover:text-indigo-700"
          onClick={() => router.push(`/s/course/profile/${resume.handle}`)}
        >
          <UserCircleIcon className="w-7 h- text-indigo-600" />
        </button>
      </div>
    </div>
  );
};

export default MetricsBar;
