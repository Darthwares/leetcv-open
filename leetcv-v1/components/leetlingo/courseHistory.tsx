import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { useRecoilState } from "recoil";
import { userCourseState, userIdState } from "@state/state";
import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { CourseSectionCard } from "./courseSectionCard";
import NoActiveCourseFound from "./noActiveCourseFount";
import CourseCardSkeleton from "./courseCardSkeleton";

export default function CourseHistory({
  allCourses,
}: {
  readonly allCourses: readonly any[];
}) {
  const router = useRouter();
  const [userId] = useRecoilState(userIdState);
  const [userEnrolledCourses, setUserEnrolledCourses] = useState<any[]>([]);
  const [userCompletedCourses, setUserCompletedCourses] = useState<any[]>([]);
  const [userCourses, setUserCourses] = useRecoilState(userCourseState);
  const { status } = useSession();

  const { data: userCurrentCourses, isLoading: isUserCoursesLoading } =
    trpc.useQuery(["fs.leetCourseRouter.getUserCurrentCourses", { userId }], {
      enabled: status === "authenticated",
    });

  const processCourses = useCallback(
    (globalCourses: readonly any[], userCourses: any[] = []) => {
      const userCoursesMap = userCourses.reduce<Record<string, any>>(
        (map, userCourse) => {
          map[userCourse.courseName] = userCourse;
          return map;
        },
        {}
      );

      const completedCourses = globalCourses.filter(
        (course) => userCoursesMap[course.courseName]?.isCompleted
      );

      const incompleteCourses = globalCourses.filter((course) => {
        if (!userCoursesMap[course.courseName] || userCoursesMap[course.courseName].isCompleted) {
          return false;
        }

        const userCourse = userCoursesMap[course.courseName];
        let progress = 0;

        if (userCourse.difficulty?.level === 'advancedList') {
          progress = 1;
        } else if (userCourse.difficulty?.level === 'expertList') {
          progress = 2;
        }

        course.progress = progress;
        return true;
      });

      return {
        completedCourses,
        enrolledCourses: incompleteCourses,
      };
    },
    []
  );

  useEffect(() => {
    if (userCurrentCourses?.length > 0) {
      setUserCourses(userCurrentCourses);
    }
    if (!isUserCoursesLoading && userCurrentCourses?.length) {
      const { enrolledCourses, completedCourses } =
        processCourses(allCourses, userCurrentCourses);
      setUserEnrolledCourses(enrolledCourses);
      setUserCompletedCourses(completedCourses);
    }
  }, [
    allCourses,
    userCourses,
    userCurrentCourses,
    setUserCourses,
    processCourses,
    isUserCoursesLoading,
  ]);

  const handleCourseClick = useCallback(
    (courseId: string, courseName: string) => {
      router.push(`/s/course/${courseName}_${courseId}/sections`);
    },
    [router]
  );

  if (isUserCoursesLoading) {
    return (
      <div className="grid grid-cols-1 mt-10 h-full lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <CourseCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-6 max-w-6xl sm:mt-10 mt-5 mx-auto space-y-10">
      {!userEnrolledCourses?.length && !userCompletedCourses?.length && (
        <NoActiveCourseFound />
      )}
      {userEnrolledCourses?.length > 0 ? (
        <CourseSectionCard
          title="Continue Learning"
          courses={userEnrolledCourses}
          onCourseClick={handleCourseClick}
          type="enrolled"
        />
      ) : null}
      {userCompletedCourses?.length > 0 ? (
        <CourseSectionCard
          title="Completed Courses"
          courses={userCompletedCourses}
          onCourseClick={handleCourseClick}
          type="completed"
        />
      ) : null}
    </div>
  );
}
