import { useRecoilState } from "recoil";
import { resumeState, sideBarOpenState, userIdState } from "@state/state";
import { useTranslations } from "next-intl";
import { trpc } from "../utils/trpc";
import RequestResources from "./resource/requestsResources";
import { getCurrentPage, userInfoInitialState } from "@constants/defaults";
import MomentTimeFormate from "./momentTimeFormate";
import ReUsablePaginationButtons from "./reUsablePaginationButtons";
import { useEffect, useState } from "react";
import MessageSidebar from "./messages/messageSidebar";
import CardChatIconBtn from "./cardChatIconBtn";
import ImageFallBack from "./imageFallBack";

export default function CheckFollowing() {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CheckFollowing");
  const [resume] = useRecoilState(resumeState);
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState(userInfoInitialState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: following } = trpc.useQuery(
    [
      "fs.follower.getFollowingList",
      { id: userId, handle: resume.handle, page: currentPage },
    ],
    {
      enabled: !!userId && !!resume.handle,
    }
  );

  const followingList = following?.list ?? [];

  useEffect(() => {
    if (following?.totalPages) {
      setTotalPages(following?.totalPages);
    }
  }, [following]);

  return (
    <div className="w-full mt-5" data-testid="following">
      {followingList?.length === 0 && (
        <div className="py-4 md:mt-8">
          <RequestResources
            title={t("receiveRequests")}
            message={t("receiveRequestsSubText")}
            path={"/assets/lottie/security-lock.json"}
          />
        </div>
      )}
      {followingList?.length !== 0 && (
        <>
          <p className="hidden md:block font-semibold text-lg dark:text-white text-gray-700 pl-2 mb-5">
            {t("following")}
          </p>
          <div className="min-h-[65vh] md:min-h-[60vh] flex flex-col justify-between">
            <ul className="md:mx-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {followingList?.map((isFollowing: any) => {
                const url =
                  isFollowing?.userHandle &&
                  `${location.origin}/r/${isFollowing?.userHandle}`;
                return (
                  <li
                    key={isFollowing?.followingId}
                    className="border rounded-lg relative incomingReqCard dark:border-gray-700 dark:bg-gray-800/20"
                  >
                    <div className="flex items-center gap-4 p-4 w-full">
                      <ImageFallBack
                        imgSrc={isFollowing.image}
                        fallBackText={isFollowing.userName}
                        avatarClass="w-[5.5rem] h-[5.5rem] rounded-lg"
                        avatarImgClass="w-full h-full rounded-lg overflow-hidden border-gray-200 bg-indigo-100"
                        avatarFallbackClass="w-[5.5rem] h-[5.5rem] text-white rounded-lg text-5xl"
                      />
                      <div className="flex flex-col gap-3 w-full">
                        <div className="space-y-1">
                          <div className="flex flex-col">
                            <a
                              href={url}
                              rel="noreferrer"
                              className={`text-gray-900 block hover:text-blue-600 text-base font-semibold cursor-pointer dark:text-gray-100 truncate reqUserName w-40 sm:w-40 ${
                                isSideBarClosed
                                  ? "lg:w-72 xl:w-56"
                                  : "lg:w-48 xl:w-36"
                              }`}
                            >
                              {isFollowing?.userName}
                            </a>
                            <p
                              className={`text-gray-700 block text-base cursor-pointer truncate reqUserName w-40 sm:w-40 ${
                                isSideBarClosed
                                  ? "lg:w-72 xl:w-56"
                                  : "lg:w-48 xl:w-36"
                              } dark:text-gray-300`}
                            >
                              {isFollowing?.profession}
                            </p>
                          </div>
                          <MomentTimeFormate
                            timeStamp={isFollowing.followedAt}
                          />
                          <div className="absolute bottom-4 right-4">
                            <CardChatIconBtn
                              setUserDetails={() => {
                                setUserInfo({
                                  id: isFollowing?.followingId,
                                  handle: isFollowing.userHandle,
                                  image: isFollowing.image,
                                  displayName: isFollowing.userName,
                                  position: isFollowing?.profession,
                                });
                              }}
                              bgColor="bg-gray-400 dark:bg-gray-800"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <MessageSidebar userInfo={userInfo} />
            {followingList?.length !== 0 && totalPages !== 1 && (
              <ReUsablePaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
