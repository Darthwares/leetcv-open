import { getWidthAndHeight } from "@constants/defaults";
import { mobileMenuSidebar } from "@state/state";
import React, { ReactNode } from "react";
import { useSetRecoilState } from "recoil";

type Options = {
  name: string;
  icon: ReactNode;
  onClick: () => void;
  count: number;
};

type ReUsableOptionsProps = {
  title: string;
  options: Options[];
};

const ReUsableOptions = ({ title, options }: ReUsableOptionsProps) => {
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);

  return (
    <div
      className="flex flex-col gap-4 mt-4 text-gray-700 dark:bg-slate-800/40 bg-white py-4 rounded-lg shadow"
      data-testid="re-usable-options-container"
    >
      <div
        className="border-l-4 border-indigo-600 dark:border-white pl-3 dark:text-white font-medium"
        data-testid="title"
      >
        {title}
      </div>
      {options.map((option, i) => (
        <button
          key={option.name}
          onClick={() => {
            option.onClick();
            setIsMobileMenuSidebarOpen(false);
          }}
          className="w-full flex items-center justify-between pl-4 pr-3"
          data-testid={`button-${i}`}
        >
          <div className="flex items-center gap-3 ">
            <div className="bg-indigo-50 dark:bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <div
                className="w-5 h-5 text-indigo-500 dark:text-gray-700"
                data-testid={`icon-${i}`}
              >
                {option.icon}
              </div>
            </div>
            <div
              className="text-sm font-medium dark:text-gray-100"
              data-testid={`name-${i}`}
            >
              {option.name}
            </div>
            {option.count !== 0 && (
              <p
                className={`${getWidthAndHeight(
                  option.count
                )} text-xs font-medium rounded-full bg-indigo-50 dark:bg-white flex items-center justify-center text-indigo-500 dark:text-gray-700`}
              >
                {option.count}
              </p>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ReUsableOptions;
