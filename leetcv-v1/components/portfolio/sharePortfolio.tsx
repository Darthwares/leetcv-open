import CustomHead from "@components/customHead";
import { NO_SKILLS_LISTED } from "@constants/defaults";
import { ShareIcon } from "@heroicons/react/outline";
import { profileResumeState, shareProfileModalState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

export const SharePortfolio = () => {
  const t = useTranslations("Appbar");
  const [resume] = useRecoilState(profileResumeState);
  const setShareProfileModal = useSetRecoilState(shareProfileModalState);


  const shareProfile = () => {
    setShareProfileModal(true)
  };

  return (
    <>
      <CustomHead
        description={resume.description!}
        name={resume.displayName}
        url={`${
          typeof window !== "undefined" ? window.location.origin : ""
        }/p/${resume.handle}`}
        image={resume.image!}
        skills={resume.skills?.join(", ") ?? NO_SKILLS_LISTED}
      />
      <div
        className={`fixed bottom-4 md:bottom-6 z-30 right-4 md:right-6 lg:right-8`}
      >
        <button
          onClick={shareProfile}
          className="w-10 h-10 sm:w-12 sm:h-12 relative group print:hidden rounded-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 "
        >
          <span className="absolute bottom-2 -left-14 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
            {t("share")}
          </span>
          <ShareIcon className="sm:w-6 sm:h-6 w-5 h-5 text-white" />
        </button>
      </div>
    </>
  );
};

