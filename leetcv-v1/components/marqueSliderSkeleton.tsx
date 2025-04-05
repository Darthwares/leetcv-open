import React from "react";
import { Skeleton } from "shadcn/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

const MarqueSliderSkeleton = () => {
  return (
    <div className="flex gap-5">
      {Array(8)
        .fill(0)
        .map(() => {
          return (
            <div
              key={uuidv4()}
              className="bg-white dark:bg-gray-800 lg:dark:bg-gray-900 p-5 rounded-lg"
            >
              <div className="flex flex-col gap-y-5 justify-center items-center w-full">
                <Skeleton className="bg-gray-200 dark:bg-gray-600 px-2.5 py-0.5 rounded w-28 h-3.5" />
                <Skeleton className="bg-gray-200 dark:bg-gray-600  px-2.5 py-0.5 rounded w-40 h-3" />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MarqueSliderSkeleton;
