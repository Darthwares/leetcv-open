import React, { useEffect } from "react";

const NoCourseFound = () => {
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });
  return (
    <div className="max-w-7xl flex flex-col lg:flex-row items-center gap-10 md:gap-20">
      <div className="h-[18rem] bg-gray-50 rounded-lg w-full">
        <lottie-player
          src="/assets/lottie/no-course-found.json"
          background=""
          speed="1"
          loop
          autoplay
          className="bg-gradient-to-r from-indigo-100 to-pink-200"
        ></lottie-player>
      </div>
      <div className="w-full">
        <p className="text-2xl font-semibold md:text-2xl"> No Courses Found </p>
        <p className="mt-4 mb-8 ">
          {" "}
          {`We couldn't find any courses matching your criteria. Try adjusting
            your search terms.`}
        </p>
      </div>
    </div>
  );
};

export default NoCourseFound;
