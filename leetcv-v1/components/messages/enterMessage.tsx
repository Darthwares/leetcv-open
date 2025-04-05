import { useRecoilState } from "recoil";
import {
  resumeState,
  selectedChatMessageMessages,
  selectedConversationState,
  userBlockedState,
} from "@state/state";
import { trpc } from "utils/trpc";
import { useEffect, useState } from "react";
import ReusableText from "./reusableText";
import { ToastContainer, toast } from "react-toastify";
import { useTranslations } from "next-intl";

const EnterMessages = () => {
  const [resume] = useRecoilState(resumeState);
  const [conversation] = useRecoilState(selectedConversationState);
  const [content, setContent] = useState("");
  const [selectedChat, setSelectedChat] = useRecoilState(
    selectedChatMessageMessages
  );
  const t = useTranslations("Messages");
  const setMessage = trpc.useMutation(["fs.message.create"]);
  const [isBlocked] = useRecoilState(userBlockedState);

  const { refetch } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  const { data: isUserBlocked, refetch: refetchIsUserBlocked } = trpc.useQuery([
    "fs.message.isUserBlocked",
    {
      id: conversation.receiverId,
      receiverId: conversation.id,
    },
  ]);

  useEffect(() => {
    refetchIsUserBlocked();
  }, [isBlocked]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!content.trim()) {
      return;
    }
    try {
      setMessage.mutate(
        {
          content,
          id: conversation.id,
          receiverHandle: conversation.receiverHandle,
          senderHandle: conversation.senderHandle,
          receiverName: conversation.receiverName,
          receiverId: conversation.receiverId,
          senderName: conversation.senderName,
          senderImage: conversation.senderImage ?? conversation.senderName,
          receiverImage:
            conversation.receiverImage ?? conversation.receiverName,
          timeStamp: new Date().toISOString(),
          messagingId: resume.id,
          currChatImage: resume.image!,
          currChatName: resume.displayName,
        },
        {
          onError: (error) => {
            toast.error(error.message);
          },
          onSuccess: () => {
            refetch();
            setContent("");
            const newMessage = {
              currChatImage: resume.image!,
              currChatName: "You",
              messagingId: resume.id,
              message: content,
              messagedAt: new Date().toISOString(),
            };
            setSelectedChat([...selectedChat, newMessage]);
          },
        }
      );
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <form
      className="bg-slate-50 lg:sticky bottom-0 md:px-4 pb-2 lg:pb-3"
      onSubmit={handleSend}
    >
      {isUserBlocked?.blockId !== null &&
      isUserBlocked?.blockId !== undefined ? (
        <p className="text-gray-500 bg-white py-3 text-xs md:text-sm font-medium text-center">
          {t("userBlocked")}
        </p>
      ) : (
        <ReusableText content={content} setContent={setContent} />
      )}
      <ToastContainer />
    </form>
  );
};

export default EnterMessages;
