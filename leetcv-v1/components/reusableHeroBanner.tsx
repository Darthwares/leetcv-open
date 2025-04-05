import React from "react";

type ReusableHeroBannerProps = {
  title: string;
  description: string;
  className: string;
  lottieImage: React.ReactNode;
  tokensLeft?: React.ReactNode;
};

const ReusableHeroBanner = ({
  title,
  description,
  className,
  lottieImage,
  tokensLeft,
}: ReusableHeroBannerProps) => {
  return (
    <div
      className={`${className} bg-gradient-to-r from-indigo-100 to-pink-200 dark:from-gray-800 dark:to-gray-700 rounded-lg flex lg:mt-6 items-center xl:justify-between`}
      data-testid="reusableHeroBanner"
    >
      <div className="md:text-center lg:w-3/4 lg:text-left">
        <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">
          {title}
        </p>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        <div className="mt-4">{tokensLeft}</div>
      </div>
      {lottieImage}
    </div>
  );
};

export default ReusableHeroBanner;
