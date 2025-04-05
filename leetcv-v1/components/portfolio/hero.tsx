import { DocumentTextIcon } from "@heroicons/react/outline";
import React from "react";
import { Typewriter } from "react-simple-typewriter";
import { profileResumeState } from "@state/state";
import { useRecoilState } from "recoil";
import { checkValidUrl } from "@constants/defaults";
import SocialIcons from "./socialIcons";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";

const Hero = () => {
  const [resume] = useRecoilState(profileResumeState);
  const t = useTranslations("Portfolio");
  const router = useRouter();
  const { handle } = router.query;

  const handleButtonClick = () => {
    if (location.pathname.match(/^\/p\/.+/)) {
      router.push(`/r/${handle}`);
    } else {
      router.push("/s/resume");
    }
  };

  const renderImage = (
    imageUrl: string,
    altText: string,
    classname: string
  ) => (
    <img
      src={
        !resume.hiddenImage && checkValidUrl(imageUrl)
          ? imageUrl
          : "/assets/fallbackProfile.jpg"
      }
      alt={altText}
      className={`object-cover h-full ${classname} hover:border-[#8750f7]`}
    />
  );

  return (
    <div className="flex w-full justify-evenly gap-10">
      <div className="max-w-full lg:max-w-none">
        <div className="max-w-full lg:max-w-lg">
          <p className="break-words text-wrap text-xl md:text-4xl mb-2.5 font-bold">
            {t("iam")} {resume.displayName}
          </p>
          {resume.position && (
            <p className="text-wrap py-1 text-2xl md:text-6xl break-words bg-gradient-to-r from-indigo-500 to-indigo-800 bg-clip-text text-transparent font-bold">
              <Typewriter words={[resume.position]} />
            </p>
          )}
        </div>

        <div className="hero-image-box lg:hidden justify-center flex text-center h-56 md:h-72 my-4 md:my-10">
          {renderImage(resume.image ?? "", resume.displayName, "")}
        </div>
        <p className="lg:max-w-lg w-full text-lg pt-3 lg:pt-4 xl:line-clamp-6">
          {resume.description}
        </p>
        <div className="flex flex-col flex-wrap mt-10 items-start ">
          <button
            className="rounded-full px-8 py-4 text-sm font-semibold text-indigo-600 border border-indigo-600 flex items-center justify-center gap-x-2 transition-all duration-300 ease-in-out hover:bg-indigo-600 hover:text-white dark:bg-gray-700 dark:text-white"
            onClick={handleButtonClick}
          >
            <span>{t("viewResume")}</span>
            <DocumentTextIcon className="h-5 w-5" aria-hidden="true" />
          </button>
          <SocialIcons />
        </div>
      </div>
      <div className="hidden lg:block">
        <div className="hero-image-box text-center h-96 w-96">
          {renderImage(resume.image ?? "", resume.displayName, "w-full")}
        </div>
      </div>
    </div>
  );
};

export default Hero;
