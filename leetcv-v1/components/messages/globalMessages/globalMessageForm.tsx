import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { SelectedMessageProps } from "@constants/defaults";
import { ToastContainer, toast } from "react-toastify";

type GlobalMessageFormProps = {
  selectedContact: SelectedMessageProps;
  setSelectedContact: Dispatch<
    SetStateAction<SelectedMessageProps | undefined>
  >;
};

const GlobalMessageForm = ({
  selectedContact,
  setSelectedContact,
}: GlobalMessageFormProps) => {
  const [resume] = useRecoilState(resumeState);
  const [content, setContent] = useState("");
  const setMessage = trpc.useMutation(["fs.message.create"]);
  const t = useTranslations("Messages");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (selectedContact && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [selectedContact]);

  const { refetch } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  const handleSendMsg = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content.trim()) {
      return;
    }
    try {
      setMessage.mutate(
        {
          content,
          id: selectedContact?.id,
          receiverHandle: selectedContact?.receiverHandle,
          senderHandle: selectedContact?.senderHandle!,
          receiverName: selectedContact?.receiverName,
          receiverId: selectedContact?.receiverId,
          senderName: selectedContact?.senderName,
          senderImage:
            selectedContact?.senderImage ?? selectedContact?.senderName,
          receiverImage:
            selectedContact?.receiverImage ?? selectedContact?.receiverName,
          timeStamp: new Date().toISOString(),
          messagingId: resume.id,
          currChatImage: resume.image!,
          currChatName: resume.displayName,
        },
        {
          onSuccess: () => {
            setContent("");
            const newMessage = {
              currChatImage: resume.image!,
              currChatName: "You",
              messagingId: resume.id,
              message: content,
              messagedAt: new Date().toISOString(),
            };
            setSelectedContact((prevState: any) => {
              if (!prevState) return prevState;

              return {
              ...prevState,
                messageList: prevState.messageList
                  ? [...prevState.messageList, newMessage]
                  : [newMessage],
              };
            });
            refetch();
          },
          onError: (error) => {
            toast.error(error?.message);
          },
        }
      );
    } catch (error) {
      console.error("Error updating message:");
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const submitButton = document.getElementById("enter-btn");
      if (submitButton) {
        submitButton.click();
      }
    }
  };

  return (
    <form className="flex items-center gap-2 px-2" onSubmit={handleSendMsg}>
      <textarea
        ref={textareaRef}
        cols={30}
        rows={1}
        className="rounded-full  w-full focus:outline-none border-2 border-gray-300 focus:border-indigo-400 text-sm h-10 msg-text-area hidden lg:block resize-none"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
        placeholder={t("typeYourMsg")}
        onKeyDown={handleKeyUp}
      />
      <button id="enter-btn" type="submit" disabled={!content.trim()}>
        <PaperAirplaneIcon className="w-6 h-6 rotate-90 text-indigo-500" />
      </button>
      <ToastContainer />
    </form>
  );
};

export default GlobalMessageForm;
