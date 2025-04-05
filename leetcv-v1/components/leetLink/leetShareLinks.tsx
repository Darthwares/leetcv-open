import { shareLeetLinks } from "@constants/defaults";
import { ExternalLinkIcon, LinkIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import useCopyToClipboard from "@lib/helper/useCoptToClipboard";
import { profileResumeState, userIdState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";
import { Button } from "shadcn/components/ui/button";
import { v4 as uuidv4 } from "uuid";

type LeetShareLinksProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const LeetShareLinks = ({ setOpen }: LeetShareLinksProps) => {
  const t = useTranslations("LeetLink");
  const [resume] = useRecoilState(profileResumeState);
  const [isCopied, handleCopy] = useCopyToClipboard();
  const shareUrl = `${window.origin}/l/${resume?.handle}`;
  const moreOptionsUrl = `${window.origin}/l/${resume?.handle}?leetLink_source=moreOptions`;
  const shareText = t("shareText");
  const hashtags = ["LeetLink", "ProfessionalProfile", "CareerGrowth"];
  const [userId] = useRecoilState(userIdState);
  const navigatorTitle = `Check out ${
    resume.id === userId ? "my" : `${resume.displayName}'s`
  } Professional LeetLink on LeetCV`;
  const navigatorText = `Take a look at ${
    resume.id === userId ? "my" : `${resume.displayName}'s`
  } resume and portfolio showcased on LeetCV. Connect for potential opportunities!`;
  const emailUrl = `${window.origin}/l/${resume?.handle}?leetLink_source=email`;
  const emailSubject = `Check out ${
    resume.id === userId ? "my" : `${resume.displayName}'s`
  } Professional LeetLink on LeetCV`;
  const emailBody = `Hi there,

  I wanted to share ${
    resume.id === userId ? "my" : `${resume.displayName}'s`
  } professional profile with you. It's hosted on LeetCV, where you can view my resume, portfolio, my socials, achievements, skills, and connect for potential opportunities.
  
  Take a look here: ${emailUrl}
  
  Best regards,
  ${resume.displayName}`;

  const socialMediaReferrals = shareLeetLinks(
    shareText,
    hashtags,
    resume?.handle,
    emailBody,
    emailSubject
  );

  const shareProfile = () => {
    navigator.share({
      title: navigatorTitle,
      text: navigatorText,
      url: moreOptionsUrl,
    });
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {socialMediaReferrals.map((share) => (
        <share.ShareButton
          key={uuidv4()}
          url={share.url}
          title={shareText}
          hashtags={hashtags}
        >
          <div className="hover:bg-gray-100 hover:scale-105 flex items-center justify-between transition-all duration-200 px-4 py-2 rounded-md cursor-pointer">
            <div className="flex items-center gap-3">
              <share.Icon size={36} round={true} />
              <p className="font-semibold">{share.buttonText}</p>
            </div>
            <ChevronRightIcon className="w-4 h-4 text-gray-600" />
          </div>
        </share.ShareButton>
      ))}
      <Button
        variant="ghost"
        className="hover:bg-gray-100 hover:scale-105 flex items-center justify-between transition-all duration-200 px-4 py-2 rounded-md cursor-pointer"
        onClick={shareProfile}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-[38px] h-[38px] rounded-full bg-gray-600">
            <ExternalLinkIcon className="h-5 w-5 text-white" />
          </div>
          <p className="font-semibold text-base">{t("moreOptions")}</p>
        </div>
        <ChevronRightIcon className="w-4 h-4 text-gray-600" />
      </Button>
      <div className="flex items-center justify-between p-4 border rounded-md">
        <div className="flex items-center gap-2">
          <LinkIcon className="h-5 w-5 text-gray-600" />
          <p className="font-semibold text-gray-600">
            leetcv/l/{resume?.handle}
          </p>
        </div>
        <Button variant="outline" onClick={() => handleCopy(shareUrl)}>
          {isCopied ? t("copied") : t("copy")}
        </Button>
      </div>
    </div>
  );
};

export default LeetShareLinks;
