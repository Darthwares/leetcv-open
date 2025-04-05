import { ShareIcon } from "@heroicons/react/outline";
import { sideBarOpenState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "shadcn/components/ui/button";
import { Skeleton } from "shadcn/components/ui/skeleton";

const LeetUiSkeleton = () => {
  const isDynamicPath = location.pathname.includes("/l/");
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  return (
    <div
      className={`min-h-screen w-full ${
        isSideBarClosed ? "lg:w-[45%]" : "lg:w-[70%] mx-auto"
      } ${isDynamicPath ? "w-full lg:w-full xl:w-full" : ""} xl:w-[40%]`}
    >
      <div className="flex items-center gap-2 mt-8 mx-auto max-w-2xl">
        <div className="h-12 w-full rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-between p-4">
          <Skeleton className="h-4 w-[55%] rounded-full" />
          <Skeleton className="h-4 w-14 rounded-full" />
        </div>
        <Button
          variant="outline"
          className="rounded-full px-3 py-3 border-gray-200 shadow-sm"
        >
          <ShareIcon className="w-5 h-5" />
        </Button>
      </div>
      <div className="flex flex-col items-center px-4 md:px-6 py-6 md:py-8 space-y-4 bg-gradient-to-r from-indigo-200 to-pink-300 shadow-md max-w-2xl mx-auto mt-4 rounded-3xl relative">
        <div className="flex w-full justify-end items-center lg:hidden">
          {!isDynamicPath && <Skeleton className="h-8 w-20 rounded-full" />}
        </div>
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-col items-center p-4 space-y-4 rounded-lg">
            <Skeleton className="h-28 w-28 rounded-lg" />
            <Skeleton className="h-8 w-20 rounded-md" />
          </div>
          <div className="flex flex-col items-center space-y-1.5">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-4 w-40 rounded-full" />
          </div>
          <Skeleton className="h-4 w-[80%] mt-5 rounded" />
          <Skeleton className="h-6 w-52 mt-4 rounded-md" />
        </div>
        <div className="flex flex-col w-full space-y-4">
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
          <Skeleton className="h-11 w-full rounded-md" />
          <div className="flex gap-3 justify-center pt-3">
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
            <Skeleton className="h-11 w-11 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetUiSkeleton;
