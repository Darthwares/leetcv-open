import React from "react";
import { v4 as uuidv4 } from "uuid";
import { UserProfileSvg } from "./svg";

const FeedbackSkeleton = () => {
  return (
    <>
      {Array(12)
        .fill(0)
        .map(() => {
          return (
            <figure
              key={uuidv4()}
              className="rounded-3xl animate-pulse bg-white dark:bg-gray-900 p-6 shadow-md"
            >
              <blockquote className="text-gray-900">
                <div className="space-y-2 mb-2">
                  <p className="h-3.5 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
                  <p className="h-3.5 rounded-full bg-gray-200 w-56 dark:bg-gray-600"></p>
                </div>
                <p className="mt-4 h-2 rounded-full bg-gray-200 w-24 dark:bg-gray-600"></p>
                <p className="mt-4 h-2 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
                <p className="mt-1.5 h-2 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
                <p className="mt-1.5 h-2 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
                <p className="mt-1.5 h-2 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
                <p className="mt-1.5 h-2 rounded-full bg-gray-200 w-full dark:bg-gray-600"></p>
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <UserProfileSvg className="w-11 h-11" />
                <figcaption className="w-40 h-2.5 rounded-full bg-gray-200 dark:bg-gray-600"></figcaption>
              </div>
            </figure>
          );
        })}
    </>
  );
};

export default FeedbackSkeleton;
