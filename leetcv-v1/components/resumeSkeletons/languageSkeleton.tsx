import React from "react";
import { Skeleton } from "../../shadcn/components/ui/skeleton";
import { v4 as uuidv4 } from "uuid";

const LanguageSkeleton = () => {
  return (
    <>
      <Skeleton className={`w-full h-8 my-3`} />
      <div className="flex w-full flex-col">
        <div className="text-left max-w-sm">
          <div className="flex w-full flex-col">
            <div className="flex flex-col gap-3 w-full pb-4">
              <div className="flex w-full justify-end relative text-sm gap-2">
                <Skeleton className="h-5 w-11 " />
                <Skeleton className="h-5 w-11 " />
                <Skeleton className="h-5 w-11 " />
              </div>
              {Array(3)
                .fill(0)
                ?.map(() => {
                  return (
                    <div
                      key={uuidv4()}
                      className="flex items-center justify-between w-full"
                    >
                      <Skeleton className="lg:w-[7.5rem] w-[10rem] h-4 pl-2" />
                      <div className="flex items-center justify-end gap-8 relative right-4">
                        <Skeleton className="ml-auto h-4 w-4 " />
                        <Skeleton className="ml-auto h-4 w-4 " />
                        <Skeleton className="ml-auto h-4 w-4 " />
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LanguageSkeleton;
