import React, { useEffect } from "react";
import { Book } from "lucide-react";
import { Button } from "shadcn/components/ui/button";
import { useRouter } from "next/router";

const NoActiveCourseFound = () => {
  const router = useRouter();
  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  const handleExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/s/course");
  };

  return (
    <div className="w-full mx-auto min-h-[500px] max-w-7xl">
      <div className="rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-center">
        <div className="aspect-video max-h-[300px] mb-8">
          <lottie-player
            src="/assets/lottie/search-faq-book.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Sorry, No Active Courses Found
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto">
            There are no active courses available at the moment. Please check
            back later.
          </p>
          <Button
            onClick={handleExplore}
            className="mt-6 inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Book className="h-5 w-5" />
            Explore Courses
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoActiveCourseFound;
