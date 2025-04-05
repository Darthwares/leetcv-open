import { LinkIcon, ShareIcon } from "@heroicons/react/outline";
import { profileResumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useRecoilState } from "recoil";
import FireFoxCustomAlert from "./fireFoxCustomAlert";

const PublicResumeShare = () => {
  const [userInfo] = useRecoilState(profileResumeState);
  const t = useTranslations("ProfileHeader");
  const [showAlert, setShowAlert] = useState(false);
  const resumeLink = `${window.location.origin}/r/${userInfo.handle}`;

  const shareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: `Checkout: ${userInfo.displayName}`,
        text: `Checkout: ${userInfo.displayName}...`,
        url: resumeLink,
      });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <div
        className="flex items-center gap-3.5 text-base text-indigo-700 font-semibold leading-7 p-3 gradient-bg w-full sm:max-w-fit rounded-lg"
        data-testid="public-resume-share"
      >
        <div
          className="flex gap-2 items-center"
          data-testid="public-resume-share-link"
        >
          <LinkIcon className="h-5 w-5 " />
          <a
            className="hover:underline  truncate w-60 md:w-full"
            target="_blank"
            href={`${window.location.origin}/r/${userInfo.handle}`}
            rel="noreferrer"
          >
            {window.location.host}/r/{userInfo.handle}
          </a>
        </div>
        <div className="flex bg-indigo-500 text-white px-3 py-1.5 rounded-md items-center gap-2">
          <button
            className="text-sm flex items-center gap-1.5"
            onClick={shareProfile}
            data-testid="public-resume-share-btn"
          >
            <p className="hidden sm:block">{t("share")}</p>
            <ShareIcon className="h-7 sm:h-4 w-4 block" />
          </button>
        </div>
      </div>
      <FireFoxCustomAlert
        open={showAlert}
        setOpen={setShowAlert}
        message={t("browserNotSupported")}
        link={resumeLink}
      />
    </>
  );
};

export default PublicResumeShare;
