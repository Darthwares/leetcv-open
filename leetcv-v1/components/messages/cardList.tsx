import { useRecoilState, useSetRecoilState } from "recoil";
import {
  receiverHandleState,
  selectedChatMessageMessages,
  selectedConversationState,
  showMessageState,
  sideBarOpenState,
  userImageState,
  userNameState,
} from "@state/state";
import getTimeStamp from "@constants/defaults";
import ImageFallBack from "@components/imageFallBack";

export type Message = {
  messagingId: string;
  message: string;
  messagedAt: string;
  currChatName?: string;
  currChatImage?: string;
};

export type ConversationProps = {
  id: string;
  receiverHandle: string;
  senderHandle: string;
  receiverName: string;
  receiverId: string;
  receiverImage: string;
  senderName: string;
  senderImage: string;
};

type Props = {
  otherUserName: string;
  otherUserImage: string;
  receiverHandle: string;
  messageList: Message[];
  onClick: () => void;
  conversationDetails: ConversationProps;
};

const Card: React.FC<Props> = ({
  otherUserName,
  otherUserImage,
  receiverHandle,
  messageList,
  conversationDetails,
}) => {
  const latestMessage = messageList[messageList.length - 1];
  const [showMessage, setShowMessage] = useRecoilState(showMessageState);
  const [selectedMessageList, setSelectedMessageList] = useRecoilState(
    selectedChatMessageMessages
  );
  const setUserImage = useSetRecoilState(userImageState);
  const setUserName = useSetRecoilState(userNameState);
  const setHandle = useSetRecoilState(receiverHandleState);
  const setSelectedConversation = useSetRecoilState(selectedConversationState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const handleClick = () => {
    setSelectedMessageList(messageList);
    setUserImage(otherUserImage);
    setUserName(otherUserName);
    setHandle(receiverHandle);
    setSelectedConversation(conversationDetails);
    setShowMessage(!showMessage);
  };

  return (
    <div
      className={`${
        selectedMessageList === messageList && "lg:bg-gray-200"
      } flex flex-row items-center cursor-pointer p-4 relative hover:bg-gray-200 duration-200 transition-all ease-in-out`}
      onClick={handleClick}
      onKeyUp={(e) => e.key === "Enter" && handleClick()}
    >
      <div className="absolute text-[11px] text-gray-500 right-0 top-0 mr-4 mt-1">
        {getTimeStamp(latestMessage.messagedAt)}
      </div>
      <ImageFallBack
        imgSrc={otherUserImage}
        fallBackText={otherUserName}
        avatarClass="w-10 h-10 rounded-full"
        avatarImgClass="w-full h-full overflow-hidden"
        avatarFallbackClass="w-10 h-10 text-white rounded-full text-xl"
      />
      <div className="flex flex-col flex-grow ml-3">
        <div
          className={`text-sm font-medium w-48 truncate sm:w-96 ${
            isSideBarClosed ? "lg:w-52" : "lg:w-40"
          } xl:w-60`}
        >
          {otherUserName}
        </div>
        <div
          className={`text-xs truncate w-60 sm:w-96 ${
            isSideBarClosed ? "lg:w-56" : "lg:w-40"
          } xl:w-72`}
        >
          {latestMessage?.message}
        </div>
      </div>
    </div>
  );
};

export default Card;
