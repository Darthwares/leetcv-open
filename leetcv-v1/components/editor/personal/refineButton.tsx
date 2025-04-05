import { LightBulbIcon } from "@heroicons/react/outline";

type RefineButtonProps = {
  readonly selectText: string;
  readonly generate: string;
  readonly handleRefine: () => void;
  readonly setText: (text: string) => void;
  readonly tokens: number;
};

function RefineButton({
  selectText,
  generate,
  handleRefine,
  setText,
  tokens,
}: RefineButtonProps) {
  return (
    <button
      className={`${
        selectText && tokens >= 200
          ? "bg-indigo-600 hover:bg-indigo-700"
          : "cursor-not-allowed bg-indigo-400"
      } text-white px-3 py-2 rounded-md`}
      disabled={tokens < 200}
      onClick={() => {
        if (selectText && tokens) {
          handleRefine();
          setText("");
        }
      }}
    >
      <span className="flex items-center gap-1">
        <LightBulbIcon className="w-5 animate-pulse" />
        <span>{generate}</span>
      </span>
    </button>
  );
}

export default RefineButton;
