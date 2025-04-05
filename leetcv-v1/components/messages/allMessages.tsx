import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentSelectedMessageState,
  resumeState,
  showUsersState,
  sideBarOpenState,
  userIdState,
} from "@state/state";
import { trpc } from "utils/trpc";
import Card from "./cardList";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl";
import SkeletonLoading from "./skeletonLoading";
import useSortedMessages from "./useSortedMessages";
import { InstantSearch } from "react-instantsearch-dom";
import { CustomSearchUsers, UsersHit, searchClient } from "./searchPeople";
import { ChatAltIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import NoSelectedChat from "./noSelectedChat";

const AllMessages = () => {
  const [resume] = useRecoilState(resumeState);
  const [userId] = useRecoilState(userIdState);
  const [showUsers, setShowUsers] = useRecoilState(showUsersState);
  const [apiCalled, setApiCalled] = useState<boolean>(false);

  const setCurrentSelectedMessage = useSetRecoilState(
    currentSelectedMessageState
  );
  const t = useTranslations("Messages");
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: getMessageList, isLoading } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: resume.id,
    },
  ]);

  const { sortedMessages } = useSortedMessages(getMessageList);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (sortedMessages?.length === 0) {
      timer = setTimeout(() => {
        setApiCalled(true);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div
      className={`w-full ${
        isSideBarClosed ? "lg:w-80" : "lg:w-64"
      } xl:w-96 flex-shrink-0 bg-gray-100 lg:py-4`}
    >
      <div className="flex flex-col w-full min-h-screen lg:h-full py-4 -mr-4">
        <div className="flex flex-row px-4 items-center">
          <div className="flex gap-2 items-center">
            <div className="text-xl font-semibold">{t("chats")}</div>
          </div>
        </div>
        <InstantSearch searchClient={searchClient} indexName="Resumes">
          <CustomSearchUsers />
          <UsersHit />
        </InstantSearch>
        {!showUsers && (
          <div className="h-full overflow-hidden relative px-4 pt-2 z-10">
            <div className="flex flex-col divide-y h-full overflow-y-auto -mx-4">
              {sortedMessages?.length === 0 && apiCalled ? (
                <>
                  <div className="lg:hidden">
                    <NoSelectedChat getMessageList={getMessageList} />
                  </div>
                  <div className="hidden lg:flex flex-col gap-6 items-center h-full lg:justify-normal bg-gray-100 py-20 w-full text-gray-700 my-auto">
                    <div
                      style={{
                        transition: "width 300ms ease-in-out",
                      }}
                    >
                      <ChatAltIcon className="w-12 h-12 text-indigo-500" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-semibold mb-2">
                        {t("notFound")}
                      </h3>
                      <p className={`w-80 xl:max-w-md mx-auto`}>
                        {t("noConversation")}
                      </p>
                    </div>
                  </div>
                </>
              ) : apiCalled ? (
                <>
                  {sortedMessages?.map((conversation) => {
                    const handleCardClick = () => {
                      setCurrentSelectedMessage(conversation.receiverId);
                      setShowUsers(false);
                    };
                    const currentUserImage =
                      conversation.id === userId
                        ? conversation.receiverImage
                        : conversation.senderImage;
                    const currentUserName =
                      conversation.id === userId
                        ? conversation.receiverName
                        : conversation.senderName;
                    const userHandle =
                      conversation.id === userId
                        ? conversation.receiverHandle
                        : conversation.senderHandle;
                    return (
                      <div key={uuidv4()}>
                        <Card
                          otherUserName={currentUserName}
                          otherUserImage={currentUserImage}
                          receiverHandle={userHandle!}
                          messageList={conversation.messageList!}
                          onClick={handleCardClick}
                          conversationDetails={{
                            id: conversation.id,
                            receiverHandle: conversation.receiverHandle,
                            senderHandle: conversation.senderHandle!,
                            receiverName: conversation.receiverName,
                            receiverId: conversation.receiverId,
                            receiverImage: conversation.receiverImage,
                            senderImage: conversation.senderImage,
                            senderName: conversation.senderName,
                          }}
                        />
                      </div>
                    );
                  })}
                </>
              ) : (
                <SkeletonLoading />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllMessages;
