import ImageFallBack from "@components/imageFallBack";
import { mobileMenuSidebar, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const NonProUser = () => {
  const t = useTranslations("Appbar");
  const [resume] = useRecoilState(resumeState);
  const router = useRouter();
  const setIsMobileMenuSidebarOpen = useSetRecoilState(mobileMenuSidebar);

  return (
    <div
      className="dark:bg-gray-800/40 shadow bg-gradient-to-r from-indigo-100 to-pink-200 pb-2  dark:from-gray-800 dark:to-gray-700"
      data-testid="non-pro-container"
    >
      <div className="flex items-center gap-4 dark:shadow-none px-4 py-2">
        <div
          className="flex flex-col items-center py-2"
          data-testid="user-image"
        >
          <ImageFallBack
            imgSrc={resume?.image!}
            fallBackText={resume?.displayName}
            avatarClass=" h-12 w-12 rounded-full"
            avatarImgClass="w-full h-full overflow-hidden"
            avatarFallbackClass=" h-12 w-12 rounded-full text-white text-2xl"
          />
        </div>
        <div className="-mt-1">
          <h5
            id="drawer-navigation-label"
            className="text-base font-semibold line-clamp-1"
            data-testid="user-name"
          >
            {resume.displayName}
          </h5>
          <p
            id="drawer-navigation-label"
            className="text-sm font-semibold line-clamp-1 dark:text-gray-400 text-gray-600"
            data-testid="user-handle"
          >
            @{resume.handle}
          </p>
        </div>
      </div>
      <div className="w-full px-4">
        <button
          onClick={() => {
            router.push("/pricing");
            setIsMobileMenuSidebarOpen(false);
          }}
          className="w-full dark:bg-gray-950/25 py-1 pl-2 pr-4 font-sans rounded-md font-semibold text-white transition duration-300 ease-in-out delay-300 bg-indigo-600 border-b-0 border-indigo-700 dark:border-none hover:border-indigo-600"
          data-testid="pro-btn"
        >
          <div
            className="flex items-center justify-center w-full py-1 gap-1"
            data-testid="pro-btn-text"
          >
            <span className="text-sm font-semibold">{t("becomePRO")}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NonProUser;
