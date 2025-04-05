import { profileResumeState, shareProfileModalState } from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import React from "react";
import { ShareIcon } from "@heroicons/react/outline";
import CustomHead from "@components/customHead";
import { NO_SKILLS_LISTED } from "@constants/defaults";

const ShareResume = () => {
  const t = useTranslations("Appbar");
  const [resume] = useRecoilState(profileResumeState);
  const setShareProfileModal = useSetRecoilState(shareProfileModalState);

  const shareProfile = () => {
    setShareProfileModal(true);
  };
  return (
    <>
      <CustomHead
        description={resume.description!}
        name={resume.displayName}
        url={`${
          typeof window !== "undefined" ? window.location.origin : ""
        }/r/${resume.handle}`}
        image={resume.image!}
        skills={resume.skills?.join(", ") ?? NO_SKILLS_LISTED}
      />
      <button data-testid="shareButton">
        <div
          className="app-bar-btn flex md:gap-3 text-sm"
          onClick={shareProfile}
        >
          <ShareIcon className="w-5 h-5" />
          <span className="hidden md:block">{t("share")}</span>
        </div>
      </button>
    </>
  );
};

export default ShareResume;
