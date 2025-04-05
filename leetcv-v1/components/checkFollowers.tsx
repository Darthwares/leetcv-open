import { useRecoilState } from "recoil";
import { resumeState, sideBarOpenState, userIdState } from "@state/state";
import { useTranslations } from "next-intl";
import { trpc } from "../utils/trpc";
import RequestResources from "./resource/requestsResources";
import { getCurrentPage, userInfoInitialState } from "@constants/defaults";
import MomentTimeFormate from "./momentTimeFormate";
import { useEffect, useState } from "react";
import ReUsablePaginationButtons from "./reUsablePaginationButtons";
import MessageSidebar from "./messages/messageSidebar";
import CardChatIconBtn from "./cardChatIconBtn";
import ImageFallBack from "./imageFallBack";

export default function CheckFollowers() {
  const [userId] = useRecoilState(userIdState);
  const t = useTranslations("CheckFollowers");
  const [resume] = useRecoilState(resumeState);
  const [currentPage, setCurrentPage] = useState(getCurrentPage());
  const [totalPages, setTotalPages] = useState(0);
  const [userInfo, setUserInfo] = useState(userInfoInitialState);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);

  const { data: followers } = trpc.useQuery(
    [
      "fs.follower.getFollowers",
      { id: userId, handle: resume.handle, page: currentPage },
    ],
    {
      enabled: !!userId && !!resume.handle,
    }
  );

  const followersList = followers?.list ?? [];

  useEffect(() => {
    if (followers?.totalPages) {
      setTotalPages(followers?.totalPages);
    }
  }, [followers]);

  return (
    <div className="w-full mt-5" data-testid="following">
      {followersList?.length === 0 && (
        <div className="py-4 md:mt-8">
          <RequestResources
            title={t("receiveRequests")}
            message={t("receiveRequestsSubText")}
            path={"/assets/lottie/security-lock.json"}
          />
        </div>
      )}
      {followersList?.length !== 0 && (
        <>
          <p className="hidden md:block font-semibold text-lg dark:text-white text-gray-700 pl-2 mb-5">
            {t("checkFollowers")}
          </p>
          <div className="min-h-[65vh] md:min-h-[60vh] flex flex-col justify-between">
            <ul className="md:mx-2 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {followersList?.map((user) => {
                const url =
                  user?.userHandle &&
                  `${location.origin}/r/${user?.userHandle}`;
                return (
                  <li
                    key={user?.id}
                    className="border relative rounded-lg incomingReqCard dark:border-gray-700 dark:bg-gray-800/20"
                  >
                    <div className="flex items-center gap-4 p-4 w-full">
                      <ImageFallBack
                        imgSrc={user.userImage}
                        fallBackText={user.userName}
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
                              className={`text-gray-900 block hover:text-blue-600 text-base font-semibold cursor-pointer truncate dark:text-gray-100 reqUserName w-40 sm:w-40 ${
                                isSideBarClosed
                                  ? "lg:w-72 xl:w-56"
                                  : "lg:w-48 xl:w-36"
                              }`}
                            >
                              {user?.userName}
                            </a>
                            <p
                              className={`text-gray-700 block text-base cursor-pointer truncate reqUserName  w-40 sm:w-40 ${
                                isSideBarClosed
                                  ? "lg:w-72 xl:w-56"
                                  : "lg:w-48 xl:w-36"
                              } dark:text-gray-300`}
                            >
                              {user?.profession}
                            </p>
                          </div>
                          <MomentTimeFormate timeStamp={user.followedAt} />
                          <div className="absolute bottom-4 right-4">
                            <CardChatIconBtn
                              setUserDetails={() => {
                                setUserInfo({
                                  id: user?.id,
                                  handle: user.userHandle,
                                  image: user.userImage,
                                  displayName: user.userName,
                                  position: user.profession,
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
            {followersList?.length !== 0 && totalPages !== 1 && (
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
