import React from "react";

const SvgGrid = () => {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 sm:hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          width={343}
          height={388}
          viewBox="0 0 343 388"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
            fill="url(#linear1)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear1"
              x1="254.553"
              y1="107.554"
              x2="961.66"
              y2="814.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 sm:block lg:hidden"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          width={359}
          height={339}
          viewBox="0 0 359 339"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
            fill="url(#linear2)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear2"
              x1="192.553"
              y1="28.553"
              x2="899.66"
              y2="735.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div
        className="pointer-events-none absolute top-0 right-0 bottom-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full"
          width={160}
          height={678}
          viewBox="0 0 160 678"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
            fill="url(#linear3)"
            fillOpacity=".1"
          />
          <defs>
            <linearGradient
              id="linear3"
              x1="192.553"
              y1="325.553"
              x2="899.66"
              y2="1032.66"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff" />
              <stop offset={1} stopColor="#fff" stopOpacity={0} />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
};

const SvgInfo = () => {
  return (
    <div>
      <svg
        aria-hidden="true"
        className="flex-shrink-0 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
};
const WarningSvg = () => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="red"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="white"
        className="w-6 h-6 sm:mt-0.5 mt-0"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
    </div>
  );
};

const SvgClose = () => {
  return (
    <>
      <svg
        aria-hidden="true"
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </>
  );
};
const SvgDotGrid = () => {
  return (
    <div
      className="hidden sm:absolute -z-10 dark:z-0 sm:inset-y-0 sm:block sm:h-full sm:w-full"
      aria-hidden="true"
    >
      <div className="relative mx-auto h-full max-w-7xl">
        <svg
          className="absolute right-full translate-x-1/4 translate-y-1/4 transform lg:translate-x-1/2"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa"
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
                className="text-gray-200 dark:text-gray-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#4522f7d5-8e8c-43ee-89bd-ad34cbfb07fa)"
          />
        </svg>
        <svg
          className="absolute left-full -translate-x-1/4 -translate-y-3/4 transform md:-translate-y-1/2 lg:-translate-x-1/2"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
        >
          <defs>
            <pattern
              id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
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
                className="text-gray-200 dark:text-gray-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
          />
        </svg>
      </div>
    </div>
  );
};

export { SvgClose, SvgGrid, SvgInfo, SvgDotGrid, WarningSvg };
