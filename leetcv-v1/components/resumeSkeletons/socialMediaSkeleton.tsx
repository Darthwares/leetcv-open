import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

const SocialMediaSkeleton = () => {
  return (
    <>
      <Skeleton className={`w-full h-8 mb-3`} />
      <>
        {Array(3)
          .fill(0)
          ?.map(() => {
            return (
              <div key={uuidv4()} className="flex w-full">
                <div className="text-left w-full">
                  <div className="flex items-center gap-2 pb-2 pl-4">
                    <Skeleton className="w-[25px] h-[25px] rounded-full " />
                    <Skeleton className="h-4 w-36" />
                    <Skeleton className="w-4 h-4 rounded-md ml-1" />
                  </div>
                </div>
              </div>
            );
          })}
      </>
    </>
  );
};

export default SocialMediaSkeleton;
