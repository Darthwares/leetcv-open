import router from "next/router";
import React from "react";
import { Button } from "shadcn/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

const CourseDoesNotExist = ({
  courseError,
  title,
  lottiePath,
}: {
  courseError: string | null;
  title: string;
  lottiePath: string;
}) => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <section className="flex items-center h-full p-3 md:p-16">
      <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
        <div className="max-w-7xl text-center flex flex-col lg:flex-row items-center gap-10 md:gap-20">
          <div className="h-[18rem] md:h-[25rem] w-full">
            {lottiePath && (
              <lottie-player
                src={lottiePath ?? "/assets/lottie/no-course-found.json"}
                background=""
                speed="1"
                loop
                autoplay
                className="bg-gradient-to-r from-indigo-100 to-pink-200"
              />
            )}
          </div>
          <div className="w-full flex flex-col items-center ">
            <p className="text-2xl font-semibold md:text-2xl dark:text-white">
              {title}
            </p>
            <p className="mt-4 mb-8 w-80 md:w-96 flex flex-wrap dark:text-gray-200">
              {courseError}
            </p>
            <Button
              onClick={() => {
                router.push("/s/course/");
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Courses
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseDoesNotExist;
