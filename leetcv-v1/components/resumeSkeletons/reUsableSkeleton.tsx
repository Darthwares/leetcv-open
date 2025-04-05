import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";

type ReUsableSkeletonProps = {
  isExperience?: boolean;
};

const ResumeInfo = ({ isExperience }: ReUsableSkeletonProps) => {
  return (
    <div className="pl-5 pb-5">
      <ol className="relative pl-1 border-l border-gray-300 items-stretch flex flex-col">
        <span className="rounded-icon brand-grad-bg"></span>
        <li className="print:mb-0 ml-5 space-y-2">
          <h5 className="w-full flex items-start justify-between relative top-1">
            <div className="mb-1 text-gray-800 hover:text-gray-700 flex flex-col items-start capitalize space-y-1">
              <Skeleton className="h-4 w-36" />{" "}
              <Skeleton className="h-4 w-48" />{" "}
              <Skeleton className="h-4 w-32" />{" "}
            </div>
          </h5>
          {isExperience && (
            <div className="text-sm leading-none font-semibold text-gray-500">
              <Skeleton className="h-4 w-20" />{" "}
            </div>
          )}
          <div className="pt-0.5"></div>
          <div className="showWorkImpact mt-2">
            <div className="w-full p-2.5 sm:p-3.5">
              <Skeleton className="h-3.5 w-full" />{" "}
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 hidden lg:block w-full mt-1" />
              {isExperience && (
                <>
                  <Skeleton className="h-3.5 w-full mt-1" />
                  <Skeleton className="h-3.5 w-full mt-1" />
                </>
              )}
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

const ReUsableSkeleton = ({ isExperience }: ReUsableSkeletonProps) => {
  return (
    <>
      <Skeleton className={`w-full h-8 ${isExperience && "mt-5"} mb-3`} />
      <ResumeInfo isExperience={isExperience} />
      {isExperience && <ResumeInfo isExperience={isExperience} />}
    </>
  );
};

export default ReUsableSkeleton;
