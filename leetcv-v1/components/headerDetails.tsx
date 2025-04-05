import { PlusIcon, QuestionMarkCircleIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import React from "react";
interface HeaderDetailsProps {
  handleAdd?: () => void;
  setTipButton?: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  heading: string;
  select?: string;
}

const HeaderDetails = ({
  handleAdd,
  setTipButton,
  heading,
  title,
  select,
}: HeaderDetailsProps) => {
  const t = useTranslations("Dashboard");

  return (
    <div className="my-2 flex items-center justify-between w-full pr-6 : print:pr-0">
      <div className="flex items-center">
        {heading !== "Causes" && (
          <button
            type="button"
            className="add-btn bg-indigo-600"
            data-testid="add-button"
            title={title}
            onClick={handleAdd}
          >
            {!select && (
              <PlusIcon
                className="-ml-1 mr-0.5 w-4 text-white"
                aria-hidden="true"
                data-testid="plusIcon"
              />
            )}
            <span className="text-sm font-medium text-white">
              {`${t("add")}`}
            </span>
          </button>
        )}
        <span
          className={`text-lg pl-6 sm:pl-5 cursor-default font-medium ${
            heading === "Causes" && "relative left-16"
          }`}
          data-testid="details"
        >
          {heading}
        </span>
        {setTipButton && (
          <span
            title="Tips"
            onClick={() => {
              setTipButton?.((tipButton) => !tipButton);
            }}
            className="px-5 cursor-pointer"
          >
            <QuestionMarkCircleIcon className="w-5 h-5 text-indigo-500" />
          </span>
        )}
      </div>
    </div>
  );
};

export default HeaderDetails;
