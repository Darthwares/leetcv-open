import React from "react";
import { Skeleton } from "../../../shadcn/components/ui/skeleton";
import ResumeHeaderDetailsSkeleton from "./resumeHeaderDetailsSkeleton";

const MobileResumeHeaderSkeleton = () => {
  return (
    <div className="space-y-1 block md:hidden print:hidden relative">
      <div className="mt-3">
        <div className="flex justify-center relative md:hidden print:hidden">
          <img
            className="h-36 w-full object-cover"
            src="/assets/background-cover.png"
            alt="LeetCV Asset"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mx-auto w-full px-4 sm:px-6">
          <div className="print:mt-16 -mt-16 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex relative">
              <Skeleton className="w-32 h-32 md:h-28 md:w-24 rounded-md ring-2 ring-white sm:h-32 sm:w-32" />
              <div className="w-full absolute bottom-4 left-[8.5rem] flex justify-start print:hidden max-w-fit">
                <div className="pb-2">
                  <Skeleton className="w-32 h-8 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ResumeHeaderDetailsSkeleton />
      {location.pathname !== "/" &&
        location.pathname !== "/s/aiResume" &&
        location.pathname !== "/s/convert" && (
          <div className="w-full absolute top-[9.3rem] right-2 flex justify-end items-end print:hidden max-w-fit">
            <Skeleton className="w-8 h-8 rounded-full" />
          </div>
        )}
    </div>
  );
};

export default MobileResumeHeaderSkeleton;
