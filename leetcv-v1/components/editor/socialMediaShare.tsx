import React from "react";
import { LinkedinShareButton } from "react-share";
import Script from "next/script";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { ShareIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";

const ShareButton = () => {
  const [resume] = useRecoilState(resumeState);
  const url = `${window.location.origin}/r/${resume.handle}`;
  const title = "LeetCV";
  const imageUrl = `${window.location.origin}/get-started.png`;
  const t = useTranslations("ResumeEditor");

  return (
    <div className="flex space-x-4">
      <LinkedinShareButton url={url} title={title} summary={t("summary")}>
        <button className="flex-none rounded-md bg-indigo-600 px-3.5 py-1 text-sm font-semibold text-white shadow-sm flex items-center gap-2 hover:bg-indigo-700">
          <ShareIcon className="w-5 text-white" />
          {"Share Now"}
        </button>
      </LinkedinShareButton>

      <Script
        src="https://platform.twitter.com/widgets.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v10.0"
        strategy="lazyOnload"
      />
      <Script src="https://platform.linkedin.com/in.js" strategy="lazyOnload" />

      <Script strategy="lazyOnload" id="get-started">
        {`
          if (typeof document !== 'undefined') {
            const head = document.head || document.getElementsByTagName('head')[0];
            const ogImageTag = document.createElement('meta');
            ogImageTag.setAttribute('property', 'og:image');
            ogImageTag.setAttribute('content', '${imageUrl}');
            head.appendChild(ogImageTag);
          }
        `}
      </Script>
    </div>
  );
};

export default ShareButton;
