import React from "react";

interface WizardButtonProps {
   label: string;
    handleMove: () => void;
    disable?: boolean;
  }

const WizardButton = ({ label, handleMove, disable = false }: WizardButtonProps) => {
  return (
    <button
      onClick={handleMove}
      disabled={disable}
      type="submit"
      data-testid="wizard-button"
      className={`text-white w-32  ${disable ? 'bg-indigo-300':"bg-indigo-600 hover:bg-indigo-700"}  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
    >
      {label}
    </button>
  );
};

export default WizardButton;
