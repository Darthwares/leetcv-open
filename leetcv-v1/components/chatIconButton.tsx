import { ChatAlt2Icon } from "@heroicons/react/outline";
import { resumeMessageState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

const ChatIconButton = () => {
  const [resumeMessage, setResumeMessage] = useRecoilState(resumeMessageState);

  return (
    <div className="fixed bottom-4 md:bottom-6 z-30 right-4 md:right-6 lg:right-8">
      <button
        onClick={() => setResumeMessage(!resumeMessage)}
        className="w-10 h-10 sm:w-12 sm:h-12 relative group print:hidden rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 "
      >
        <span className="absolute bottom-2 -left-12 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          Chat
        </span>
        <ChatAlt2Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>
    </div>
  );
};

export default ChatIconButton;
