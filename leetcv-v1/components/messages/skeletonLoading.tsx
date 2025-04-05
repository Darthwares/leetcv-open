import React from "react";
import { Skeleton } from "shadcn/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

const SkeletonLoading = () => {
  return (
    <>
      {Array(8)
        .fill(0)
        .map(() => (
          <div
            key={uuidv4()}
            className={` flex flex-row items-center  p-4 relative`}
          >
            <Skeleton className="absolute w-16 sm:w-[5.5rem] h-2 text-gray-500 right-0 top-0 mr-4 mt-2" />
            <Skeleton className="flex items-center justify-center h-10 overflow-hidden w-10 rounded-full  flex-shrink-0" />
            <div className="flex flex-col flex-grow gap-2 ml-3">
              <Skeleton className="h-3 w-32 sm:w-96 lg:w-32" />
              <Skeleton className="h-[10px] w-60 sm:w-96 lg:w-64" />
            </div>
          </div>
        ))}
    </>
  );
};

export default SkeletonLoading;
