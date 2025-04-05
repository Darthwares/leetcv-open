import { SocialMedia } from "data/models/socialMedia";
import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { generateValidHref, setSocialMediaIcons } from "@constants/defaults";
import ResumeSectionHeader from "./resumeSectionHeader";

function SocialMediaLink() {
  const [profileResume] = useRecoilState(profileResumeState);
  const socialMediaLink = profileResume.socialMedia;
  const [selectedFont] = useRecoilState(resumeFontState);
  const t = useTranslations("SocialMedia");
  if (socialMediaLink?.length === 0) {
    return null;
  }

  return (
    <>
      {socialMediaLink?.length !== 0 && (
        <div data-testid={"social"}>
          {socialMediaLink?.some(
            (link) => link?.name && link?.socialMediaUrl
          ) && <ResumeSectionHeader title={t("social")} />}

          <div className="print:flex print:flex-col print:gap-1">
            {socialMediaLink?.map((social: SocialMedia, id: number) => {
              if (social.name && social.socialMediaUrl) {
                return (
                  <div
                    key={id}
                    className={`${
                      id !== socialMediaLink.length - 1 &&
                      "border-dotted border-b border-gray-200"
                    } flex w-full mt-2 flex-col`}
                  >
                    <div className="text-left w-full mb-1">
                      <div className="flex flex-col w-full space-y-1 pl-4 pb-2">
                        <div
                          className={`${selectedFont.className} flex items-center gap-2 lg:text-gray-600 w-full bg-white text-sm`}
                          data-testid={`socialLink-${id}`}
                        >
                          <img
                            src={setSocialMediaIcons(
                              social.name.trim().toLowerCase()
                            )}
                            alt={`social-icons-${id}`}
                            className="w-6 h-6 print:w-5 print:h-5 rounded-full"
                          />
                          <a
                            href={generateValidHref(social?.socialMediaUrl)}
                            className={`${selectedFont.className} flex items-start gap-2 lg:text-gray-600 w-full bg-white rounded-lg hover:text-blue-600 cursor-pointer text-sm`}
                            data-testid={`socialLink-${id}`}
                            title={social.socialMediaUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {social.name}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </>
  );
}

export default SocialMediaLink;
