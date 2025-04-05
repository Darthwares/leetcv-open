import { Skeleton } from "shadcn/components/ui/skeleton";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const ColleagueSkeleton = () => {
  return (
    <div className="flex overflow-x-auto w-full gap-2 mt-8">
      {Array(4)
        .fill(0)
        .map(() => (
          <div key={uuidv4()} className="space-y-6 w-full">
            <div>
              <div className="p-6 shadow-lg rounded-lg mb-4 bg-gray-50 border border-gray-200 w-full ">
                <div className=" flex justify-start items-start space-x-4 ">
                  <Skeleton className="bg-gray-300 w-12 h-12 rounded-full" />
                  <div className="flex flex-col gap-2.5">
                    <Skeleton className="bg-gray-300 w-44 h-4" />
                    <Skeleton className="bg-gray-300 w-32 h-3" />
                    <Skeleton className="bg-gray-300 w-24 h-2.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ColleagueSkeleton;
