import { generateValidHref, setSocialMediaIcon } from "@constants/defaults";
import { leetLinkSocialMediaState } from "@state/state";
import { SocialMediaState, ThemeState } from "data/models/LeetLink";
import React from "react";
import { useRecoilState } from "recoil";

type LeetUiSocialMediaProps = {
  theme: ThemeState;
};

const LeetUiSocialMedia = ({ theme }: LeetUiSocialMediaProps) => {
  const [socialMediaWithToggle] = useRecoilState<SocialMediaState[]>(
    leetLinkSocialMediaState
  );

  return (
    <div className="flex gap-3 flex-wrap justify-center pt-5">
      {socialMediaWithToggle
        ?.filter((social) => social.show)
        .map((social) => {
          return (
            <a
              key={social.id}
              href={generateValidHref(social?.socialMediaUrl!)}
              className={`flex items-center gap-2 rounded-lg cursor-pointer hover:scale-105 transition-all duration-75 text-sm`}
              title={social.socialMediaUrl}
              rel="noreferrer"
              target="_blank"
            >
              <div
                className={`circle w-9 h-9 rounded-full p-1 flex justify-center items-center overflow-hidden border ${theme?.socialIconColor} transition-colors duration-300 ease-in-out`}
              >
                {React.createElement(
                  setSocialMediaIcon(social.name!.trim().toLowerCase())
                )}
                {theme?.id === 1 && <span className="wave"></span>}
              </div>
            </a>
          );
        })}
    </div>
  );
};

export default LeetUiSocialMedia;
