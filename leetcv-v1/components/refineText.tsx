import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import MarkdownWithTextColor from "./markdownWithTextColor";
import RefineButton from "./editor/personal/refineButton";
import BecomePro from "./becomePro";
import { useRecoilState } from "recoil";
import { noTokenErrorState } from "@state/state";
interface RefineTextProps {
  generate: string;
  tokens: number;
  text: string;
  setText: (text: string) => void;
  selectText: string;
  handleRefine: () => void;
  handleAcceptSave: () => void;
  t: (key: string) => string;
}

const RefineText = ({
  generate,
  tokens,
  text,
  setText,
  selectText,
  handleRefine,
  handleAcceptSave,
  t,
}: RefineTextProps) => {
  const [noTokenError] = useRecoilState(noTokenErrorState);

  return (
    <div className="pt-3 max-w-lg">
      {generate === "Refine" && text === "" && (
        <div className="max-w-lg flex items-center justify-center ">
          <div className="w-60">
            <lottie-player
              src="/assets/lottie/ai.json"
              background="white"
              speed="1"
              loop
              autoplay
            ></lottie-player>
            <p className="animate-pulse">{t("pleaseWaitGenerate")}</p>
          </div>
        </div>
      )}
      {generate === "Refine" && text && (
        <div className="max-w-lg border border-gray-300 rounded-md py-4 px-6">
          <p className="font-semibold text-lg">{t("preview")}</p>
          <MarkdownWithTextColor content={text} />
        </div>
      )}
      <div className="flex gap-2 mt-2 md:mt-1 max-w-lg justify-end py-2 md:gap-3">
        {generate === "Generate" && (
          <RefineButton
            setText={setText}
            selectText={selectText}
            generate={"Generate"}
            handleRefine={handleRefine}
            tokens={tokens}
          />
        )}
        {generate === "Refine" && text !== "" && (
          <RefineButton
            setText={setText}
            selectText={selectText}
            generate={"Refine"}
            handleRefine={handleRefine}
            tokens={tokens}
          />
        )}
        {generate === "Refine" && text && (
          <button
            className="text-white px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-700"
            onClick={handleAcceptSave}
          >
            <span className="flex items-center gap-1">
              <CheckCircleIcon className="w-5 animate-pulse" />
              <span>{t("accept")}</span>
            </span>
          </button>
        )}
      </div>
      {noTokenError && (
        <div className="py-2 mb-2">
          <BecomePro width="w-full" />
        </div>
      )}
    </div>
  );
};

export default RefineText;
