import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { FlameIcon } from "@components/svg";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { handleNavigation } from "@constants/defaults";
import { Button } from "shadcn/components/ui/button";

const advantages = [
  "Categorizes your details",
  "Highlights your expertise",
  "Ensures effective presentation",
  "Optimizes for ATS systems",
  "Tailors content to job requirements",
  "Suggests impactful keywords",
];

const ConvertResume = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-8 pt-8 pb-16 max-w-7xl mx-auto gap-14">
      <div className="h-full md:h-96 lg:h-full max-w-sm lg:max-w-md">
        <lottie-player
          src="/assets/lottie/convert.json"
          background="white"
          speed="1"
          loop
          autoplay
          data-testid="lottie"
        />
      </div>
      <div className="flex flex-col max-w-2xl items-start justify-center space-y-4 w-full lg:order-2 order-1">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-bold text-blue-600">TRENDING</span>
          <FlameIcon className="text-red-500" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
          Convert Your Resume
        </h2>
        <p className="text-lg text-gray-700">
          Transform your LinkedIn PDF resume with our AI-powered tool. Simply
          upload, and watch as our system analyzes, reorganizes, and enhances
          your resume, creating a polished resume that captivates potential
          employers.
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {advantages.map((feature, index) => (
            <div
              key={index}
              className="flex items-start font-medium text-gray-800 space-x-2"
            >
              <CheckCircleIcon className="text-green-500 w-6 h-6" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
        <motion.div>
          <Button
            className="px-5 py-3 mt-2 flex items-center gap-2.5 bg-indigo-600 rounded-full text-white"
            onClick={() => handleNavigation("/s/convert", status, router)}
          >
            Get Started <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ConvertResume;
