import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

type ReusablePlaceholderProps = {
  title: string;
  description: string;
  lottie: string;
};

const ReusablePlaceholder = ({
  description,
  title,
  lottie,
}: ReusablePlaceholderProps) => {
  const t = useTranslations("Dashboard");
  return (
    <div
      className="mx-auto max-w-7xl px-2.5 py-4 lg:flex lg:items-center lg:gap-x-10 lg:px-8"
      data-testid="reusable-placeholder-container"
    >
      <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
        <h2
          className="mt-6 md:mt-10 max-w-lg text-3xl lg:text-4xl font-bold tracking-tight dark:text-white text-gray-900"
          data-testid="title"
        >
          {title}
        </h2>
        <p
          className="mt-6 text-lg leading-8 dark:text-gray-200 text-gray-600"
          data-testid="description"
        >
          {description}
        </p>
        <div className="mt-6 flex items-center gap-x-6" data-testid="link-btn">
          <Link href="/pricing">
            <p className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {t("getLeetCvPro")}
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
        <div className="sm:px-6 lg:px-0 hidden lg:flex items-center justify-center w-full mt-7">
          <div className="h-[26rem]" data-testid="lottie-container">
            <lottie-player
              src={`/assets/lottie/${lottie}.json`}
              background=""
              speed="1"
              loop
              autoplay
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReusablePlaceholder;
