import { useRecoilState } from "recoil";
import {
  receiverHandleState,
  resumeState,
  selectedChatMessageMessages,
  showUsersMessageState,
  userImageState,
  userNameState,
} from "@state/state";
import AllMessages from "./allMessages";
import HeaderField from "./headerField";
import MessageCard from "./messageCard";
import { trpc } from "@utils/trpc";
import EnterMessages from "./enterMessage";
import NoSelectedChat from "./noSelectedChat";

const MessagesList = () => {
  const [selectedChat] = useRecoilState(selectedChatMessageMessages);
  const [userImage] = useRecoilState(userImageState);
  const [userName] = useRecoilState(userNameState);
  const [userHandle] = useRecoilState(receiverHandleState);
  const [resume] = useRecoilState(resumeState);
  const [showUsersMessage] = useRecoilState(showUsersMessageState);
  const { data: getMessageList } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  return (
    <div className="hidden lg:block">
      <div className="h-screen flex w-full antialiased text-gray-800">
        <AllMessages />
        <div className="relative flex flex-col h-full w-full bg-white lg:border-l py-2 lg:py-0">
          {(showUsersMessage || selectedChat?.length > 0) && (
            <>
              <HeaderField
                userImage={userImage}
                userName={userName}
                userHandle={userHandle}
              />
              <MessageCard />
              <EnterMessages />
            </>
          )}
          {!showUsersMessage && selectedChat?.length === 0 && (
            <NoSelectedChat getMessageList={getMessageList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesList;
