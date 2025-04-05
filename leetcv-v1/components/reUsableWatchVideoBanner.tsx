import { AnnouncementSvg } from "@components/svg";
import { useTranslations } from "next-intl";
import React from "react";
import { PlayIcon } from "@heroicons/react/solid";

type ReUsableWatchVideoBannerProps = {
  title: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isHandlePage?: boolean;
  isInterviewPage?: boolean;
};

const ReUsableWatchVideoBanner = ({
  title,
  setIsOpen,
  isHandlePage,
  isInterviewPage,
}: ReUsableWatchVideoBannerProps) => {
  const t = useTranslations("Convert");

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div
      className={`${
        isInterviewPage ? "" : "rounded-lg"
      } dark:bg-gray-800/80 bg-indigo-50 shadow p-3 pt-3 my-3`}
      data-testid="watchVideoBanner"
    >
      <div
        className={`${
          isHandlePage && "flex-col sm:flex-row gap-x-5"
        } flex items-center justify-between`}
      >
        <div className="flex flex-1 items-center">
          <div className="flex rounded-lg dark:bg-gray-600/30 bg-indigo-200 p-2">
            <AnnouncementSvg className="w-6 h-6 text-slate-700 dark:text-gray-200" />
          </div>
          <p className="ml-3 w-full truncate font-medium dark:text-gray-200 text-slate-700 text-sm md:text-base">
            {title}
          </p>
        </div>
        <div
          className={`w-full ${
            isHandlePage ? "justify-center" : "justify-end"
          } flex sm:w-auto`}
        >
          <button
            onClick={openModal}
            className="group flex items-center justify-center rounded-md border border-transparent bg-white px-4 sm:px-8 py-2 text-sm font-medium text-indigo-600 shadow-sm dark:hover:bg-gray-200 hover:bg-gray-50 transition-all duration-300"
          >
            <PlayIcon className="h-6 w-6 bg-indigo-600 text-white rounded-full mr-2 p-1" />
            {t("watch")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReUsableWatchVideoBanner;
