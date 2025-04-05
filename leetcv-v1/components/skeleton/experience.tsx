import React from 'react'
import { Skeleton } from 'shadcn/components/ui/skeleton';

const Experience = () => {
  return (
    <div className="pl-5 pb-5">
      <ol className="relative pl-1 border-l border-gray-300 items-stretch flex flex-col">
        <span className="rounded-icon brand-grad-bg">
          <Skeleton className="h-6 w-6" />{" "}
        </span>
        <li className="print:mb-0 ml-5 space-y-2">
          <h5 className="w-full flex items-start justify-between relative top-1">
            <div className="mb-1 text-gray-800 hover:text-gray-700 flex flex-col items-start capitalize space-y-1">
              <Skeleton className="h-4 w-36" />{" "}
              <Skeleton className="h-4 w-48" />{" "}
              <Skeleton className="h-4 w-32" />{" "}
            </div>
            <Skeleton className="h-6 w-6" />{" "}
          </h5>
          <div className="text-sm leading-none font-semibold text-gray-500">
            <Skeleton className="h-4 w-20" />{" "}
          </div>
          <div className="pt-3.5 print:pt-2"></div>
          <div className="showWorkImpact">
            <div className="hidden md:block bg-gray-300"></div>
            <div className="w-full py-0 pl-2 sm:px-4 sm:py-2">
              <Skeleton className="h-4 w-full" />{" "}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </li>
      </ol>
    </div>
  );
}

export default Experience;