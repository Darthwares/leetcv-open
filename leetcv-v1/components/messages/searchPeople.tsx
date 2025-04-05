import {
  currentSelectedMessageState,
  receiverHandleState,
  resumeState,
  selectedChatMessageMessages,
  selectedConversationState,
  showMessageState,
  showUsersMessageState,
  showUsersState,
  sideBarOpenState,
  userImageState,
  userNameState,
} from "@state/state";
import algoliasearch from "algoliasearch/lite";
import { useTranslations } from "next-intl";
import { connectSearchBox, connectHits } from "react-instantsearch-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import ImageFallBack from "@components/imageFallBack";
import { useEffect, useState } from "react";
import { trpc } from "@utils/trpc";
import { SearchIcon } from "@heroicons/react/outline";

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY ?? ""
);

const ProfileHits = ({ hits }: any) => {
  const t = useTranslations("AlgoliaSearch");
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo] = useRecoilState(resumeState);
  const [showUsers, setShowUsers] = useRecoilState(showUsersState);
  const setCurrentSelectedMessage = useSetRecoilState(
    currentSelectedMessageState
  );
  const [showMessage, setShowMessage] = useRecoilState(showMessageState);
  const setShowMessageState = useSetRecoilState(showUsersMessageState);
  const [selectedMessageList, setSelectedMessageList] = useRecoilState(
    selectedChatMessageMessages
  );
  const setUserImage = useSetRecoilState(userImageState);
  const setUserName = useSetRecoilState(userNameState);
  const setHandle = useSetRecoilState(receiverHandleState);
  const setSelectedConversation = useSetRecoilState(selectedConversationState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: getMessageList } = trpc.useQuery([
    "fs.message.getMessageList",
    {
      receiverId: userInfo.id,
    },
  ]);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (hits) {
      setIsLoading(!hits.length);
    }
  }, [hits, showUsers]);

  if (!showUsers) return null;
  return (
    <div className="overflow-hidden bg-slate-100 sm:rounded-md max-w-6xl w-full px-3">
      {isLoading ? (
        <div className="w-full flex items-center h-96 justify-center">
          Loading...
        </div>
      ) : (
        <>
          <ul
            role="list"
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-1 z-20"
          >
            {hits?.map((hit: any) => {
              if (hit.objectID === userInfo.id) {
                return;
              }
              if (!hit.displayName) {
                return;
              }
              return (
                <li
                  key={hit.handle}
                  onClick={() => {
                    setShowUsers(false);
                    setCurrentSelectedMessage(userInfo.id);
                    setShowMessageState(true);

                    const matchedMessage = getMessageList?.find((m) => {
                      return (
                        m.id === hit?.objectID || m.receiverId === hit?.objectID
                      );
                    });

                    if (matchedMessage) {
                      setSelectedMessageList(matchedMessage.messageList || []);
                    } else {
                      setSelectedMessageList([]);
                    }
                    setUserImage(hit.image);
                    setUserName(hit.displayName);
                    setHandle(hit.handle);
                    setSelectedConversation({
                      id: matchedMessage ? matchedMessage.id : hit?.objectID,
                      receiverHandle: userInfo.handle,
                      senderHandle: hit.handle || "",
                      receiverName: userInfo.displayName,
                      receiverId: userInfo.id,
                      receiverImage: userInfo.image || "",
                      senderImage: hit.image,
                      senderName: hit.displayName,
                    });

                    setShowMessage(!showMessage);
                  }}
                  className="bg-white"
                >
                  <a>
                    <div>
                      <div className="cursor-pointer rounded-lg border border-gray-300 px-2">
                        <div className="flex items-center lg:items-start gap-3">
                          <div className="relative flex items-start space-x-3 py-3.5">
                            <div className="flex flex-col items-center gap-y-2 justify-center">
                              <ImageFallBack
                                imgSrc={hit.image!}
                                fallBackText={hit?.displayName}
                                avatarClass="w-16 h-16 rounded-md overflow-hidden"
                                avatarImgClass="w-full h-full border-gray-200 bg-indigo-100"
                                avatarFallbackClass="w-16 h-16 rounded-md text-white text-4xl"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="focus:outline-none">
                                {/* <span
                                  className="absolute inset-0"
                                  aria-hidden="true"
                                /> */}
                                <p
                                  className={`text-base font-medium text-gray-900 w-48 sm:w-96 md:w-60 ${
                                    isSideBarClosed ? "lg:w-44" : "lg:w-36"
                                  } xl:w-60 truncate`}
                                >
                                  {hit?.displayName}
                                </p>
                                <p
                                  className={`truncate w-48 sm:w-96 md:w-60 text-sm ${
                                    isSideBarClosed ? "lg:w-44" : "lg:w-36"
                                  } xl:w-60 text-gray-500`}
                                >
                                  {hit?.position}
                                </p>
                                <div
                                  className={`flex items-center truncate w-48 sm:w-96 md:w-60 ${
                                    isSideBarClosed ? "lg:w-48" : "lg:w-36"
                                  } xl:w-60 gap-2 text-sm text-gray-500`}
                                >
                                  {hit?.city && (
                                    <p className="hidden md:flex">
                                      {hit?.city},
                                    </p>
                                  )}
                                  <div
                                    className={`flex ${
                                      isSideBarClosed
                                        ? "lg:flex gap-2"
                                        : "lg:hidden"
                                    } xl:flex gap-2`}
                                  >
                                    {hit?.state && (
                                      <p className="hidden md:flex">
                                        {hit?.state},
                                      </p>
                                    )}
                                    <p>{hit?.country}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export const UsersHit = connectHits(ProfileHits);

const SearchUsers = ({ currentRefinement, refine }: any) => {
  const setShowUsers = useSetRecoilState(showUsersState);
  return (
    <form noValidate action="" role="search" className="max-w-6xl w-full px-3">
      <div className="relative items-center flex w-full">
        <SearchIcon
          className="pointer-events-none absolute ml-3 inset-y-0 left-0 h-full w-5 text-gray-400"
          aria-hidden="true"
        />
        <input
          className="py-2 input mt-2 md:mb-3 w-full pl-10"
          placeholder={"Search User"}
          data-testid="searchId"
          value={currentRefinement}
          onSubmit={(ev) => {
            ev.preventDefault();
          }}
          onChange={(event) => {
            refine(event.currentTarget.value);
            setShowUsers(event.currentTarget.value.length !== 0);
          }}
        />
      </div>
    </form>
  );
};

export const CustomSearchUsers = connectSearchBox(SearchUsers);
