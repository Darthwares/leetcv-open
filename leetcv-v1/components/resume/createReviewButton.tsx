import React from "react";
interface CreateReviewButtonProps {
  onClick: () => void;
}

const CreateReviewButton = ({ onClick }: CreateReviewButtonProps) => {
  return (
    <div className="pt-1.5">
      <button
        type="button"
        className="px-2 py-1 text-xs font-medium text-center inline-flex gap-1 items-center border border-indigo-500 rounded-md hover:bg-indigo-600 hover:border-none bg-indigo-500 md:bg-none text-white hover:text-white focus:outline-none cursor-pointer transition print:hidden"
        onClick={onClick}
        title="Give review"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-[18px] h-[18px] text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
          />
        </svg>
      </button>
    </div>
  );
};

export default CreateReviewButton;
