import { handleNavigation } from "@constants/defaults";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "shadcn/components/ui/button";

const features = [
  "Saves Time and Effort",
  "Customized to Your Profile",
  "Highlights Relevant Skills",
  "Improves Job Matching",
  "Optimizes for Recruiters",
  "Professional and Polished Output",
];

const AIResume = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="flex flex-col w-full items-center justify-center px-8 py-16 lg:flex-row lg:space-x-8 gap-10 max-w-7xl mx-auto lg:mt-10">
      <div className="flex flex-col items-start w-full space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
          AI-Powered Resume Builder for Effortless, Standout Resumes
        </h2>
        <p className="text-lg text-muted-foreground">
          Effortlessly create a standout resume with our AI-powered resume
          builder. Simply enter your name, specialization, industry or field,
          area of interest, and projects, and our AI will analyze and generate a
          professional resume tailored to your needs.
        </p>
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {features.map((feature, index) => (
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
            className="px-5 py-3 flex items-center gap-2.5 bg-indigo-600 rounded-full text-white"
            onClick={() => handleNavigation("/s/aiResume", status, router)}
          >
            Get Started <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="h-full md:h-96 lg:h-full max-w-sm lg:max-w-lg">
        <lottie-player
          src="/assets/lottie/attestproject.json"
          background="white"
          speed="1"
          loop
          autoplay
          data-testid="lottie"
        ></lottie-player>
      </div>
    </div>
  );
};

export default AIResume;
