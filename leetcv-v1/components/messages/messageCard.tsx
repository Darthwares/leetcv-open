import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import {
  resumeState,
  selectedChatMessageMessages,
  userIdState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { v4 as uuidv4 } from "uuid";
import {
  extractHourAndMinutes,
  groupMessagesByDate,
} from "@constants/defaults";
import ImageFallBack from "@components/imageFallBack";

const MessageCard = () => {
  const [selectedChat] = useRecoilState(selectedChatMessageMessages);
  const [userId] = useRecoilState(userIdState);
  const [resume] = useRecoilState(resumeState);
  const messageRef = useRef<HTMLDivElement | null>(null);

  const { data: getMessageList } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [getMessageList, selectedChat]);

  const groupedMessages = groupMessagesByDate(selectedChat);

  return (
    <div className="h-full overflow-hidden bg-slate-50">
      <div className="h-full py-3 md:py-3 md:px-5 overflow-y-auto">
        <div className="space-y-2 px-1.5 md:px-0">
          {Object.keys(groupedMessages).map((date) => (
            <div key={uuidv4()}>
              <div className="text-center text-gray-400 text-xs my-2">
                {date}
              </div>
              {groupedMessages[date].map((chat: any) => {
                const isCurrentUser = chat.messagingId === userId;
                return (
                  <div key={uuidv4()} className="py-0.5 rounded-lg">
                    <div
                      className={`flex gap-2.5 ${
                        isCurrentUser ? "flex-row-reverse" : "justify-start"
                      }`}
                    >
                      <ImageFallBack
                        imgSrc={chat.currChatImage!}
                        fallBackText={chat.currChatName!}
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
                          <div>{chat.message}</div>
                        </div>
                        <p
                          className={`${
                            isCurrentUser
                              ? "text-right mr-1.5"
                              : "text-left ml-1.5"
                          } text-[10px] mt-1 text-gray-500`}
                        >
                          {extractHourAndMinutes(chat.messagedAt)}
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
    </div>
  );
};

export default MessageCard;
