import CardChatIconBtn from "@components/cardChatIconBtn";
import ImageFallBack from "@components/imageFallBack";
import MessageSidebar from "@components/messages/messageSidebar";
import { userInfoInitialState } from "@constants/defaults";
import { LockClosedIcon } from "@heroicons/react/outline";
import { UserProfile } from "data/models/Colleagues";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface ColleagueListProps {
  findColleagues: UserProfile[];
}

const ColleagueList = ({ findColleagues }: ColleagueListProps) => {
  const t = useTranslations("Colleagues");
  const [userInfo, setUserInfo] = useState(userInfoInitialState);

  return (
    <>
      {findColleagues?.map((colleague: UserProfile) => {
        const userHandleLink = `${window.location.origin}/r/${colleague?.handle}`;
        return (
          <div
            key={colleague?.handle}
            className="shadow-sm rounded-lg px-4 py-5 dark:bg-gray-800/20 dark:border-gray-700 bg-gray-50 border border-gray-200 relative"
          >
            <div className="flex justify-between">
              <div className="flex gap-2 rounded-md">
                <ImageFallBack
                  imgSrc={colleague.image}
                  fallBackText={colleague.displayName}
                  avatarClass="w-12 h-12 rounded-full"
                  avatarImgClass="w-full h-full rounded-full overflow-hidden border-gray-200 bg-indigo-100"
                  avatarFallbackClass="w-12 h-12 text-white rounded-full text-2xl"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-0.5">
                    <p className="font-semibold w-52 sm:w-[11.5rem] lg:w-44 xl:w-40 truncate">
                      {colleague?.displayName}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-300 w-52 sm:w-[11.5rem] lg:w-44 xl:w-40 truncate">
                      {colleague?.position || t("softWareEngineer")}
                    </p>
                  </div>
                  <a
                    href={userHandleLink}
                    className="text-sm text-blue-500 hover:text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {colleague?.private ? (
                      <span className="flex items-end gap-1 -ml-0.5">
                        <LockClosedIcon className="w-5 h-5 text-blue-500" />
                        <p className="relative top-0.5">{t("request")}</p>
                      </span>
                    ) : (
                      t("viewResume")
                    )}
                  </a>
                </div>
              </div>
              <div className="flex flex-col justify-end items-end lg:absolute bottom-4 right-4">
                <CardChatIconBtn
                  setUserDetails={() => {
                    setUserInfo({
                      id: colleague?.id,
                      handle: colleague.handle,
                      image: colleague?.image,
                      displayName: colleague.displayName,
                      position: colleague?.position,
                    });
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
      <MessageSidebar userInfo={userInfo} />
    </>
  );
};

export default ColleagueList;
