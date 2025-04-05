import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";

const ResumeSkillsSkeleton = () => {
  return (
    <>
      <div className="resume-section-header">
        <Skeleton className="w-full h-8" />
      </div>
      <div className="flex w-full flex-col">
        <div className="text-left w-full">
          <div className="flex gap-2 items-center pt-1 flex-wrap">
            <Skeleton className="w-20 h-[22px]" />
            <Skeleton className="w-32 h-[22px]" />
            <Skeleton className="w-14 h-[22px] hidden md:block" />
            <Skeleton className="w-28 h-[22px]" />
            <Skeleton className="w-32 h-[22px]" />
            <Skeleton className="w-28 h-[22px]" />
            <Skeleton className="w-20 h-[22px]" />
            <Skeleton className="w-16 h-[22px]" />
            <Skeleton className="w-36 h-[22px]" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ResumeSkillsSkeleton;
