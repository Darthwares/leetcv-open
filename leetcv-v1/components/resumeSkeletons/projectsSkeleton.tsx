import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";

const ProjectDetails = () => {
  return (
    <div className="pl-5 pb-5">
      <ol className="relative pl-1 border-l border-gray-300 items-stretch flex flex-col">
        <span className="rounded-icon brand-grad-bg"></span>
        <li className="print:mb-0 ml-5 space-y-2">
          <h5 className="w-full flex items-start justify-between relative top-1">
            <div className="mb-1 text-gray-800 hover:text-gray-700 flex flex-col items-start capitalize space-y-1">
              <Skeleton className="h-4 w-48" />{" "}
              <Skeleton className="h-4 w-28" />{" "}
              <Skeleton className="h-4 w-36" />{" "}
            </div>
          </h5>
          <div className="flex gap-2 items-center flex-wrap py-2">
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-32 h-6 rounded-lg" />
            <Skeleton className="w-28 h-6 rounded-lg" />
            <Skeleton className="w-32 h-6 rounded-lg" />
            <Skeleton className="w-28 h-6 rounded-lg" />
            <Skeleton className="w-20 h-6 rounded-lg" />
            <Skeleton className="w-36 h-6 rounded-lg" />
          </div>
          <div className="showWorkImpact">
            <div className="w-full p-2.5 sm:p-3.5">
              <Skeleton className="h-3.5 w-full" />{" "}
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 w-full mt-1" />
              <Skeleton className="h-3.5 w-full hidden lg:block mt-1" />
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
};

const ProjectsSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full h-8 mb-3" />
      <ProjectDetails />
      <ProjectDetails />
    </>
  );
};

export default ProjectsSkeleton;
