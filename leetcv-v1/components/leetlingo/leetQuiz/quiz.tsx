import { CheckIcon, XIcon } from "@heroicons/react/solid";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useRouter } from "next/router";
import LeetLingoModal from "./leetLingoModal";
import CloseConfirmation from "./closeConfirmation";
import QuizCompletion from "./quizCompleted";
import ContinueButton from "./continueButton";
import CheckButton from "./checkButton";
import {
  gemsState,
  currentUnitState,
  isQuizVisibleState,
  lessonIndexState,
  livesState,
  practiceQuizState,
  questionsState,
  userIdState,
  unitIndexState,
  userCourseState,
  subscriptionPlanState,
} from "@state/state";
import RanOutOfHearts from "./ranOutOfHearts";
import ReFillForFree from "./reFillForFree";
import { trpc } from "@utils/trpc";
import { PracticeQuestionSet, Question } from "types/courses";
import BreadCrumb from "./breadCrumb";
import QuizHeader from "./quizHeader";
import ReviewPrompt from "./reviewPrompt";
import CurrentQuestion from "./currentQuestion";

interface WrongAnswer extends Question {
  userGivenAnswer: string;
  questionIndex: number;
}

interface QuizProps {
  refetchUnits: () => void;
}

const Quiz: React.FC<QuizProps> = ({ refetchUnits }) => {
  const router = useRouter();
  const { courseName, sectionName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const [unitIndex] = useRecoilState(unitIndexState);
  const [lessonIndex] = useRecoilState(lessonIndexState);
  const [units] = useRecoilState(currentUnitState);
  const [questions] = useRecoilState<Question[]>(questionsState);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [lives, setLives] = useRecoilState(livesState);
  const [showModal, setShowModal] = useState(false);
  const [isHeartBeating, setIsHeartBeating] = useState(false);
  const [showCloseConfirmation, setShowCloseConfirmation] = useState(false);
  const setIsQuizVisible = useSetRecoilState(isQuizVisibleState);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [wrongQuestions, setWrongQuestions] = useState<Question[]>([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [showReviewPrompt, setShowReviewPrompt] = useState(false);
  const [reviewRound, setReviewRound] = useState(0);
  const [isFreeHeartFilled, setIsFreeHeartFilled] = useState(false);
  const [practiceQuestions, setPracticeQuestions] = useState<
    PracticeQuestionSet[]
  >([]);
  const [isPracticeQuiz, setIsPracticeQuiz] = useRecoilState(practiceQuizState);
  const setGems = useSetRecoilState(gemsState);
  const [userId] = useRecoilState(userIdState);
  const [userCourse] = useRecoilState(userCourseState);
  const [plan] = useRecoilState(subscriptionPlanState);

  const setCurrentUnit = trpc.useMutation([
    "fs.leetCourseRouter.setCurrentUnit",
  ]);

  const setLessonCompleted = trpc.useMutation([
    "fs.leetCourseRouter.markLessonCompleted",
  ]);
  const setCourseCompleted = trpc.useMutation([
    "fs.leetCourseRouter.markCourseCompleted",
  ]);
  const setUnitCompleted = trpc.useMutation([
    "fs.leetCourseRouter.markUnitCompleted",
  ]);

  const setLeetCourseLives = trpc.useMutation([
    "fs.leetCourse.updateLeetCourseLive",
  ]);
  const setLeetCourseGems = trpc.useMutation([
    "fs.leetCourse.updateLeetCourseGems",
  ]);
  const setCourseStreak = trpc.useMutation(["fs.leetCourse.updateStreak"]);
  const setPracticeQuestionsMutation = trpc.useMutation([
    "fs.leetCourseRouter.updatePracticeQuestions",
  ]);

  const setCourseDetails = trpc.useMutation([
    "fs.leetCourseRouter.setCourseDetails",
  ]);

  const { data: courseLives } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseLives", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { data: isAlreadyFilled } = trpc.useQuery(
    ["fs.leetCourse.getFreeHeartFilled", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { data: practiceQuestionsData } = trpc.useQuery([
    "fs.leetCourseRouter.getPracticeQuestions",
    {
      courseName: courseTitle,
      difficulty: "practiceList",
    },
  ]);

  useEffect(() => {
    if (practiceQuestionsData) {
      setPracticeQuestions(practiceQuestionsData);
    }
  }, [practiceQuestionsData]);

  useEffect(() => {
    if (isAlreadyFilled) {
      setIsFreeHeartFilled(isAlreadyFilled.isAlreadyFilled);
    }
  }, [isAlreadyFilled]);

  useEffect(() => {
    if (courseLives) {
      setLives(courseLives.live);
    }
  }, [courseLives]);

  const buttonTitle = useMemo(
    () =>
      (!isReviewMode && currentQuestion === questions.length - 1) ||
      (isReviewMode && reviewIndex === reviewQuestions.length - 1)
        ? "FINISH"
        : "CONTINUE",
    [
      isReviewMode,
      currentQuestion,
      questions.length,
      reviewIndex,
      reviewQuestions.length,
    ]
  );

  useEffect(() => {
    if (!isReviewMode) {
      setProgressValue(
        Math.min((correctAnswersCount / questions.length) * 100, 100)
      );
    } else if (showResult) {
      setProgressValue(
        Math.min(
          ((reviewIndex + 1 - wrongQuestions.length) / reviewQuestions.length) *
            100,
          100
        )
      );
    }
  }, [
    correctAnswersCount,
    questions.length,
    wrongQuestions,
    showResult,
    isReviewMode,
    reviewIndex,
    reviewQuestions.length,
  ]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  useEffect(() => {
    setIsHeartBeating(lives === 1);
  }, [lives]);

  const handleClose = useCallback(() => {
    if (currentQuestion > 0) {
      setShowCloseConfirmation(true);
    } else {
      setIsQuizVisible(false);
    }
  }, [currentQuestion, setIsQuizVisible]);

  const handleCloseQuiz = () => {
    setShowCloseConfirmation(false);
    setIsQuizVisible(false);
    setLives((prevLives) => {
      setLeetCourseLives.mutate({ id: userId, live: prevLives });
      return prevLives;
    });
  };

  const handleKeepLearning = useCallback(() => {
    setShowCloseConfirmation(false);
  }, []);

  const handleEndSession = useCallback(async () => {
    try {
      // Skip if lesson already completed
      if (units[unitIndex].lessons[lessonIndex].isCompleted) {
        setShowCloseConfirmation(false);
        setIsQuizVisible(false);
        return;
      }

      // Determine next difficulty level
      let nextDifficulty = null;
      let routerName = null;
      let courseName=null;

      if (units[unitIndex].noOfLessons > lessonIndex + 1) {
        //if lesson is not the last lesson of the unit
        nextDifficulty = {
          level: userCourse.level,
          unit: unitIndex,
          lesson: lessonIndex + 1,
        };
      } else if (units.length > unitIndex + 1) {
        //if unit is not the last unit
        setUnitCompleted.mutateAsync({
          courseName: courseTitle as string,
          difficulty: userCourse.level,
          unitName: units[unitIndex].unitName,
        });
        nextDifficulty = {
          level: userCourse.level,
          unit: unitIndex + 1,
          lesson: 0,
        };
      } else {
        //if unit is the last unit,  update the level to the next level
        if (userCourse.level === "easyList") {
          courseName="advancedList";
          nextDifficulty = {
            level: "advancedList",
            unit: 0,
            lesson: 0,
          };
          routerName = `/s/course/${courseTitle}_${courseId}/sections`;
        } else if (userCourse.level === "advancedList") {
          courseName="expertList";
          nextDifficulty = {
            level: "expertList",
            unit: 0,
            lesson: 0,
          };
          routerName = `/s/course/${courseTitle}_${courseId}/sections`;
        } else {
          //update course as isCompleted
          setCourseCompleted.mutateAsync({
            courseName: courseTitle as string,
            userId: userId as string,
          });
          //if its the expertList unit's last lesson then update lesson to non existing lesson to disappear the isCuurent border
          nextDifficulty = {
            level: "expertList",
            unit: 0,
            lesson: lessonIndex + 1,
          };
          routerName = `/s/course`;
        }
      }

      if(courseName){
        setCourseDetails.mutateAsync({
          courseId: courseId as string,
          difficulty: courseName,
        });
      }

      // Mark current lesson as completed
      await setLessonCompleted.mutateAsync({
        courseName: courseTitle as string,
        difficulty: userCourse.level,
        unitName: units[unitIndex].unitName,
        lessonName: units[unitIndex].lessons[lessonIndex].currentLesson,
      });

      // Update user's current position if next difficulty/unit/lesson exists
      if (nextDifficulty) {
        await setCurrentUnit.mutateAsync({
          courseName: courseTitle as string,
          courseId: courseId as string,
          difficulty: nextDifficulty,
        });
      }

      if (routerName) {
        router.push(routerName);
      }

      refetchUnits();

      // Update UI state
      setShowCloseConfirmation(false);
      setIsQuizVisible(false);
    } catch (error) {
      console.error("Error ending session:", error);
    }
  }, [
    courseTitle,
    courseId,
    userCourse,
    units,
    unitIndex,
    lessonIndex,
    setLessonCompleted,
    setCurrentUnit,
  ]);

  const handleOptionSelect = useCallback((option: string) => {
    setSelectedOption(option);
  }, []);

  const handleCheck = useCallback(() => {
    if (!selectedOption) return;

    const currentQ = isReviewMode
      ? reviewQuestions[reviewIndex]
      : questions[currentQuestion];
    const correct = selectedOption === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      const wrongAnswer: WrongAnswer = {
        ...currentQ,
        userGivenAnswer: selectedOption,
        questionIndex: isReviewMode ? reviewIndex : currentQuestion,
      };
      setWrongAnswers((prev) => [...prev, wrongAnswer]);
      setWrongQuestions((prev) => [...prev, currentQ]);
      setLives((prev) => {
        if (prev === 0) return 0;
        const newLives = prev - 1;
        if (newLives === 0) {
          setShowModal(true);
        }
        setLeetCourseLives.mutate({
          id: userId,
          live: newLives,
        });
        return newLives;
      });
    }
  }, [
    selectedOption,
    isReviewMode,
    reviewQuestions,
    reviewIndex,
    questions,
    currentQuestion,
  ]);

  const handleRestartQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setShowResult(false);
    setIsCorrect(false);
    setShowModal(false);
    setIsHeartBeating(false);
    setIsQuizCompleted(false);
    setWrongAnswers([]);
    setWrongQuestions([]);
    setCorrectAnswersCount(0);
    setIsReviewMode(false);
    setReviewQuestions([]);
    setReviewIndex(0);
    setShowReviewPrompt(false);
    setReviewRound(0);
  }, []);

  const startReviewMode = useCallback(() => {
    setReviewQuestions([...wrongQuestions]);
    setWrongQuestions([]);
    setIsReviewMode(true);
    setReviewIndex(0);
    setSelectedOption(null);
    setShowResult(false);
    setProgressValue(0);
    setShowReviewPrompt(false);
  }, [wrongQuestions]);

  const updateGems = () => {
    setGems((prev) => {
      const newGems = prev + 10;
      setLeetCourseGems.mutate({
        id: userId,
        gems: newGems,
      });
      return newGems;
    });
  };

  const handlePracticeQuiz = () => {
    if (!isPracticeQuiz) return;
    setLives(1);
    setLeetCourseLives.mutate({
      id: userId,
      live: 1,
    });
    setIsPracticeQuiz(false);
  };

  const updatePracticeQuestions = async () => {
    setPracticeQuestionsMutation.mutateAsync({
      courseName: courseTitle,
      currentLesson: practiceQuestions[0].id,
    });
  };

  useEffect(() => {
    if (isQuizCompleted && isPracticeQuiz) {
      updatePracticeQuestions();
    }
  }, [isQuizCompleted, isPracticeQuiz]);

  useEffect(() => {
    if (!isQuizCompleted) return;
    const today = new Date().toISOString().split("T")[0];
    setCourseStreak.mutate({ userId: userId, date: today });
    updateGems();
    handlePracticeQuiz();
  }, [isQuizCompleted]);

  const handleContinue = useCallback(async () => {
    if (!isReviewMode && currentQuestion === questions.length - 1) {
      if (wrongQuestions.length > 0) {
        setShowReviewPrompt(true);
      } else {
        setIsQuizCompleted(true);
      }
    } else if (isReviewMode && reviewIndex === reviewQuestions.length - 1) {
      if (wrongQuestions.length > 0) {
        setReviewQuestions([...wrongQuestions]);
        setWrongQuestions([]);
        setReviewIndex(0);
        setSelectedOption(null);
        setShowResult(false);
        setProgressValue(0);
        setReviewRound((prev) => prev + 1);
      } else {
        setIsQuizCompleted(true);
      }
    } else {
      if (isReviewMode) {
        setReviewIndex((prev) => prev + 1);
      } else {
        setCurrentQuestion((prev) => prev + 1);
      }
      setSelectedOption(null);
      setShowResult(false);
    }
  }, [
    isReviewMode,
    currentQuestion,
    questions.length,
    wrongQuestions,
    reviewIndex,
    reviewQuestions.length,
  ]);

  const currentQuestionData = isReviewMode
    ? reviewQuestions[reviewIndex]
    : questions[currentQuestion];

  return (
    <div className="min-h-screen text-gray-900 p-4 md:pt-10">
      <BreadCrumb
        courseTitle={courseTitle}
        sectionName={sectionName as string}
        unitName={units[unitIndex].unitName}
      />

      <QuizHeader
        currentQuestion={currentQuestion}
        handleClose={handleClose}
        progressValue={progressValue}
        isPracticeQuiz={isPracticeQuiz}
        isHeartBeating={isHeartBeating}
      />

      {showReviewPrompt ? (
        <ReviewPrompt
          wrongQuestions={wrongQuestions?.length}
          startReviewMode={startReviewMode}
        />
      ) : (
        <CurrentQuestion
          currentQuestionData={currentQuestionData}
          questionNumber={isReviewMode ? reviewIndex : currentQuestion}
          showResult={showResult}
          isCorrect={isCorrect}
          buttonTitle={buttonTitle}
          handleCheck={handleCheck}
          handleContinue={handleContinue}
          handleOptionSelect={handleOptionSelect}
          selectedOption={selectedOption}
        />
      )}

      <LeetLingoModal
        open={showCloseConfirmation}
        setOpen={setShowCloseConfirmation}
      >
        <CloseConfirmation
          onKeepLearning={handleKeepLearning}
          onEndSession={handleCloseQuiz}
        />
      </LeetLingoModal>

      <LeetLingoModal
        isLivesModal={true}
        open={showModal}
        setOpen={setShowModal}
      >
        {!isFreeHeartFilled ? (
          <ReFillForFree
            setIsFreeHeartFilled={setIsFreeHeartFilled}
            setShowModal={setShowModal}
          />
        ) : (
          <RanOutOfHearts isQuizComponent={true} setShowModal={setShowModal} />
        )}
      </LeetLingoModal>

      <LeetLingoModal open={isQuizCompleted} setOpen={setIsQuizCompleted}>
        <QuizCompletion
          nextLesson={handleEndSession}
          totalQuestions={questions.length}
          correctAnswers={correctAnswersCount}
          onRestart={handleRestartQuiz}
        />
      </LeetLingoModal>
    </div>
  );
};

export default Quiz;
