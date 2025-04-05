import React from "react";
import { RevertSvg } from "@components/svg";
import { CheckIcon } from "@heroicons/react/outline";

interface ActionButtonsProps {
  id: string;
  keepChanges: (id: string) => void;
  discardChanges: (id: string) => void;
  setCurrentId: React.Dispatch<React.SetStateAction<string | null>>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  keepChanges,
  discardChanges,
  setCurrentId,
}) => {
  return (
    <div className="flex justify-end w-full pt-2 md:pt-3 lg:pt-0.5 print:hidden ">
      <div className="flex items-center gap-2">
        <button
          className="bg-indigo-600 text-white p-2 text-sm group font-medium flex items-center justify-center rounded-md gap-1"
          onClick={() => {
            keepChanges(id);
            setCurrentId(null);
          }}
        >
          <CheckIcon className="w-[18px] h-[18px]" />
          <span className="absolute bottom-[2.5rem] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            Keep
          </span>
        </button>
        <button
          className=" justify-center text-sm flex items-center group gap-1.5 font-medium text-gray-700 bg-gray-200 p-[9px] rounded-md"
          onClick={() => discardChanges(id)}
        >
          <RevertSvg />
          <span className="absolute bottom-[2.5rem] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            Revert
          </span>
        </button>
      </div>
    </div>
  );
};

export default ActionButtons;
