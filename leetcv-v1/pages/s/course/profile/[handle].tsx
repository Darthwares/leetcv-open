import PromoCards from "@components/leetlingo/promotionalCard";
import { pageTitleState, resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { GetServerSidePropsContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { NextSeo } from "next-seo";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const ProfileCard = () => {
  const router = useRouter();
  const { status } = useSession();
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const setProdTitle = useSetRecoilState(pageTitleState);

  const { data: courseGems } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseGems", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const { data: userCurrentCourses } = trpc.useQuery(
    ["fs.leetCourseRouter.getUserCurrentCourses", { userId }],
    { enabled: status === "authenticated" }
  );

  const { data: userRegisteredAt } = trpc.useQuery(
    ["fs.leetCourse.getUserRegisteredAt"],
    { enabled: status === "authenticated" }
  );

  const { data: streak } = trpc.useQuery(
    ["fs.leetCourse.getStreak", { userId: userId }],
    {
      enabled: !!userId,
    }
  );

  const { data: courseLives } = trpc.useQuery(
    ["fs.leetCourse.getLeetCourseLives", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  useEffect(() => {
    setProdTitle("Profile");
  }, [userCurrentCourses]);

  return (
    <>
      <NextSeo
        title={`${resume.displayName}'s Profile | LeetCV`}
        description={`View ${resume.displayName}'s learning progress and achievements on LeetCV`}
        key={`LeetCV, Profile, Learning Progress, Achievements, ${resume.displayName}, Leet Prep, Leet Courses`}
        canonical={`https://www.leetcv.com/s/course/profile/${resume.handle}`}
        openGraph={{
          url: `https://www.leetcv.com/s/course/profile/${resume.handle}`,
          title: `${resume.displayName}'s Profile | LeetCV`,
          description: `View ${resume.displayName}'s learning progress and achievements on LeetCV`,
          images: [
            {
              url: "https://res.cloudinary.com/daxmjqsy2/image/upload/v1720161898/sharable-link_v3znym.png",
              width: 800,
              height: 600,
              alt: "LeetCV Profile",
            },
          ],
          type: "website",
          site_name: "LeetCV",
        }}
      />


      <div className="p-4 flex justify-center lg:items-start gap-8 lg:gap-24 w-full max-w-7xl mx-auto flex-col lg:flex-row my-4">
        <div className="flex flex-col gap-4 lg:w-[35rem]">
          <div className="">
            <button
              onClick={() => router.push("/s/course/my-course")}
              className="whitespace-nowrap inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back
            </button>
          </div>
          <div className="p-6 rounded-lg shadow-sm w-full lg:max-w-xl border border-gray-100">
            <div className="relative w-full h-32">
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
                {resume.image !== resume.displayName ? (
                  <Image
                    src={resume.image ?? ""}
                    alt={resume.displayName}
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-200"
                  />
                ) : (
                  <>
                    <svg
                      width="120"
                      height="120"
                      viewBox="0 0 120 120"
                      className="fill-sky-500 hover:fill-sky-600 transition-colors duration-200"
                    >
                      <path
                        d="M60 0C26.862 0 0 26.862 0 60s26.862 60 60 60 60-26.862 60-60S93.138 0 60 0zm0 20c22.091 0 40 17.909 40 40S82.091 100 60 100 20 82.091 20 60s17.909-40 40-40z"
                        className="opacity-30"
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                        <span className="text-3xl text-sky-500 hover:text-sky-600 transition-colors duration-200">
                          +
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-4 text-center">
              <h1 className="text-2xl font-bold text-gray-900 hover:text-gray-700 transition-colors duration-200">
                {resume.displayName}
              </h1>
              <p className="text-gray-500 mt-1 hover:text-gray-600 transition-colors duration-200">
                {resume.handle}
              </p>
              <p className="text-gray-500 mt-2 font-semibold hover:text-gray-600 transition-colors duration-200">
                Joined {userRegisteredAt}
              </p>

              <div className="mt-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4 text-left w-full hover:text-gray-700 transition-colors duration-200">
                  Enrolled Courses
                </h2>
                <div className="flex flex-wrap gap-2">
                  {userCurrentCourses && userCurrentCourses.length > 0 ? (
                    userCurrentCourses.map((course: any) => (
                      <button
                        key={course.courseName}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5"
                      >
                        <span className="text-gray-700 text-sm font-medium">
                          {course.courseName}
                        </span>
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic hover:text-gray-600 transition-colors duration-200">
                      No courses enrolled yet
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span
                      className={`${streak?.days.length > 2 ? "" : "grayscale"}`}
                    >
                      🔥
                    </span>
                    <span className="text-2xl font-bold text-gray-900">
                      {streak?.days.length}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Day streak</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">⚡</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {courseGems?.gems}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Total Gems</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">❤️</span>
                    <span className="text-xl font-bold text-gray-900">
                      {courseLives?.live}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Current Lives</p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400">📙</span>
                    <span className="text-2xl font-bold text-gray-900">
                      {userCurrentCourses?.length}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-1">Total Courses</p>
                </div>
              </div>
            </div>
          </div>
        </div>


        <PromoCards />
      </div>

    </>
  );
};

export default ProfileCard;
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
      messages: require(`../../../../messages/${context.locale}.json`),
    },
  };
}
