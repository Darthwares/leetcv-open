import { userInfoProps } from "@constants/defaults";
import { resumeState } from "@state/state";
import { trpc } from "@utils/trpc";
import { Resume } from "data/models/UserInfo";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";

type UseSendMessageProps = {
  content: string;
  userInfo: Resume | userInfoProps;
  t: any;
  updateLocalMessagesForUi?: () => void;
  refetchMessages?: () => Promise<void> | void;
};

const useSendMessage = () => {
  const resume = useRecoilValue(resumeState);
  const setMessage = trpc.useMutation(["fs.message.create"]);
  const { refetch } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  const setMessageNotification = trpc.useMutation([
    "fs.notification.messageNotification",
  ]);

  const sendMessage = ({
    content,
    userInfo,
    t,
    updateLocalMessagesForUi,
    refetchMessages,
  }: UseSendMessageProps) => {
    setMessage.mutate(
      {
        content,
        id: resume.id,
        receiverHandle: userInfo.handle,
        senderHandle: resume.handle,
        receiverName: userInfo.displayName,
        receiverId: userInfo.id,
        senderName: resume.displayName,
        senderImage: resume.image as string,
        receiverImage: userInfo.image ?? userInfo.displayName,
        timeStamp: new Date().toISOString(),
        messagingId: resume.id,
        currChatImage: resume.image as string,
        currChatName: resume.displayName,
      },
      {
        onSuccess: () => {
          updateLocalMessagesForUi?.();
          refetchMessages?.();
          refetch();
          toast.success(t("success"));
          setMessageNotification.mutate({
            handle: userInfo.handle,
            name: resume.displayName,
          });
        },
        onError: (err) => {
          toast.error(err.message || "An unexpected error occurred");
        },
      }
    );
  };

  return sendMessage;
};

export default useSendMessage;
