import { LoadMoreSvg } from "@components/svg";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import React from "react";

interface LoadMoreProps {
  loading: boolean;
  jobs: number;
  visibleJobs: number;
  handleLoadMore: () => void;
  isFreeUser?: boolean;
}
const LoadMore = ({
  loading,
  jobs,
  isFreeUser,
  visibleJobs,
  handleLoadMore,
}: LoadMoreProps) => {
  if (isFreeUser) {
    return null;
  }

  return (
    <>
      {jobs > visibleJobs && (
        <div className="flex items-center mt-5 justify-center">
          <button
            className="px-4 app-bar-btn flex text-gray-800 items-center py-2 gap-1.5 text-sm border border-gray-400"
            onClick={handleLoadMore}
          >
            <span> See More</span>
            {loading ? (
              <LoadMoreSvg />
            ) : (
              <ChevronDoubleDownIcon className="h-[18px] w-5" />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default LoadMore;
