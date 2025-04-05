import Container from "@components/container";
import CourseDoesNotExist from "@components/leetlingo/courseDoesNotExist";
import Header from "@components/leetlingo/header";
import LoadingCourse from "@components/leetlingo/loadingCourse";
import SectionCard from "@components/leetlingo/sectionCard";
import {
  errorMessages,
  sectionsData,
} from "@constants/defaults";
import { currentUnitState, userCourseState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Unit } from "types/courses";

const Sections = () => {
  const router = useRouter();
  const { courseName } = router.query;
  const [courseTitle, courseId] = Array.isArray(courseName)
    ? courseName[0].split("_")
    : courseName?.split("_") ?? [];

  const [userId] = useRecoilState(userIdState);
  const { status } = useSession();
  const [userCourses, setUserCourses] = useRecoilState(userCourseState);
  const [currentUnit, setCurrentUnit] = useRecoilState(currentUnitState);
  const [error, setError] = useState(null);

  const { data: userCurrentCourses } = trpc.useQuery(
    [
      "fs.leetCourseRouter.getUserCourseDifficulty",
      {
        userId,
        courseName: courseTitle?.toString() ?? "",
      },
    ],
    { enabled: status === "authenticated" }
  );

  const { data: isCompleted } = trpc.useQuery([
    "fs.leetCourseRouter.getDifficultySectionCompleted",
    {
      userId: userId as string,
      courseName: courseTitle as string,
    },
  ]);

  const { data: units } = trpc.useQuery(
    [
      "fs.leetCourseRouter.getCoursesAllUnits",
      {
        courseName: courseTitle?.toString() ?? "",
        difficulty: userCourses.level,
      },
    ],
    { enabled: status === "authenticated" && !!userCourses?.level }
  );

  const { data: allCompletedUnits } = trpc.useQuery(
    [
      "fs.leetCourseRouter.getAllCompletedUnits",
      {
        courseName: courseTitle?.toString() ?? "",
      },
    ],
    { enabled: status === "authenticated" }
  );

  const { data: getCourseDetails, isLoading: getCourseDetailsLoading } =
    trpc.useQuery(
      [
        "fs.leetCourseRouter.getCourseDetails",
        {
          courseId: courseId,
        },
      ],
      {
        enabled: status === "authenticated" && !!userId && !!courseId,
        onError: (error: any) => {
          setError(error?.message);
        },
        staleTime: Infinity,
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    );

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (userCurrentCourses?.level) {
      setUserCourses(userCurrentCourses);
    }
  }, [userCurrentCourses, setUserCourses, currentUnit]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (units) {
      setCurrentUnit(units as Unit[]);
    }
  }, [units, setCurrentUnit, userCourses, userCourses?.level]);

  const nextSeoData = {
    title: `${courseTitle} | LeetCV`,
    description: `${courseTitle ?? getCourseDetails?.courseName
      } sections for LeetCV`,
    key: `${courseTitle ?? getCourseDetails?.courseName} | LeetCV`,
    url: `https://www.leetcv.com/s/course/${courseTitle}/sections`,
    images: [
      {
        url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
        width: 800,
        height: 600,
        alt: "LeetCV Courses",
      },
    ],
  };

  if (getCourseDetailsLoading) {
    return <LoadingCourse loadingText="Please wait, sections loading..." />;
  }

  const errorInfo =
    (error && errorMessages[error]) ||
    errorMessages["You are not authorized to access this section"];

  if (error) {
    return (
      <CourseDoesNotExist
        courseError={error}
        title={errorInfo.title}
        lottiePath={errorInfo.lottiePath}
      />
    );
  }

  return (
    <>
      <NextSeo
        title={nextSeoData.title}
        description={nextSeoData.description}
        key={nextSeoData.key}
        canonical={nextSeoData.url}
        openGraph={{
          url: nextSeoData.url,
          title: nextSeoData.title,
          description: nextSeoData.description,
          images: nextSeoData.images,
          type: "website",
          site_name: "LeetCV",
        }}
      />
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Courses",
          description: nextSeoData.description,
          url: nextSeoData.url,
        })}
      </script>
      <Container>
        <div className="min-h-screen px-4 lg:px-8 mx-auto max-w-7xl">
          <div className="mt-6">
            <Header
              actionButtonText="Back to Courses"
              path="/s/course"
              fadedTitle="BEST LEARNING COURSES"
              title="Sharpen Your Skills with Professional Online Courses"
            />
            <div className="py-16 space-y-5">
              <h1 className="text-xl md:text-2xl font-semibold capitalize">
                Sections for {getCourseDetails?.courseName || courseTitle}
              </h1>
              <p className="text-gray-700 text-base">
                Complete all sections to master the course. Each section has
                multiple levels: Basic, Advanced, and Expert. Start with Basic
                and unlock higher levels as you progress. Sections are arranged
                by difficulty.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                {sectionsData(allCompletedUnits, isCompleted,userCurrentCourses)?.map(
                  (section, index) => (
                    <SectionCard
                      key={index}
                      title={section.title}
                      progress={section.progress}
                      completed={section.completed}
                      total={section.total}
                      bgColor={section.bgColor}
                      buttonText={section.buttonText}
                      description={section.description}
                      levels={section.levels}
                      icon={section.icon}
                      image={section.image}
                      isStarted={section.isStarted}
                      isExist={section.isExist}
                      isPrevSectionCompleted={section.isPrevSectionCompleted}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Sections;

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
      messages: require(`../../../../../messages/${context.locale}.json`),
    },
  };
}
