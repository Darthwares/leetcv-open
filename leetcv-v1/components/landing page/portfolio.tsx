import { handleNavigation } from "@constants/defaults";
import { CheckCircleIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "shadcn/components/ui/button";

const features = [
  "Showcase Your Best Work",
  "Customized to Your Style",
  "Highlight Key Projects",
  "Improve Client Attraction",
  "Optimized for Potential Employers",
  "Professional and Engaging Presentation",
];

const PortfolioSummary = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="flex  flex-col w-full items-center justify-center px-8 py-16 md:py-16 lg:flex-row lg:space-x-8 lg:pb-28 gap-10 max-w-7xl mx-auto">
      <div className="flex max-w-2xl flex-col items-start w-full space-y-6">
        <h2 className="text-2xl sm:text-4xl font-bold leading-tight">
          Portfolio Builder for Professionals
        </h2>
        <p className="text-lg text-muted-foreground">
          Build an impressive portfolio effortlessly using our AI-powered tool.
          Input your details, and our system will craft a tailored showcase of
          your skills, projects, and achievements, highlighting your unique
          professional journey.
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
            onClick={() => handleNavigation("/s/portfolio", status, router)}
          >
            View Your Portfolio <ArrowRightIcon className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
      <div className="h-full md:h-96 lg:h-full max-w-sm lg:max-w-md">
        <lottie-player
          src="/assets/lottie/aiResume.json"
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

export default PortfolioSummary;
