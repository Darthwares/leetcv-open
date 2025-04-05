import { PaperAirplaneIcon } from "@heroicons/react/outline";
import { userNameState } from "@state/state";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";

interface ReusableTextProps {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
}

const ReusableText = ({ content, setContent }: ReusableTextProps) => {
  const t = useTranslations("Messages");
  const [userName] = useRecoilState(userNameState);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (userName && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [userName]);

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const submitButton = document.getElementById("submit-message-form");
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  return (
    <div className="flex flex-row w-full items-center">
      <div className="flex flex-row items-center w-full  rounded-3xl bg-white h-12">
        <textarea
          ref={textareaRef}
          className={`focus:border-indigo-400 rounded-full border-gray-300 w-full focus:outline-none border-2 text-sm h-10 msg-text-area resize-none hidden lg:block`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyUp}
          placeholder={t("typeYourMsg")}
        />
        <textarea
          className={`focus:border-indigo-400 rounded-full border-gray-300 w-full focus:outline-none border-2 text-sm h-10 msg-text-area resize-none lg:hidden`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyUp}
          placeholder={t("typeYourMsg")}
        />
      </div>
      <div className="ml-2">
        <button
          id="submit-message-form"
          className={`${
            content.trim() === ""
              ? "pointer-events-none bg-indigo-300"
              : "bg-indigo-500"
          } flex items-center justify-center h-10 w-10 rounded-full text-white hover:bg-indigo-600 transition-all duration-200`}
        >
          <PaperAirplaneIcon className="w-5 rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default ReusableText;
