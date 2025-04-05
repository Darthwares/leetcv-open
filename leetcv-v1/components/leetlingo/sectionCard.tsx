import React, { useEffect, useState } from "react";
import { ChevronRight, Lock, Plus, Trophy } from "lucide-react";
import { Progress } from "shadcn/components/ui/progress";
import { Button } from "shadcn/components/ui/button";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { toast } from "react-toastify";
import { mapLevels } from "@constants/defaults";
import Modal from "@components/collegeDashboard/modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "shadcn/components/ui/popover";
import CourseDetail from "./courseDetail";
import { PracticeQuestionSet, SectionType } from "types/courses";
import { userIdState } from "@state/state";
import { useRecoilState } from "recoil";
import { LockClosedIcon } from "@heroicons/react/solid";
import NoContent from "./noContent";

const SectionCard: React.FC<SectionType> = ({
  title,
  progress,
  buttonText,
  description,
  levels,
  icon: Icon,
  image,
  isStarted,
  completed,
  total,
  isExist,
  isPrevSectionCompleted,
}) => {
  const router = useRouter();
  const section = title.toLowerCase().replace(" ", "-");
  const textColor = isStarted ? "text-white" : "text-black";
  const { courseName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const [practiceQuestionsState, setPracticeQuestionsState] = useState<
    PracticeQuestionSet[]
  >([]);

  const [userId] = useRecoilState(userIdState);

  const { data: userCurrentCourses } = trpc.useQuery([
    "fs.leetCourseRouter.getUserCourseDifficulty",
    {
      userId,
      courseName: courseTitle?.toString() ?? "",
    },
  ]);
  const setCurrentUnit = trpc.useMutation([
    "fs.leetCourseRouter.setCurrentUnit",
  ]);
  const setCourseDetails = trpc.useMutation([
    "fs.leetCourseRouter.setCourseDetails",
  ]);

  const setActiveLearners = trpc.useMutation([
    "fs.leetCourseRouter.incrementActiveLearners",
  ]);

  const { data: hasUnits } = trpc.useQuery([
    "fs.leetCourseRouter.hasUnits",
    {
      courseName: courseTitle as string,
      level: mapLevels(section),
    },
  ]);
  const { data: leetQuestionBankPracticeQns } = trpc.useQuery([
    "fs.leetCourseRouter.getQuestionBankPracticeQuestions",
    {
      courseName: courseTitle as string,
    },
  ]);

  useEffect(() => {
    if (leetQuestionBankPracticeQns?.length !== 0) {
      setPracticeQuestionsState(leetQuestionBankPracticeQns!);
    }
  }, [practiceQuestionsState]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const setPracticeQuestions = trpc.useMutation([
    "fs.leetCourseRouter.setPracticeQuestions",
  ]);

  const handleLevelButtonClick = React.useCallback(
    async (buttonText: string, title: string) => {
      if (!hasUnits?.exists) {
        // toast.error("No units found for this level");
        return;
      }
      if (buttonText === "LOCKED") {
        return;
      }
      if (
        buttonText === "START" &&
        title === "Basic" &&
        Object.keys(userCurrentCourses || {}).length === 0
      ) {
        setActiveLearners.mutateAsync({
          courseName: courseTitle as string,
        });
      }

      if (buttonText === "START") {
        try {
          if (title === "Basic" && Object.keys(userCurrentCourses || {}).length === 0) {
            await Promise.all([
              setCurrentUnit.mutateAsync({
                courseName: courseTitle,
                courseId: courseId as string,
                difficulty: { level: "easyList", unit: 0, lesson: 0 },
              }),
              setCourseDetails.mutateAsync({
                courseId: courseId as string,
                difficulty: mapLevels(title.toLowerCase()),
              })
            ]);
          }


          if (practiceQuestionsState && practiceQuestionsState.length !== 0) {
            await setPracticeQuestions.mutateAsync({
              courseName: courseTitle,
              difficulty: "practiceList",
            });
          }

          router.push(`/s/course/${courseName}/sections/${section}`);
        } catch (error) {
          console.error("Error updating course details:", error);
          toast.error("Failed to update course details");
        }
      } else {
        router.push(`/s/course/${courseName}/sections/${section}`);
      }
    },
    [
      hasUnits,
      courseName,
      section,
      router,
      setCurrentUnit,
      setCourseDetails,
      courseTitle,
      courseId,
      setPracticeQuestions,
      leetQuestionBankPracticeQns,
    ]
  );

  return (
    <div className="w-full">
      <div
        className={`relative overflow-hidden rounded-lg w-full h-[400px] group transition-transform hover:scale-[1.01] ${isStarted
            ? "bg-gradient-to-br from-indigo-500 to-purple-600 opacity-100"
            : ""
          }`}
      >
        <div
          className="absolute inset-0 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${progress === 100 ? "/assets/completed.gif" : "/assets/family.png"
              })`,
            backgroundSize: "contain",
            backgroundPosition: "top",
            backgroundRepeat: "no-repeat",
            transform: "scale(0.8)",
            top: "-60px",
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent ${!isStarted && "bg-gray-500/50"
            } ${textColor}`}
        />
        <div className="absolute bottom-0 space-y-2 p-6 w-full bg-gradient-to-t from-black/90 via-black/60 to-transparent">
          <div className="flex justify-between items-start mb-2">
            <h2
              className={`text-2xl font-bold ${isStarted ? "text-white" : "text-gray-400"
                } drop-shadow-md`}
            >
              {title} Level
            </h2>
          </div>

          {isStarted ? (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-white">Progress</span>
                <span className="font-medium text-white">{progress}%</span>
              </div>
              <Progress
                value={progress}
                indicatorClassName="bg-green-600"
                className="h-2 w-full bg-white/20"
              />

              {progress === 100 && (
                <div className="text-2xl font-semibold text-white absolute top-[-110px] left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                  <span>🎉</span>
                  Completed
                  <span>🏆</span>
                </div>
              )}
              {total ? (
                <div className="flex items-center justify-between">
                  <div className="flex text-base items-center font-semibold gap-1 text-gray-300">
                    {completed} / {total} Units
                  </div>
                  {progress === 100 ? (
                    <Trophy
                      className="h-5 w-5 text-yellow-500 font-semibold drop-shadow"
                      fill="currentColor"
                    />
                  ) : (
                    <Trophy className="h-5 w-5 text-white font-semibold drop-shadow" />
                  )}
                </div>
              ) : null}
            </div>
          ) : (
            <div className="space-y-3 tracking-wider">
              {total ? (
                <div
                  className={`font-medium ${isStarted ? "text-white" : "text-gray-400"
                    } drop-shadow-md flex text-base items-center font-semibold gap-1`}
                >
                  <Lock className="h-5 w-5" />
                  {total} Units
                </div>
              ) : null}
            </div>
          )}

          <p
            className={`font-medium ${isStarted ? "text-white" : "text-gray-400"
              } drop-shadow-md mt-2 line-clamp-2 mb-4`}
          >
            {description}
          </p>
          <div className="h-4" />

          {buttonText && buttonText !== "LOCKED" ? (
            <Button
              // disabled={!isStarted}
              className={`inline-flex items-center gap-1 px-4 py-2 rounded-full ${isStarted
                  ? `bg-white text-emerald-500 hover:bg-gray-100 transition-colors`
                  : "bg-gray-300 text-gray-500"
                } font-semibold tracking-wider`}
              onClick={() => handleLevelButtonClick(buttonText, title)}
            >
              {buttonText === "LOCKED" && <Lock className="h-4 w-4" />}
              {buttonText}
              <ChevronRight className="h-4 w-4 font-extrabold" />
            </Button>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                {buttonText && (
                  <Button
                    className={`inline-flex items-center gap-1 px-4 py-2 rounded-full ${isStarted
                        ? `bg-white text-emerald-500 hover:bg-gray-100 transition-colors`
                        : "bg-gray-300 text-gray-500"
                      } font-semibold tracking-wider`}
                    onClick={() => handleLevelButtonClick(buttonText, title)}
                  >
                    {buttonText === "LOCKED" && (
                      <LockClosedIcon className="h-4 w-4" fill="currentColor" />
                    )}
                    {buttonText}
                    <ChevronRight className="h-4 w-4 font-extrabold" />
                  </Button>
                )}
              </PopoverTrigger>
              <PopoverContent className={`bg-none border-none shadow-none`}>
                {!isExist && (
                  <NoContent
                    title={
                      !isPrevSectionCompleted
                        ? "Previous Level"
                        : "No Content Available"
                    }
                    description={
                      !isPrevSectionCompleted
                        ? "Complete all units in the previous level to unlock this!"
                        : "This section currently has no content. Please check back later!"
                    }
                  />
                )}
              </PopoverContent>
            </Popover>
          )}
        </div>
        {hasUnits?.exists && (
          <div className={`absolute bottom-4 right-4 z-10`}>
            <button
              onClick={handleOpenModal}
              className="bg-white bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors"
            >
              <Plus className="w-6 h-6 text-white" />
            </button>
          </div>
        )}
      </div>

      <Modal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        className="max-w-xl"
        closeIconColor="text-gray-200 bg-gray-800 hover:text-white font-semibold"
        content={
          <CourseDetail
            section={mapLevels(section)}
            courseName={courseTitle}
            image={image}
            description={description!}
            progress={progress}
            completed={completed}
            total={total}
            levels={levels!}
            isStarted={isStarted}
          />
        }
      />
    </div>
  );
};

export default SectionCard;
