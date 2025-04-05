import { ChatAlt2Icon } from "@heroicons/react/outline";
import { resumeMessageState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

export interface UserProfile {
  id: string;
  image: string;
  displayName: string;
  position: string;
  handle: string;
}

type ChatIconBtnProps = {
  setUserDetails: () => void;
  bgColor?: string;
};

const CardChatIconBtn = ({ setUserDetails, bgColor }: ChatIconBtnProps) => {
  const [resumeMessage, setResumeMessage] = useRecoilState(resumeMessageState);

  return (
    <button
      className={`px-1.5 py-1 group relative text-white ${
        bgColor || "bg-indigo-400 dark:bg-indigo-600"
      } rounded-md text-sm`}
      onClick={() => {
        setUserDetails();
        setResumeMessage(!resumeMessage);
      }}
      data-testid="chat-icon-btn"
    >
      <span className="absolute bottom-8 -left-1.5 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
        Chat
      </span>
      <ChatAlt2Icon data-testid="chat-icon" className="w-[18px] h-[18px]" />
    </button>
  );
};

export default CardChatIconBtn;
