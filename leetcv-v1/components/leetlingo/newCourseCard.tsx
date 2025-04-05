import React from "react";
import { ChevronRight } from "lucide-react";
import { shortNumber } from "@constants/defaults";
import { trpc } from "@utils/trpc";
import { Progress } from "shadcn/components/ui/progress";
import { useSession } from "next-auth/react";

export function NewCourseCard({
  course,
  onCourseClick,
  type,
}: {
  course: {
    activeLearners: number;
    courseId: string;
    title: string;
    description: string;
    imageUrl: string;
    iconUrl: string;
    courseName: string;
    tags: string[];
    totalUnits: number;
    totalNoOfUnits: number;
    progress?: number;
  };
  onCourseClick: (courseId: string, courseName: string) => void;
  type: "enrolled" | "new" | "completed";
}) {

  const { status } = useSession();
  const { data: completedLessons } = trpc.useQuery(
    [
      "fs.leetCourseRouter.getAllCompletedLessons",
      { courseName: course.courseName },
    ],
    {
      enabled: status === "authenticated",
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 2,
    }
  );

  return (
    <div className="max-w-sm mx-auto">
      <div className="border border-indigo-200 row-span-1 pb-4 rounded-xl group/bento hover:shadow-xl shadow-indigo-200 transition duration-200 shadow-sm dark:shadow-none dark:bg-black dark:border-white/[0.2] flex flex-col">

        <div className="w-full">
          <img
            src={course.imageUrl}
            className="h-48 w-full rounded-t-xl"
            alt="thumbnail"
          />
        </div>
        <div className="p-4 group-hover/bento:translate-x-2 transition duration-200">
          <div className="space-y-4">
            <div className="flex items-center flex-wrap gap-2">
              {course?.tags?.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-indigo-100 rounded-md px-2 py-1.5 font-medium text-indigo-900"
                >
                  {tag.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <h3 className="text-base line-clamp-2 font-semibold leading-tight hover:text-indigo-500 cursor-pointer" onClick={() => onCourseClick(course.courseId, course.courseName)}>
              {course.courseName}
            </h3>

            <div className="font-medium text-xs text-gray-500">
              <span>
                Total: {type === "enrolled"
                  ? completedLessons?.overall?.totalUnits
                  : course.totalNoOfUnits} {" "}
                Units
              </span>
            </div>

            {type !== "enrolled" && (
              <div className="h-0.5 w-full rounded-full bg-gray-400 shadow-lg" />
            )}

            {type === "enrolled" && (
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full dark:bg-gray-700">
                  <Progress
                    value={
                      completedLessons?.overall?.percentage
                        ? completedLessons?.overall?.percentage
                        : 0
                    }
                    indicatorClassName="bg-indigo-600"
                    className="h-2 w-full bg-white/20"
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600 dark:text-gray-400">
                    Course Progress
                  </span>
                  <span className="font-medium text-gray-700">
                    {completedLessons?.overall?.percentage
                      ? completedLessons?.overall?.percentage
                      : 0}
                    %
                  </span>
                </div>
              </div>
            )}

            <div
              className={`flex items-center ${course?.activeLearners ? "justify-between" : "justify-end"
                } `}
            >
              {course?.activeLearners && (
                <div className="flex items-center gap-2">
                  <span className="animate-ping block h-1.5 w-1.5 rounded-full ring-0 ring-green-500 bg-green-800"></span>
                  <p className="w-full flex text-sm items-center gap-2">
                    <span className="font-semibold">
                      {shortNumber(course?.activeLearners)}
                    </span>
                    <span className="">Learners</span>
                  </p>
                </div>
              )}
              <button
                className="bg-indigo-500 text-white px-4 flex items-center gap-1 py-2 rounded-full text-sm font-semibold 
                shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out
                hover:bg-indigo-600 hover:text-white cursor-pointer
                active:scale-95 active:shadow-sm"
                onClick={() =>
                  onCourseClick(course.courseId, course.courseName)
                }
              >
                {type === "enrolled" ? "Continue" : "Start"}
                <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
