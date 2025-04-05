import React from "react";
import RequestResources from "./resource/requestsResources";
import { useTranslations } from "next-intl";
import { v4 as uuidv4 } from "uuid";
import { UserProfileSvg } from "./svg";

const NoBlogs = () => {
  const t = useTranslations("Blog");
  return (
    <>
      {location.pathname === "/" ? (
        <div
          className={`${
            location.pathname === "/" && "mt-5"
          } mx-auto grid max-w-2xl grid-cols-1 gap-y-20 gap-x-8 lg:mx-0 lg:max-w-none lg:grid-cols-3`}
        >
          {Array(3)
            .fill(0)
            .map(() => {
              return (
                <div
                  key={uuidv4()}
                  className="overflow-hidden animate-pulse dark:border-gray-700"
                >
                  <div className="aspect-[16/9] w-full rounded-2xl object-cover sm:aspect-[2/1] lg:aspect-[3/2] mb-4 bg-gray-300 dark:bg-gray-700"></div>
                  <div className="p-4 md:p-6">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24 mb-4"></div>
                      <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-4"></div>
                    </div>
                    <div className="h-3.5 bg-gray-200 rounded-md dark:bg-gray-700 mb-2"></div>
                    <div className="h-3.5 bg-gray-200 rounded-md w-44 dark:bg-gray-700 mb-6"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 mb-2"></div>
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                    <div className="flex items-center mt-8">
                      <UserProfileSvg className="w-11 h-11" />
                      <div>
                        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-28 mb-3"></div>
                        <div className="w-40 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                      </div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <RequestResources
          title={t("noBlogAvailable")}
          message={t("noBlogDescription")}
          path="/assets/lottie/blog-writing.json"
        />
      )}
    </>
  );
};

export default NoBlogs;
