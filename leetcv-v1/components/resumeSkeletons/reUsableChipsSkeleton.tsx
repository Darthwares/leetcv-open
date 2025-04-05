import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";

type ReUsableChipsSkeletonProps = {
  isHobbies?: boolean;
};

const ReUsableChipsSkeleton = ({ isHobbies }: ReUsableChipsSkeletonProps) => {
  return (
    <>
      <Skeleton className={`w-full h-8  mt-2 mb-3`} />
      <div className="flex items-center flex-wrap w-full gap-2">
        <Skeleton className="h-[22px] w-32 rounded-lg" />
        <Skeleton className="h-[22px] w-36 rounded-lg" />
        <Skeleton className="h-[22px] w-24 rounded-lg" />
        {isHobbies && <Skeleton className="h-[22px] w-40 rounded-lg" />}
      </div>
    </>
  );
};

export default ReUsableChipsSkeleton;
