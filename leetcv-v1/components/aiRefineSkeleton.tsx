import React from "react";
import { Skeleton } from "../shadcn/components/ui/skeleton";

const AiRefineSkeleton = () => {
  return (
    <div className="space-y-2 w-full p-3 bg-gray-50">
      <Skeleton className="w-full h-4 bg-gray-200" />
      <Skeleton className="w-full h-4 bg-gray-200" />
      <Skeleton className="w-full h-4 bg-gray-200" />
      <Skeleton className="w-full h-4 bg-gray-200" />
      <Skeleton className="w-full h-4 bg-gray-200" />
      <Skeleton className="w-full lg:hidden h-4 bg-gray-200" />
      <Skeleton className="w-full md:hidden h-4 bg-gray-200" />
      <Skeleton className="w-full md:hidden h-4 bg-gray-200" />
    </div>
  );
};

export default AiRefineSkeleton;
