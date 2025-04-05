import React from "react";
import { Card } from "shadcn/components/ui/cards";

const CourseCardSkeleton = () => {
  return (
    <Card className="w-full max-w-md p-6 h-auto bg-white">
      <div className="animate-pulse">
        {/* Image skeleton */}
        <div className="h-32 bg-gray-200 rounded-lg mb-4" />

        {/* Tags skeleton */}
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded-full" />
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* Title skeleton */}
        <div className="h-7 w-3/4 bg-gray-200 rounded mb-4" />

        {/* Footer skeleton */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 bg-gray-200 rounded-full" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>
          <div className="h-8 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

export default CourseCardSkeleton;
