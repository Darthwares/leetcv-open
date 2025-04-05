import React, { useEffect, useState } from "react";
import {
  leetLinkSocialMediaState,
  profileResumeState,
  resumeState,
} from "@state/state";
import { useRecoilState } from "recoil";
import { Card, CardHeader, CardTitle } from "shadcn/components/ui/card";
import { Switch } from "@headlessui/react";
import { classNames } from "@utils/classNames";
import { useTranslations } from "next-intl";
import { PencilIcon } from "@heroicons/react/outline";
import { SocialIcon } from "react-social-icons";
import { useAutoSave } from "@lib/helper/useAutoSave";
import { trpc } from "@utils/trpc";
import { SocialMediaState } from "data/models/LeetLink";
import { isUrlValid } from "@constants/defaults";

const SocialMediaWithToggle = () => {
  const t = useTranslations("LeetLink");
  const [resume, setResume] = useRecoilState(resumeState);
  const [profileResume, setProfileResume] = useRecoilState(profileResumeState);
  const [socialMediaWithToggle, setSocialMediaWithToggle] = useRecoilState<
    SocialMediaState[]
  >(leetLinkSocialMediaState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errorMessages, setErrorMessages] = useState<{ [key: string]: string }>(
    {}
  );
  const { handleAutoSave } = useAutoSave();
  const updateSocialLinksMutation = trpc.useMutation([
    "fs.leetLink.updateSocialLinks",
  ]);

  useEffect(() => {
    handleAutoSave();
  }, [resume]);

  useEffect(() => {
    if (profileResume.socialMedia) {
      const profileSocialIds = profileResume.socialMedia.map(
        (social) => social.id
      );

      const updatedSocialMediaWithToggle = socialMediaWithToggle.filter(
        (social) => profileSocialIds.includes(social.id)
      );

      const newSocialMedia = profileResume.socialMedia.filter(
        (social) =>
          !updatedSocialMediaWithToggle.some(
            (toggle) => toggle.id === social.id
          )
      );

      const finalUpdatedSocialMedia = [
        ...updatedSocialMediaWithToggle,
        ...newSocialMedia.map((social) => ({ ...social, show: true })),
      ];

      setSocialMediaWithToggle(finalUpdatedSocialMedia);
    }
  }, [profileResume]);

  useEffect(() => {
    const handler = setTimeout(() => {
      updateSocialLinksMutation.mutate({
        id: resume.id,
        socialLinks: socialMediaWithToggle,
      });
    }, 2500);
    return () => {
      clearTimeout(handler);
    };
  }, [socialMediaWithToggle]);

  const toggleSocialMediaShow = (id: string) => {
    setSocialMediaWithToggle((prev: SocialMediaState[]) =>
      prev.map((social) =>
        social.id === id ? { ...social, show: !social.show } : social
      )
    );
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    socialId: string
  ) => {
    const { value } = e.target;
    const trimmedValue = value.trim();

    if (!isUrlValid(trimmedValue) || trimmedValue === "") {
      setErrorMessages((prev) => ({ ...prev, [socialId]: t("enterValidUrl") }));
      return;
    }

    setErrorMessages((prev) => ({ ...prev, [socialId]: "" }));

    const updateSocialMedia = (socials: any[], field: string) =>
      socials.map((social) =>
        social.id === socialId ? { ...social, [field]: trimmedValue } : social
      );

    setProfileResume((prev) => ({
      ...prev,
      socialMedia: updateSocialMedia(prev.socialMedia!, "socialMediaUrl"),
    }));
    setResume((prev) => ({
      ...prev,
      socialMedia: updateSocialMedia(prev.socialMedia!, "socialMediaUrl"),
    }));
    setSocialMediaWithToggle((prev) =>
      updateSocialMedia(prev, "socialMediaUrl")
    );
    setEditingId(null);
  };

  const handleEditClick = (socialId: string) => {
    setEditingId(socialId);
  };

  return (
    <>
      {socialMediaWithToggle.length > 0 && (
        <>
          <div className="space-y-2">
            <CardTitle className="pt-4">{t("socialMedia")}</CardTitle>
            <p className="text-gray-500 text-sm">
              {t("socialMediaDescription")}
            </p>
          </div>
          <Card className="w-full">
            <CardHeader className="py-5 px-4 lg:p-6">
              <div className="flex flex-col gap-3 w-full">
                {socialMediaWithToggle.map((social: SocialMediaState) => (
                  <div
                    key={social.id}
                    className="flex flex-col gap-y-2.5 sm:flex-row sm:justify-between py-2"
                  >
                    <div className="flex flex-col md:flex-row gap-2.5">
                      <div className="flex items-center md:items-start gap-2.5">
                        <SocialIcon
                          network={social.name!.toLowerCase()}
                          style={{ height: "30px", width: "30px" }}
                        />
                        <CardTitle className="text-base capitalize md:hidden">
                          {social.name}
                        </CardTitle>
                      </div>
                      <div>
                        <CardTitle className="text-base capitalize hidden md:block">
                          {social.name}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          {editingId === social.id ? (
                            <input
                              type="text"
                              id="socialMediaUrl"
                              defaultValue={social.socialMediaUrl}
                              onBlur={(e) => handleBlur(e, social.id)}
                              className="border border-gray-300 rounded px-2 py-1 mt-1"
                              autoFocus
                            />
                          ) : (
                            <>
                              <p className="text-sm text-gray-500 line-clamp-1 w-[90%] md:w-full">
                                {social.socialMediaUrl}
                              </p>
                              <PencilIcon
                                className="w-4 h-4 text-gray-500 cursor-pointer"
                                onClick={() => handleEditClick(social.id)}
                              />
                            </>
                          )}
                        </div>
                        {errorMessages[social.id] && (
                          <p className="text-xs pt-1 pl-1 font-medium text-red-500">
                            {errorMessages[social.id]}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch.Group
                        as="div"
                        className="flex items-center gap-x-1.5 gap-y-1"
                      >
                        <Switch.Label as="span" className="text-sm">
                          <span className="font-medium sm:block text-gray-600">
                            {social.show ? t("show") : t("hide")}
                          </span>
                        </Switch.Label>
                        <Switch
                          checked={social.show}
                          onChange={() => toggleSocialMediaShow(social.id)}
                          className={classNames(
                            social.show ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              social.show ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                            )}
                          />
                        </Switch>
                      </Switch.Group>
                    </div>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        </>
      )}
    </>
  );
};

export default SocialMediaWithToggle;
