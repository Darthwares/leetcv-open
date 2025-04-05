import React, { useEffect, useState, useCallback, useRef } from "react";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { StarIcon } from "@heroicons/react/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  isQuizVisibleState,
  livesState,
  lessonIndexState,
  questionsState,
  unitIndexState,
  userCourseState,
  userIdState,
  practiceQuestionsState,
} from "@state/state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "shadcn/components/ui/popover";
import { GuideBookSvg } from "@components/svg";
import RightSidebar from "./layout/rightSidebar";
import LeetLingoModal from "./leetQuiz/leetLingoModal";
import RanOutOfHearts from "./leetQuiz/ranOutOfHearts";

import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { mapLevels } from "@constants/defaults";
import { Lesson, Question, Unit } from "types/courses";
import Modal from "@components/collegeDashboard/modal";
import UnitDetail from "./unitDetail";
import RewardUI from "./rewardUI";

interface CurvedPathProps {
  units: Unit[];
}

interface UnitProps {
  unit: Unit;
  index: number;
  activeUnit: Unit;
  courseName: string | string[] | undefined;
  sectionName: string | string[] | undefined;
  setIsQuizVisible: (value: boolean) => void;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const RingCircle = (props: any) => {
  return (
    <svg
      className="absolute pointer-events-none h-[95px] w-[83px] top-[32px] xl:h-[100px] xl:w-[93px] left-1/2 xl:top-[36px] transform -translate-x-1/2 -translate-y-1/2"
      viewBox="0 0 100 100"
      {...props}
    >
      <defs>
        <clipPath id="clip-session/ProgressRing10857">
          <path d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"></path>
        </clipPath>
      </defs>
      <g transform="translate(50, 50)">
        <path
          d="M3.061616997868383e-15,-50A50,50,0,1,1,-3.061616997868383e-15,50A50,50,0,1,1,3.061616997868383e-15,-50M-7.715274834628325e-15,-42A42,42,0,1,0,7.715274834628325e-15,42A42,42,0,1,0,-7.715274834628325e-15,-42Z"
          fill="rgb(231, 225, 225)"
        ></path>
        <circle
          clipPath="url(#clip-session/ProgressRing10857)"
          cx="-3.9949609477190866"
          cy="-45.82619651494328"
          fill="rgb(255, 255, 255)"
          r="4"
        ></circle>
        <path
          d="M3.061616997868383e-15,-50L2.5717582782094417e-15,-42Z"
          fill="gray"
        ></path>
      </g>
    </svg>
  );
};
export const getLessonClasses = (unit: number, lessonIndex: number) => {
  const classesForUnit = {
    even: [
      "left-0 mt-8",
      "left-11 mt-8",
      "left-16 mt-8",
      "left-11 mt-8",
      "left-0 mt-8",
      "-left-11 mt-8",
      "-left-16 mt-8",
      "-left-11 mt-8  ",
    ],
    odd: [
      "left-0 mt-8",
      "-left-11 mt-8",
      "-left-16 mt-8",
      "-left-11 mt-8",
      "left-0 mt-8",
      "left-11 mt-8",
      "left-16 mt-8",
      "left-11 mt-8",
    ],
  };

  return unit % 2 === 0
    ? classesForUnit.odd[lessonIndex % 8]
    : classesForUnit.even[lessonIndex % 8];
};

export const Peacock = (props: any) => {
  return <img alt="peakcock" src="/assets/peacock_react.png" {...props} />;
};

const UnitComponent: React.FC<UnitProps> = ({
  unit,
  index,
  activeUnit,
  courseName,
  sectionName,
  setIsQuizVisible,
  setShowModal,
}) => {
  const duolingoInstances = Math.ceil(unit.noOfLessons / 6);
  const [lives] = useRecoilState(livesState);
  const unitColor = unit.color ? unit.color : "rgba(88,204,2,1)";
  const setUnitIndex = useSetRecoilState(unitIndexState);
  const setLessonIndex = useSetRecoilState(lessonIndexState);
  const [userCourse, setUserCourse] = useRecoilState(userCourseState);
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const setIsPracticeQuestionsThere = useSetRecoilState(practiceQuestionsState);
  const setQuestions = useSetRecoilState(questionsState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChestOpen, setIsChestOpen] = useState(false);

  const currentLessonRef = useRef<HTMLDivElement | null>(null);

  const { status } = useSession();

  const [userId] = useRecoilState(userIdState);

  const { data: userCurrentCourses, isLoading: isUserCoursesLoading } =
    trpc.useQuery(
      [
        "fs.leetCourseRouter.getUserCourseDifficulty",
        { userId, courseName: courseName?.toString() ?? "" },
      ],
      { enabled: status === "authenticated" }
    );

  const { data: practiceQuestionsData } = trpc.useQuery([
    "fs.leetCourseRouter.getPracticeQuestions",
    {
      courseName: courseTitle,
      difficulty: "practiceList",
    },
  ]);

  useEffect(() => {
    if (practiceQuestionsData && practiceQuestionsData.length > 0) {
      setIsPracticeQuestionsThere(true);
      const firstPractice = practiceQuestionsData[0];
      if (firstPractice.questions) {
        setPracticeQuestions(firstPractice.questions);
      }
    } else {
      setIsPracticeQuestionsThere(false);
    }
  }, [practiceQuestionsData]);

  useEffect(() => {
    if (!isUserCoursesLoading && userCurrentCourses) {
      setUserCourse(userCurrentCourses);
    }
  }, [isUserCoursesLoading, userCurrentCourses, courseName]);

  const handleButtonClick = (questions: Question[], i: number) => {
    if (lives === 0) {
      setShowModal(true);
      if (practiceQuestions.length > 0) {
        setQuestions(practiceQuestions as Question[]);
      }
      return;
    }
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      toast.error("No questions found for this lesson");
      return;
    }
    setQuestions(questions);
    setLessonIndex(i);
    setUnitIndex(index);
    setIsQuizVisible(true);
  };

  const getLeftPosition = (
    index: number,
    duoIndex: number,
    noOfLessons: number
  ) => {
    const isMobile = window.innerWidth < 640;
    const isEvenIndex = index % 2 === 0;
    const isEvenDuo = duoIndex % 2 === 0;
    const basePosition = "50%";

    if (noOfLessons === 1) {
      let offset;
      if (isEvenIndex) {
        offset = isMobile ? "+ 3rem" : "+ 4rem";
      } else {
        offset = isMobile ? "- 8rem" : "- 12rem";
      }
      return `calc(${basePosition} ${offset})`;
    }

    if (isEvenIndex) {
      let offset;
      if (isEvenDuo) {
        offset = "+ 1rem";
      } else {
        offset = isMobile ? "- 9rem" : "- 12rem";
      }
      return `calc(${basePosition} ${offset})`;
    }

    let offset;
    if (isEvenDuo) {
      offset = isMobile ? "- 7rem" : "- 12rem";
    } else {
      offset = isMobile ? "+ 3rem" : "+ 1rem";
    }
    return `calc(${basePosition} ${offset})`;
  };

  const getTopPosition = (index: number, duoIndex: number, noOfLessons: number) => {
    const isMobile = window.innerWidth < 640;

    switch (noOfLessons) {
      case 1:
        return isMobile ? "1rem" : "0rem";
      case 2:
        return "6rem";
      default:
        return `${9 + duoIndex * 15}rem`;
    }
  }

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  useEffect(() => {
    if (currentLessonRef.current) {
      currentLessonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [userCourse]);

  return (
    <div
      key={unit.unitId}
      className={`relative unit ${unit.unitId === activeUnit?.unitId ? "active" : ""
        }`}
      data-unit-id={unit.unitId}
    >
      <div
        className={`flex justify-center items-center gap-3 text-zinc-400 max-w-lg mx-auto ${index === 0 ? "mb-20" : "my-20"
          }`}
      >
        <hr className="flex-grow border-gray-300" />
        <span>{unit.unitName}</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="relative flex flex-col items-center">
        {Array.from({ length: duolingoInstances }, (_, duoIndex) => (
          <div
            key={duoIndex}
            className="absolute w-24 h-24 xl:w-32 xl:h-32"
            style={{
              left: getLeftPosition(index, duoIndex, unit.noOfLessons),
              top: getTopPosition(index, duoIndex, unit.noOfLessons),
            }}
          >
            <Peacock className="w-full h-full" />
          </div>
        ))}

        {unit.noOfLessons > 0 &&
          unit.lessons.map((lesson: Lesson, i: number) => {
            const coloredButton = lesson.isCompleted;
            const isCurrent =
              mapLevels(sectionName as string) === userCourse.level &&
              index === userCourse.unit &&
              i === userCourse.lesson;

            const allPreviousLessonsCompleted = unit.lessons
              .slice(0, i)
              .every((lesson) => lesson.isCompleted);

            const allPreviousUnitsCompleted = unit.lessons
              .slice(0, i)
              .every((lesson: Lesson) => lesson.isCompleted);
            const allCurrentLessonsCompleted = unit.lessons.every(
              (lesson: Lesson) => lesson.isCompleted
            );
            const canUnlockChest =
              allPreviousLessonsCompleted &&
              allPreviousUnitsCompleted &&
              allCurrentLessonsCompleted;

            return (
              <div
                key={i}
                ref={isCurrent ? currentLessonRef : null}
                className={`flex flex-col items-center relative ${getLessonClasses(
                  index,
                  i
                )}
                  
            `}
              >
                {isCurrent && <RingCircle />}

                {coloredButton || isCurrent ? (
                  <button
                    style={{
                      backgroundColor: unitColor,
                      boxShadow: `0 6px 0 rgba(0,0,0,0.2), 0 6px 0 ${unitColor}`,
                    }}
                    className={`push-button 
                  relative inline-flex h-[55px] w-[55px] xl:h-[65px] xl:w-[65px] rounded-full cursor-pointer border-none p-0 outline-none
                  text-white
                  before:absolute before:left-0 before:top-[18.5px] before:h-[6px] before:w-full before:z-[-1]
                
                  after:absolute after:left-0 after:top-0 after:h-[55px] after:w-[55px] xl:after:h-[65px] xl:after:w-[65px] after:z-[-1]
                  after:rounded-full after:content-['']
                  transition-all duration-300 ease-in-out
                  hover:translate-y-1 hover:scale-y-95 
                  active:translate-y-2
                   active:scale-y-90 
                  
                  active:bg-opacity-90
                `}
                    aria-label="Practice"
                    onClick={(event) => handleButtonClick(lesson.questions, i)}
                  >
                    <StarIcon className="absolute left-[10px] top-[12px] xl:left-[7px] xl:top-[8px] h-8 w-8 xl:h-12 xl:w-12 text-white" />
                    {isCurrent && (
                      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="relative">
                          <div className="animate-bounce bg-white px-6 py-3 rounded-lg shadow-lg text-sm font-medium text-gray-900 border border-gray-200">
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-b border-r border-gray-200" />
                            <div
                              className="relative z-10 whitespace-nowrap font-bold"
                              style={{ color: unitColor }}
                            >
                              {index === 0 && i === 0 ? "Start" : "Continue"}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>
                ) : (
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        style={{
                          backgroundColor: "#e5e5e5",
                          boxShadow:
                            "0 6px 0 rgba(175,175,175,0.2), 0 6px 0 rgb(156,163,175)",
                        }}
                        className={` push-button 
                      relative inline-flex h-[55px] w-[55px] xl:h-[65px] xl:w-[65px] rounded-full cursor-pointer border-none p-0 outline-none
                      before:absolute before:left-0 before:top-[18.5px] before:h-[6px] before:w-full before:z-[-1]
                    
                      after:absolute after:left-0 after:top-0 after:h-[55px] after:w-[55px] xl:after:h-[65px] xl:after:w-[65px] after:z-[-1]
                      after:rounded-full after:content-['']
                      transition-all duration-300 ease-in-out
                      active:translate-y-1
                      active:bg-opacity-90
                    `}
                        aria-label="Practice"
                      >
                        <StarIcon className="absolute left-[10px] top-[12px] xl:left-[7px] xl:top-[8px] h-8 w-8 xl:h-12 xl:w-12 text-gray-400" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      className={`bg-none border-none shadow-none`}
                    >
                      <div className="relative px-4 py-2 rounded-xl shadow-lg text-sm bg-gray-100 font-medium border border-gray-300 p-2 text-gray-500  ">
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-gray-100 border-t border-l border-gray-300 " />
                        <p className="font-bold my-2 text-lg">
                          {unit.unitName}
                        </p>
                        <p>Complete all lessons above to unlock this!</p>
                        <p className="rounded-xl bg-gray-300 px-2 text-center my-4 py-2">
                          Locked
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                )}

                {i === unit.noOfLessons - 1 && (
                  <div className="mt-8">
                    <div className="relative">
                      <div className={`w-20 h-20`}>
                        <Popover>
                          <PopoverTrigger>
                            <img
                              src={
                                isChestOpen || lesson?.chestOpened
                                  ? "/assets/open-chest.png"
                                  : "/assets/closed-chest.png"
                              }
                              alt={
                                canUnlockChest
                                  ? "Open Treasure Chest"
                                  : "Locked Treasure Chest"
                              }
                              className={`w-full h-full ${!canUnlockChest
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                                }`}
                              onClick={() => {
                                if (lesson.chestOpened || isChestOpen) {
                                  toast.warning("Reward already claimed!");
                                  return;
                                }
                                if (canUnlockChest) {
                                  return setIsModalOpen(true);
                                }
                                toast.info("You cannot open the chest yet!");
                              }}
                            />
                          </PopoverTrigger>
                        </Popover>
                      </div>
                    </div>
                    {isModalOpen && (
                      <RewardUI
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        unitName={unit.unitName}
                        currentLesson={lesson.currentLesson}
                        courseName={courseName as string}
                        difficulty={userCurrentCourses?.level}
                        setIsChestOpen={setIsChestOpen}
                      />
                    )}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

const CurvedPath: React.FC<CurvedPathProps> = ({ units }) => {
  const [activeUnit, setActiveUnit] = useState<Unit>(units[0]);
  const router = useRouter();
  const { courseName, sectionName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const setIsQuizVisible = useSetRecoilState(isQuizVisibleState);
  const [showModal, setShowModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = useCallback(() => {
    const header = document.querySelector(".header");
    if (!header) return;

    const headerRect = header.getBoundingClientRect();

    for (const unit of units) {
      const unitElement = document.querySelector(
        `[data-unit-id="${unit.unitId}"]`
      );
      ``;
      if (!unitElement) continue;

      const unitRect = unitElement.getBoundingClientRect();
      if (headerRect.top >= unitRect.top && headerRect.top <= unitRect.bottom) {
        setActiveUnit(unit);
        break;
      }
    }
  }, [units]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleBackClick = useCallback(() => {
    router.push(`/s/course/${courseTitle}_${courseId}/sections`);
  }, [router, courseTitle, courseId]);

  return (
    <>
      <div className="relative flex mx-auto justify-around gap-4 w-full">
        <div className="w-full pb-44">
          <div
            className="header max-w-lg mx-auto flex p-2 pb-3 text-white sticky top-[4rem] z-20 transition-colors duration-300 text-sm items-center rounded-lg"
            style={{
              backgroundColor: activeUnit?.color?.trim()
                ? activeUnit.color
                : "rgba(88,204,2,1)",
            }}
          >
            <div className="flex flex-col">
              <button
                className="flex gap-1 items-center text-gray-100 uppercase cursor-pointer py-2"
                onClick={handleBackClick}
              >
                <ArrowLeftIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
                <span className="text-left">
                  Section {sectionName}, Unit{" "}
                  {activeUnit ? activeUnit.unitIndex : "Select a unit"}
                </span>
              </button>
              <div className="pl-1.5 capitalize font-bold text-lg">
                {activeUnit?.unitName || "unit name"}
              </div>
            </div>

            <button
              className="flex gap-2 ml-auto p-2 rounded-lg border items-center"
              style={{
                boxShadow: "0 2px 0 rgba(0,0,0,0.2)",
                borderColor: "rgba(0,0,0,0.2)",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              <GuideBookSvg className="w-8 h-8 text-white" />
              <span className="hidden md:block">GuideBook</span>
            </button>
          </div>

          <div className="space-y-6 py-6">
            {units.map((unit, index) => (
              <UnitComponent
                key={unit.unitId}
                unit={unit}
                index={index}
                activeUnit={activeUnit}
                courseName={courseTitle}
                sectionName={sectionName}
                setIsQuizVisible={setIsQuizVisible}
                setShowModal={setShowModal}
              />
            ))}
          </div>
        </div>
        <RightSidebar />
        <Modal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          className="max-w-2xl"
          closeIconColor="text-gray-200 bg-gray-800 hover:text-white font-semibold"
          content={<UnitDetail activeUnit={activeUnit} />}
        />
      </div>
      <LeetLingoModal
        isLivesModal={showModal}
        open={showModal}
        setOpen={setShowModal}
      >
        <RanOutOfHearts isQuizComponent={false} setShowModal={setShowModal} />
      </LeetLingoModal>
    </>
  );
};

export default React.memo(CurvedPath);
