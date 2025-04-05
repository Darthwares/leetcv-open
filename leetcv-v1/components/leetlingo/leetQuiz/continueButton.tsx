import React from "react";

type ContinueButtonProps = {
  handleContinue: () => void;
  buttonText: string;
  bgColor: string;
};

const ContinueButton = ({
  handleContinue,
  buttonText,
  bgColor,
}: ContinueButtonProps) => {
  return (
    <button
      onClick={handleContinue}
      className={`px-6 py-3 rounded-2xl w-full md:w-auto ${bgColor} text-white font-bold transition-colors`}
    >
      {buttonText}
    </button>
  );
};

export default ContinueButton;
