import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UserProfileSvg } from "@components/svg";
import { sideBarOpenState } from "@state/state";
import { useRecoilState } from "recoil";

const StreakSkeleton = () => {
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  return (
    <ul
      className={`mx-auto my-10 grid max-w-7xl grid-cols-1 gap-4 text-center md:grid-cols-2 ${
        isSideBarClosed ? "lg:grid-cols-3" : "lg:grid-cols-2 xl:grid-cols-3"
      } px-2`}
    >
      {Array(9)
        .fill(0)
        .map(() => (
          <div
            key={uuidv4()}
            className="border border-gray-300 shadow rounded-3xl overflow-hidden sm:py-6 sm:px-5 w-full mx-auto"
          >
            <div className="animate-pulse hidden sm:block">
              <div className="animate-pulse hidden sm:flex space-x-4">
                <div className="flex items-center">
                  <UserProfileSvg className="w-24 h-24" />
                  <div>
                    <div className="h-[18px] bg-gray-200 rounded-md dark:bg-gray-700 w-44 lg:w-32  mb-2"></div>
                    <div className="sm:w-48 lg:w-36 xl:w-40 h-3.5 bg-gray-200 rounded-md dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="w-full h-3 mb-2 bg-gray-200 rounded-md dark:bg-gray-700"></div>
                <div className="h-3 bg-gray-200 rounded-md dark:bg-gray-700 w-52"></div>
              </div>
            </div>

            <div className="block sm:hidden">
              <div className="flex items-center justify-center h-44 mb-6 bg-gray-300 dark:bg-gray-700">
                <UserProfileSvg className="w-28 h-28" />
              </div>
              <div className="px-4 pb-3">
                <div className="h-4 bg-gray-200 rounded-md dark:bg-gray-700 w-44 mb-2"></div>
                <div className="h-3.5 bg-gray-200 rounded-md dark:bg-gray-700 w-56 mb-6"></div>
                <div className="h-3 bg-gray-200 rounded-md dark:bg-gray-700 mb-2 w-full"></div>
                <div className="h-3 bg-gray-200 rounded-md dark:bg-gray-700 mb-2 w-[90%]"></div>
              </div>
            </div>
          </div>
        ))}
    </ul>
  );
};

export default StreakSkeleton;
