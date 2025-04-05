import { XCircleIcon } from "@heroicons/react/outline";
import React from "react";
interface ChipProps {
  label: string;
  onDelete: () => void;
}

const Chip = ({ label, onDelete }: ChipProps) => (
  <div className="flex items-start px-2 py-1 rounded-md text-sm font-medium leading-5 bg-[#EEF2FF] border border-indigo-400 text-indigo-500 m-[2px]">
    <span className="relative whitespace-normal">{label}</span>
    <button
      onClick={onDelete}
      className="ml-2 transition duration-150 ease-in-out "
    >
      <XCircleIcon className="w-5 " />
    </button>
  </div>
);

export default Chip;
