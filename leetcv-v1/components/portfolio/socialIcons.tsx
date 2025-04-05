import React from "react";
import { profileResumeState } from "@state/state";
import { useRecoilState } from "recoil";
import { SocialMedia } from "data/models/socialMedia";
import { generateValidHref, setSocialMediaIcon } from "@constants/defaults";

const SocialIcons = () => {
  const [resume] = useRecoilState(profileResumeState);
  const socialMediaLink = resume.socialMedia;

  return (
    <div className="flex gap-x-2 md:gap-x-4 xl:gap-x-6 gap-y-5 mt-10 max-w-md flex-wrap">
      {socialMediaLink?.map((social: SocialMedia, id: number) => {
        if (social.name && social.socialMediaUrl) {
          return (
            <a
              key={id}
              href={generateValidHref(social?.socialMediaUrl)}
              className={`flex flex-col items-center hover:text-indigo-600 cursor-pointer text-sm`}
              data-testid={`socialLink-${id}`}
              title={social.socialMediaUrl}
              rel="noreferrer"
              target="_blank"
            >
              <div className="circle w-9 h-9 rounded-full p-1 flex justify-center items-center overflow-hidden border border-indigo-600 text-indigo-600 transition-colors duration-300 delay-500 ease-in-out hover:text-white">
                {React.createElement(
                  setSocialMediaIcon(social.name.trim().toLowerCase())
                )}
                <span className="wave"></span>
              </div>
              <span className="w-16 break-words print:w-full text-xs mt-1 text-center capitalize">
                {social.name}
              </span>
            </a>
          );
        }
      })}
    </div>
  );
};
export default SocialIcons;
