import React from "react";
import ResumeHeaderDetailsSkeleton from "./resumeHeaderDetailsSkeleton";
import { Skeleton } from "../../../shadcn/components/ui/skeleton";

const DesktopResumeHeaderSkeleton = () => {
  return (
    <div className="hidden md:block">
      <div className="flex justify-center relative lg:hidden md:mb-3 print:hidden">
        <img
          src="/assets/background-cover.png"
          className="h-36 w-full object-cover"
          alt="background-cover"
        />
        <Skeleton className="object-cover h-32 w-32 rounded-full absolute top-2" />
      </div>
      <div className="hidden print:flex print:items-start print:justify-between">
        <div className="hidden print:flex gap-6">
          <Skeleton className="rounded-lg object-cover w-32 h-32" />
          <div className="print:relative print:-top-[1.25rem]">
            <ResumeHeaderDetailsSkeleton />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="md:flex justify-center pb-4 hidden">
            <Skeleton className="rounded-lg relative left-3 object-cover w-40 h-40" />
          </div>
        </div>
      </div>
      <div className="relative lg:top-0 print:-top-3">
        <div className="flex justify-between">
          <div className="flex justify-between md:w-full gap-4 md:gap-10 lg:gap-8 md:flex-row flex-col-reverse ">
            <div className="hidden justify-center lg:flex md:mb-3">
              <Skeleton className="rounded-lg relative left-3 object-cover w-40 h-40" />
            </div>
            <div className="w-full print:hidden flex md:block items-center -mt-[3px] print:-mt-2 justify-center flex-col">
              <ResumeHeaderDetailsSkeleton />
            </div>
          </div>
        </div>
        <div className={`print:mt-5 my-1.5`}>
          <div className="flex-col gap-1 hidden lg:flex px-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-48 lg:w-96 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopResumeHeaderSkeleton;
