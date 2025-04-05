import ImageFallBack from "@components/imageFallBack";
import {
  MessageSidebarProps,
  extractHourAndMinutes,
  groupMessagesByDate,
} from "@constants/defaults";
import { resumeState, userIdState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import ReusableText from "./reusableText";
import { ToastContainer } from "react-toastify";
import useSendMessage from "@components/customhooks/useSendMessage";

const SideBarMessageList = ({ userInfo }: MessageSidebarProps) => {
  const messageRef = useRef<HTMLDivElement | null>(null);
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("Messages");
  const { status } = useSession();
  const [content, setContent] = useState("");
  const [localMessages, setLocalMessages] = useState<any[]>([]);
  const sendMessage = useSendMessage();

  const { data: messages, refetch: refetchMessages } = trpc.useQuery(
    [
      "fs.message.getMessages",
      {
        receiverId: resume.id,
        senderId: userInfo.id,
      },
    ],
    {
      enabled: status === "authenticated" && !!resume.id && !!userInfo.id,
      onSuccess: (fetchedMessages: any) => {
        setLocalMessages(fetchedMessages?.messageList || []);
      },
    }
  );

  const updateLocalMessagesForUi = () => {
    const newMessage = {
      messagingId: userId,
      currChatImage: resume.image,
      currChatName: resume.displayName,
      message: content,
      messagedAt: new Date().toISOString(),
    };

    setLocalMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }

    try {
      sendMessage({
        content,
        userInfo,
        t,
        updateLocalMessagesForUi,
        refetchMessages: async () => {
          await refetchMessages();
        }
      });
      setContent("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [localMessages]);

  const groupedMessages = localMessages.length
    ? groupMessagesByDate(localMessages)
    : {};
  return (
    <>
      {localMessages.length === 0 && (
        <div className="h-[18rem] w-full lg:max-w-md mt-36 lg:mt-44 space-y-5">
          <lottie-player
            src="/assets/lottie/Messages.json"
            background=""
            speed="1"
            loop
            autoplay
            className="bg-gradient-to-r from-indigo-100 to-pink-200 "
          />
          <p className="relative -top-6 leading-8 text-gray-600 px-10 md:px-14 text-center ">
            {t("startConversation")}
          </p>
        </div>
      )}
      <div className="relative top-2 flex flex-col overflow-auto">
        <div className="p-3 space-y-3 pb-16 pt-24">
          {Object.keys(groupedMessages).map((date) => (
            <div key={date}>
              <div className="text-center text-gray-400 text-xs my-2">
                {date}
              </div>
              {groupedMessages[date].map((m: any) => {
                const isCurrentUser = m.messagingId === userId;
                return (
                  <div key={m.messagedAt} className="py-0.5 rounded-lg">
                    <div
                      className={`flex gap-2.5 ${
                        isCurrentUser ? "flex-row-reverse" : "justify-start"
                      }`}
                    >
                      <ImageFallBack
                        imgSrc={m.currChatImage!}
                        fallBackText={m.currChatName!}
                        avatarClass="w-10 h-10 rounded-full"
                        avatarImgClass="w-full h-full overflow-hidden"
                        avatarFallbackClass="w-10 h-10 text-white rounded-full text-xl"
                      />
                      <div>
                        <div
                          className={`relative text-sm md:max-w-sm overflow-hidden xl:max-w-[26rem] ${
                            isCurrentUser
                              ? "bg-indigo-600 text-white"
                              : "bg-white"
                          } py-1.5 px-3 shadow rounded-[7.5px]`}
                        >
                          <div>{m.message}</div>
                        </div>
                        <p
                          className={`${
                            isCurrentUser
                              ? "text-right mr-1.5"
                              : "text-left ml-1.5"
                          } text-[10px] mt-1 text-gray-500`}
                        >
                          {extractHourAndMinutes(m.messagedAt)}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
          <div ref={messageRef} />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 fixed bottom-0 p-2 w-full bg-white rounded-xl"
      >
        <ReusableText content={content} setContent={setContent} />
        <ToastContainer />
      </form>
    </>
  );
};

export default SideBarMessageList;
