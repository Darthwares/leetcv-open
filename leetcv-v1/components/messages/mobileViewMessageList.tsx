import { useRecoilState } from "recoil";
import {
  receiverHandleState,
  showMessageState,
  userImageState,
  userNameState,
} from "@state/state";
import HeaderField from "./headerField";
import AllMessages from "./allMessages";
import MessageCard from "./messageCard";
import EnterMessages from "./enterMessage";

const MobileViewMessagesList = () => {
  const [showMessage] = useRecoilState(showMessageState);
  const [userImage] = useRecoilState(userImageState);
  const [userName] = useRecoilState(userNameState);
  const [userHandle] = useRecoilState(receiverHandleState);

  return (
    <div className="block relative lg:hidden">
      {showMessage ? (
        <AllMessages />
      ) : (
        <div className="relative flex flex-col justify-between min-h-[calc(100vh-64px)] md:min-h-screen bg-slate-50">
          <div className="mb-10 md:mb-0">
            <HeaderField
              userImage={userImage}
              userName={userName}
              userHandle={userHandle}
            />
            <MessageCard />
          </div>
          <div className="fixed md:sticky bottom-0 left-0 w-full px-2 md:px-0">
            <EnterMessages />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileViewMessagesList;
