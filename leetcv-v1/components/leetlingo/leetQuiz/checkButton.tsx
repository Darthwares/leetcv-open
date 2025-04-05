import React from "react";

type CheckButtonProps = {
  handleCheck: () => void;
  selectedOption: string;
};

const CheckButton = ({ handleCheck, selectedOption }: CheckButtonProps) => {
  return (
    <button
      onClick={handleCheck}
      disabled={!selectedOption}
      className={`px-6 py-3 w-full md:w-auto rounded-2xl transition-all font-bold
      ${
        selectedOption
          ? "bg-indigo-500 hover:bg-indigo-600 text-white"
          : "bg-gray-100 text-gray-400 cursor-not-allowed"
      }`}
    >
      CHECK
    </button>
  );
};

export default CheckButton;
