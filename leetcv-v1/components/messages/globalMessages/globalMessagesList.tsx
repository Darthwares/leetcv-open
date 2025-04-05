import { ToastContainer } from "react-toastify";
import { useRecoilState } from "recoil";
import { userIdState } from "@state/state";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";
import {
  SelectedMessageProps,
  extractHourAndMinutes,
} from "@constants/defaults";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import GlobalMessageForm from "./globalMessageForm";
import ImageFallBack from "@components/imageFallBack";

type GlobalMessagesListProps = {
  nonBlockedUsers: SelectedMessageProps[];
};

const GlobalMessagesList = ({ nonBlockedUsers }: GlobalMessagesListProps) => {
  const t = useTranslations("Messages");
  const [userId] = useRecoilState(userIdState);
  const [userSelected, setUserSelected] = useState(false);
  const [currentUserImage, setCurrentUserImage] = useState("");
  const [selectedContact, setSelectedContact] =
    useState<SelectedMessageProps>();
  const userHandle =
    selectedContact?.id === userId
      ? selectedContact.receiverHandle
      : selectedContact?.senderHandle;
  const userName =
    selectedContact?.id === userId
      ? selectedContact.receiverName
      : selectedContact?.senderName;

  const messageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [nonBlockedUsers, selectedContact]);

  return (
    <div className="bg-white w-full max-h-96 relative">
      {!userSelected && (
        <div className="relative">
          <div className="bg-white sticky top-0 left-0 shadow rounded-md max-w-sm mx-auto z-30">
            <div className="flex items-center justify-between border-b bg-indigo-600 px-4 py-2 text-white">
              <h1 className="text-lg font-semibold">{t("messages")}</h1>
            </div>
          </div>
          <div>
            {nonBlockedUsers?.map((conversation) => {
              const currentUserImage =
                conversation.id === userId
                  ? conversation.receiverImage
                  : conversation.senderImage;
              const currentUserName =
                conversation.id === userId
                  ? conversation.receiverName
                  : conversation.senderName;
              return (
                <div
                  key={uuidv4()}
                  className="flex w-full items-center justify-between cursor-pointer hover:bg-indigo-50"
                >
                  <button
                    onClick={() => {
                      setUserSelected(true);
                      setSelectedContact(conversation);
                      setCurrentUserImage(currentUserImage);
                    }}
                    className="flex items-center px-4 py-2"
                  >
                    <ImageFallBack
                      imgSrc={currentUserImage}
                      fallBackText={currentUserName}
                      avatarClass="w-8 h-8 rounded-full"
                      avatarImgClass="w-full h-full overflow-hidden"
                      avatarFallbackClass="w-8 h-8 text-white rounded-full text-xl"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {currentUserName}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {userSelected && (
        <div className="relative flex flex-col justify-between min-h-[384px]">
          <div>
            <div className="flex items-center gap-1 bg-indigo-600 px-4 py-2 shadow-md text-white sticky top-0 z-50">
              <button
                className="w-8 h-8"
                onClick={() => setUserSelected(false)}
              >
                <ChevronLeftIcon className="w-5 h-5 cursor-pointer" />
              </button>
              <div className="flex items-center gap-2">
                <ImageFallBack
                  imgSrc={currentUserImage}
                  fallBackText={userName!}
                  avatarClass="w-9 h-9 rounded-full"
                  avatarImgClass="w-full h-full overflow-hidden"
                  avatarFallbackClass="w-9 h-9 text-white rounded-full text-xl"
                />
                <div className="flex flex-col gap-0">
                  <p className="text-[17px]">{userName}</p>
                  <p className="text-[13px] text-gray-100">@{userHandle}</p>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              {selectedContact?.messageList?.map((chat) => {
                const isCurrentUser = chat.messagingId === userId;
                return (
                  <div key={chat.messagedAt} className={`px-4 py-1.5 w-full`}>
                    <div
                      className={`flex ${isCurrentUser ? "justify-end" : ""}`}
                    >
                      {!isCurrentUser && (
                        <ImageFallBack
                          imgSrc={chat.currChatImage}
                          fallBackText={chat.currChatName}
                          avatarClass="h-10 w-10 rounded-full object-cover mr-2"
                          avatarImgClass="w-full h-full overflow-hidden"
                          avatarFallbackClass="w-10 h-10 text-white object-cover rounded-full text-xl"
                        />
                      )}
                      <div
                        className={`${
                          isCurrentUser ? "text-right" : ""
                        } flex-1 min-w-0`}
                      >
                        <p
                          className={`inline-flex text-gray-700 relative text-[13px] py-1.5 px-2 shadow-md rounded-md`}
                        >
                          <span>{chat.message}</span>
                        </p>
                        <div
                          className={`${
                            isCurrentUser ? "text-right mr-1" : "ml-2"
                          }`}
                        >
                          <span className="text-[10px] relative top-1">
                            {extractHourAndMinutes(chat.messagedAt)}
                          </span>
                        </div>
                      </div>
                      {isCurrentUser && (
                        <div className="flex flex-col items-center">
                          <ImageFallBack
                            imgSrc={chat.currChatImage}
                            fallBackText={chat.currChatName}
                            avatarClass="h-10 w-10 rounded-full object-cover ml-2"
                            avatarImgClass="w-full h-full overflow-hidden"
                            avatarFallbackClass="w-10 h-10 text-white object-cover rounded-full text-xl"
                          />
                          <p className="relative left-1 text-xs">Me</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              <div ref={messageRef} />
            </div>
          </div>
          <div className="sticky bottom-0 py-1 bg-white z-30">
            <GlobalMessageForm
              selectedContact={selectedContact!}
              setSelectedContact={setSelectedContact}
            />
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};
export default GlobalMessagesList;
