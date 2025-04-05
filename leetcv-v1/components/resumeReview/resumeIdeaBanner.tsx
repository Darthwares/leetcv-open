import ReusableHeroBanner from "@components/reusableHeroBanner";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  resumeIdeas,
  resumeJobDescription,
  resumePreviewState,
} from "@state/state";

const ResumeIdeaBanner = () => {
  const t = useTranslations("ResumeIdeas");
  const [ideas, setIdeas] = useRecoilState(resumeIdeas);
  const setResumePreview = useSetRecoilState(resumePreviewState);
  const setJobDescription = useSetRecoilState(resumeJobDescription);

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  return (
    <div className="mt-6 lg:mt-0" data-testid="resumeIdeaBanner">
      <ReusableHeroBanner
        title={t("resumeSuggestions")}
        description={t("enhanceYourResume")}
        className="px-6 pt-6 pb-2 lg:gap-8 md:pt-8 md:pb-8 lg:pb-4 lg:pt-10 sm:py-8 sm:px-10 md:px-14"
        lottieImage={
          <div className="hidden lg:block lg:w-1/4 h-56 -mt-5">
            <lottie-player
              src="/assets/lottie/resume-ideas-2.json"
              background="transparent"
              speed="1"
              loop
              autoplay
            />
          </div>
        }
      />
      {ideas && (
        <div className="flex justify-end mt-5 -mb-2 mr-2">
          <button
            className="flex items-center gap-2 text-white hover:bg-indigo-600 font-medium rounded-lg transition-all duration-200 bg-indigo-500 text-sm px-2 sm:px-3 py-2.5 text-center"
            onClick={() => {
              setIdeas("");
              setResumePreview(false);
              setJobDescription("");
            }}
          >
            {t("createNew")}
            <PlusIcon className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeIdeaBanner;
