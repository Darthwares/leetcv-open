import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";

type ReUsableSkeletonTwoProps = {
  isEduction?: boolean;
};

const ResumeDetails = ({ isEduction }: ReUsableSkeletonTwoProps) => {
  return (
    <div className="pl-5 pb-5">
      <ol className="relative pl-1 border-l border-gray-300 items-stretch flex flex-col">
        <span className="rounded-icon brand-grad-bg"></span>
        <li className="print:mb-0 ml-5 space-y-2">
          <div className="mb-1 text-gray-800 hover:text-gray-700 flex flex-col items-start capitalize space-y-1">
            <Skeleton className="h-4 w-[90%]" />{" "}
            <Skeleton className="h-4 w-44" /> <Skeleton className="h-4 w-32" />{" "}
            {isEduction && <Skeleton className="h-4 w-24" />}{" "}
            <Skeleton className="h-4 w-28" />{" "}
          </div>
        </li>
      </ol>
    </div>
  );
};

const ReUsableSkeletonTwo = ({ isEduction }: ReUsableSkeletonTwoProps) => {
  return (
    <>
      <Skeleton className={`w-full h-8 ${isEduction && "md:mt-5"} mb-3`} />
      <ResumeDetails isEduction={isEduction} />
      {isEduction && <ResumeDetails isEduction={isEduction} />}
    </>
  );
};

export default ReUsableSkeletonTwo;
