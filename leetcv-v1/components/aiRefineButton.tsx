import React from "react";
import { SparklesIcon } from "@heroicons/react/outline";

type AiRefineButtonProps = {
  handleRefine: () => void;
};

const AiRefineButton = ({ handleRefine }: AiRefineButtonProps) => {
  return (
    <button
      onClick={handleRefine}
      className="px-2.5 py-2 mb-1 lg:mb-0.5 relative -left-1 print:hidden rounded ai-refine-button group font-medium text-white inline-block"
    >
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
      <span className="relative flex items-center gap-1.5 text-xs">
        <SparklesIcon className="w-4 h-4 sm:w-5 sm:h-5 sparkle-icon" />
      </span>
      <span className="absolute bottom-0.5 -left-[4.5rem] scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        AI Refine
      </span>
    </button>
  );
};

export default AiRefineButton;
