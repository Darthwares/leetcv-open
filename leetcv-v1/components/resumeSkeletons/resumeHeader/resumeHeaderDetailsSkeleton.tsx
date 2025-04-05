import React from "react";
import { Skeleton } from "../../../shadcn/components/ui/skeleton";

const ResumeHeaderDetailsSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="mt-4 md:mt-0 px-4 flex flex-col md:flex-row items-start justify-between lg:mt-1">
        <div className="min-w-0 flex-1 flex flex-col gap-1 pr-2 space-y-0.5">
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-1.5">
              <Skeleton className="w-60 h-[22px] mb-1.5" />
              <div className="flex gap-2 items-start md:pt-0 ">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-72 md:w-96 h-5" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-5 h-5" />
                <Skeleton className="w-64 md:w-80 h-5" />
              </div>
              <div className="flex flex-col md:flex-row md:gap-3 print:hidden">
                <div className="inline-flex items-center gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="w-28 h-5" />
                </div>
              </div>
            </div>
            <div className="hidden md:block lg:hidden">
              <Skeleton className="w-[98px] h-[98px] rounded-sm" />
            </div>
          </div>
          <div className="flex w-full md:space-x-6 space-y-3 lg:flex-row lg:justify-between">
            <div className="flex flex-col gap-2 md:px-0 md:gap-5 lg:flex-row">
              <div className="flex flex-col xl:flex-row xl:gap-5 gap-1.5">
                <div className="items-center hidden xl:flex gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="w-44 xl:w-36 h-5" />
                </div>
                <div className="flex items-center mt-1.5 md:mt-0 gap-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="w-52 md:w-64 xl:w-52 h-5" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="w-5 h-5" />
            <Skeleton className="w-56 h-5" />
          </div>
          <div className="flex flex-col gap-1 lg:hidden">
            <Skeleton className="w-full h-4 mt-2" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-48 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHeaderDetailsSkeleton;
