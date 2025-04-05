import CopyLink from "@components/copyLink";
import { hashtags, shareReferralLinks } from "@constants/defaults";
import { referralCode, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

const ShowSharableLinks = () => {
  const [isReferralCode] = useRecoilState(referralCode);
  const [userInfo] = useRecoilState(resumeState);
  const t = useTranslations("Referral");

  const shareUrl = `${window.location.origin}/s/settings/referral-code?handle=${userInfo.handle}&refer=${isReferralCode}`;
  const shareText = `${t("professionalResume")}"${isReferralCode}"${t(
    "exclusiveOffer"
  )}`;

  const socialMediaReferrals = shareReferralLinks(
    shareText,
    shareUrl,
    hashtags
  );

  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white dark:bg-gray-800/50 text-gray-600 px-4 py-5 shadow sm:px-6"
      data-testid="showSharableLinks"
    >
      <div className="flex flex-col lg:flex-row justify-between w-full">
        <div className="flex flex-col items-start gap-2">
          <p className="text-gray-600 font-semibold dark:text-gray-300 text-lg">
            {t("yourReferralLink")}
          </p>
          <CopyLink copyText={t("copy")} copied={t("copied")} url={shareUrl} />
          <div className="flex gap-2 mt-4">
            {socialMediaReferrals.map((share) => (
              <share.ShareButton
                key={uuidv4()}
                url={shareUrl}
                title={shareText}
                hashtags={hashtags}
              >
                <share.Icon size={32} round={true} />
              </share.ShareButton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowSharableLinks;
