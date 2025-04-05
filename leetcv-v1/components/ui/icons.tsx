import React from "react";

export const NoResume = () => {
  return (
    <svg
      className="mx-auto h-12 w-12 "
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
      />
    </svg>
  );
};

export const DottedLines = () => {
  return (
    <svg
      className="absolute left-1/2 -z-10 -translate-x-1/2 translate-y-16 transform lg:block hidden"
      width={784}
      height={404}
      fill="none"
      viewBox="0 0 784 404"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
          x={0}
          y={0}
          width={20}
          height={20}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={0}
            y={0}
            width={4}
            height={4}
            className="text-gray-200"
            fill="currentColor"
          />
        </pattern>
      </defs>
      <rect
        width={784}
        height={404}
        fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
      />
    </svg>
  );
};

type DetermineStatusProps = {
  activeIndex: number;
  i: number;
};

export const DetermineStatus = ({ activeIndex, i }: DetermineStatusProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${
        activeIndex === i && activeIndex !== i + 1 ? "text-green-600" : ""
      } w-10 mt-1 font-bold bg-white text-green-600 rounded-full`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
