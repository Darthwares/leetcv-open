import React from "react";
import { useRecoilState } from "recoil";
import { resumeMessageState } from "@state/state";
import ChatSideBar from "./chatSideBar";
import SideBarMessageList from "./sideBarMessageList";
import { MessageSidebarProps } from "@constants/defaults";

const MessageSidebar = ({ userInfo }: MessageSidebarProps) => {
  const [resumeMessage, setResumeMessage] = useRecoilState(resumeMessageState);

  return (
    <ChatSideBar
      open={resumeMessage}
      setOpen={setResumeMessage}
      userName={userInfo.displayName}
      userImage={userInfo.image}
      profession={userInfo.position}
      id={userInfo.id}
    >
      <SideBarMessageList userInfo={userInfo} />
    </ChatSideBar>
  );
};

export default MessageSidebar;
