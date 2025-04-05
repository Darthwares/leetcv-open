import { ChevronRightIcon } from "@heroicons/react/solid";
import React from "react";

type BreadCrumbProps = {
  courseTitle: string;
  sectionName: string;
  unitName: string;
};

const BreadCrumb = ({
  courseTitle,
  sectionName,
  unitName,
}: BreadCrumbProps) => {
  return (
    <div className="max-w-5xl w-full mx-auto text-sm overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 flex items-center gap-1 font-semibold mb-6">
      <div className="whitespace-nowrap flex items-center">
        <span className="capitalize flex items-center">
          {courseTitle}
          <ChevronRightIcon className="h-4 w-4" />
        </span>
        <span className="capitalize flex items-center">
          {sectionName}
          <ChevronRightIcon className="h-4 w-4" />
        </span>
        <span className="capitalize">{unitName}</span>
      </div>
    </div>
  );
};

export default BreadCrumb;
