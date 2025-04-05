import React from "react";
import { Skeleton } from "shadcn/components/ui/skeleton";

const RequestCardSkeleton = () => {
  return (
    <div className="max-w-sm">
      <div className="shadow-lg hover:shadow-xl transition duration-500 rounded-lg">
        <div className="flex justify-center relative print:hidden">
          <div className="h-40 w-full bg-gray-200 object-cover rounded-lg rounded-b-none" />
          <Skeleton className="object-cover h-32 w-32 bg-gray-50 rounded-full absolute top-4" />
          <span className="inline-flex items-center rounded-md  text-sm font-medium absolute right-2 bottom-2 z-10">
            <span className="inline-flex gap-1.5">
              <Skeleton className="w-24 h-6 bg-gray-50" />
            </span>
          </span>
        </div>
        <div className="p-4 rounded-lg bg-white">
          <div className="flex-1 space-y-1.5">
            <Skeleton className="w-44 h-[22px] mb-3.5 bg-gray-200" />
            <p className="relative bottom-2">
              <Skeleton className="w-32 h-4 bg-gray-200" />
            </p>
            <p className="inline-flex gap-x-2">
              <span>
                <Skeleton className="w-5 h-4 bg-gray-200" />
              </span>
              <Skeleton className="w-40 h-4 bg-gray-200" />
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex gap-3">
              <p className="inline-flex gap-x-2">
                <span>
                  <Skeleton className="w-5 h-4 bg-gray-200" />
                </span>
                <Skeleton className="w-40 h-4 bg-gray-200" />
              </p>
            </div>
            <div className="flex max-w-md pt-1.5 flex-wrap gap-1.5 justify-start items-center">
              <Skeleton className="w-24 h-6 bg-gray-200" />
              <Skeleton className="w-14 h-6 bg-gray-200" />
              <Skeleton className="w-24 h-6 bg-gray-200" />
              <Skeleton className="w-20 h-6 bg-gray-200" />
            </div>
          </div>
          <Skeleton className="mt-3 h-3.5 bg-gray-200" />
          <Skeleton className="mt-1 h-3.5 bg-gray-200" />
          <Skeleton className="mt-1 h-3.5 bg-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default RequestCardSkeleton;
