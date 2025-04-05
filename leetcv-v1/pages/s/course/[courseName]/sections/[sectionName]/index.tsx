import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import CurvedPath from "@components/leetlingo/curvedUnitPath";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentUnitState,
  isQuizVisibleState,
  userIdState,
} from "@state/state";
import Quiz from "@components/leetlingo/leetQuiz/quiz";
import Layout from "@components/leetlingo/layout/layout";
import Footer from "@components/home/footer";
import MetricsBar from "@components/leetlingo/layout/metricsBar";
import { trpc } from "@utils/trpc";
import { getSession, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { errorMessages, mapLevels } from "@constants/defaults";
import { Unit } from "types/courses";
import CourseDoesNotExist from "@components/leetlingo/courseDoesNotExist";
import LoadingCourse from "@components/leetlingo/loadingCourse";
import { Loader } from "@components/loader";

const SectionUnits = () => {
  const router = useRouter();
  const { status } = useSession();
  const { courseName, sectionName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") || [];
  const [userId] = useRecoilState(userIdState);
  const [isQuizVisible] = useRecoilState(isQuizVisibleState);
  const setCurrentUnit = useSetRecoilState(currentUnitState);
  const [courseError, setCourseError] = useState(null);

  const difficulty = mapLevels(
    Array.isArray(sectionName) ? sectionName[0] : sectionName ?? ""
  );

  const { isLoading: preventUserFromAccessingUnlockedCourseLoading } =
    trpc.useQuery(
      [
        "fs.leetCourseRouter.preventUserFromAccessingUnlockedCourse",
        {
          courseId: courseId ?? "",
          difficulty,
        },
      ],
      {
        enabled: status === "authenticated" && !!userId && !!courseId,
        onError: (error: any) => {
          setCourseError(error?.message);
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );

  const { data: userCurrentCourses, isLoading: isUserCoursesLoading } =
    trpc.useQuery(
      [
        "fs.leetCourseRouter.getUserCourseDifficulty",
        { userId, courseName: courseTitle?.toString() ?? "" },
      ],
      { enabled: status === "authenticated" }
    );

  const {
    data: units,
    refetch,
    isLoading: isUnitLoading,
  } = trpc.useQuery(
    [
      "fs.leetCourseRouter.getCoursesAllUnits",
      {
        courseName: courseTitle?.toString() ?? "",
        difficulty,
      },
    ],
    { enabled: status === "authenticated" }
  );
  console.log(units, "units")
  useEffect(() => {
    if (units) {
      setCurrentUnit(units as Unit[]);
    }
  }, [units]);

  const checkDifficulty = (difficulty: string): boolean => {
    switch (difficulty) {
      case "easyList":
        return sectionName === "basic";
      case "advancedList":
        return sectionName === "advanced" || sectionName === "basic";
      default:
        return true;
    }
  };

  const checkValidCourse = () => {
    if (!userCurrentCourses?.level) {
      router.push("/s/course");
      return;
    } else if (!checkDifficulty(userCurrentCourses.level)) {
      router.push("/s/course");
    }
  };

  useEffect(() => {
    if (!isUserCoursesLoading && units && !isUserCoursesLoading && userCurrentCourses) {
      // checkValidCourse();
    }
  }, [
    isUserCoursesLoading,
    userCurrentCourses,
    courseTitle,
    sectionName,
    router,
  ]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  const seoData = {
    title: `${courseTitle}-${sectionName} | LeetCV`,
    description: `${courseTitle} sections for LeetCV`,
    key: `${courseTitle} | LeetCV`,
    url: `https://www.leetcv.com/s/course/${courseTitle}/sections/${sectionName}`,
    images: [
      {
        url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
        width: 800,
        height: 600,
        alt: "LeetCV Courses",
      },
    ],
  };

  if (preventUserFromAccessingUnlockedCourseLoading) {
    return (
      <LoadingCourse loadingText="Please wait, course details loading..." />
    );
  }

  const errorInfo =
    (courseError && errorMessages[courseError]) ||
    errorMessages["You are not authorized to access this section"];

  if (courseError) {
    return (
      <CourseDoesNotExist
        courseError={courseError}
        title={errorInfo.title}
        lottiePath={errorInfo.lottiePath}
      />
    );
  }

  return (
    <>
      <NextSeo
        title={seoData.title}
        description={seoData.description}
        key={seoData.key}
        canonical={seoData.url}
        openGraph={{
          url: seoData.url,
          title: seoData.title,
          description: seoData.description,
          images: seoData.images,
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Courses",
          description: seoData.description,
          url: seoData.url,
        })}
      </script>
      {isUnitLoading && (
        <div
          className="flex flex-col items-center justify-center pt-28"
          data-testid="loader"
        >
          <Loader />
        </div>
      )}
      {!isUnitLoading &&
        (!isQuizVisible ? (
          <Layout>
            <div className="w-full p-2">
              {units && (
                <>
                  <div className="mt-2 md:mt-0 mb-4 lg:hidden">
                    <MetricsBar />
                  </div>
                  <CurvedPath units={units as Unit[]} />
                </>
              )}
              {!units && (
                <div className="text-center text-gray-500">
                  No units exist for this section
                </div>
              )}
              <div className="pt-2">
                <Footer />
              </div>
            </div>
          </Layout>
        ) : (
          <Quiz refetchUnits={refetch} />
        ))}

    </>
  );
};

export default SectionUnits;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/`,
        permanent: false,
      },
    };
  }
  return {
    props: {
      messages: require(`../../../../../../messages/${context.locale}.json`),
    },
  };
}
