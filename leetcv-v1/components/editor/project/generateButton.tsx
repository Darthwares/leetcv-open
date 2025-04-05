import { tokenCountState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

const GenerateButton = (props: any) => {
  const [tokens] = useRecoilState(tokenCountState);

  const handleClick = async () => {
    if (props.description) {
      props.setWork?.("");
      props.setImpact?.("");
      props.setExpDesc?.("");
      await props.handleRefine?.();
    }
  };

  const buttonClassName = props.description
    ? `bg-indigo-600 hover:bg-indigo-700`
    : "cursor-not-allowed bg-indigo-400";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg right-2 bottom-2 w-32 ${
        tokens < 200 ? "cursor-not-allowed bg-indigo-400" : buttonClassName
      }`}
      onClick={handleClick}
      disabled={tokens < 200}
    >
      {props.generate}
    </button>
  );
};

export default GenerateButton;
