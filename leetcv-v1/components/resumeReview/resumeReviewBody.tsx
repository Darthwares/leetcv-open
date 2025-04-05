import React, { useEffect } from "react";
import {
  resumeExpectedSkills,
  resumeIconColor,
  resumeIdeas,
  resumeLoader,
  resumeMessage,
  resumePreviewState,
  resumeSkills,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ToastContainer } from "react-toastify";
import ResumeReviewTextContent from "./resumeReviewTextContent";
import ResumePreview from "./resumePreview";
import ResumeReviewIdeas from "./resumeReviewIdeas";
import { useTranslations } from "next-intl";

const ResumeReviewBody = () => {
  const [ideas] = useRecoilState(resumeIdeas);
  const [skills] = useRecoilState(resumeSkills);
  const [expectedSkills] = useRecoilState(resumeExpectedSkills);
  const [loader] = useRecoilState(resumeLoader);
  const setMessage = useSetRecoilState(resumeMessage);
  const [iconColor, setIconColor] = useRecoilState(resumeIconColor);
  const [resumePreview] = useRecoilState(resumePreviewState);
  const t = useTranslations("ResumeIdeas");

  const totalSkills: number = expectedSkills.length;
  const matchingSkills = skills.length;
  const percentage = (matchingSkills / totalSkills) * 100;

  useEffect(() => {
    let newMessage = "";
    let newIconColor = "";

    if (percentage < 50) {
      newMessage = t("improveResume");
      newIconColor = "text-red-500";
    } else if (percentage >= 50 && percentage < 100) {
      newMessage = t("goodFit");
      newIconColor = "text-yellow-500";
    } else {
      newMessage = t("youMatchCompletly");
      newIconColor = "text-green-500";
    }

    setMessage(newMessage);
    setIconColor(newIconColor);
  }, [percentage, iconColor, matchingSkills, totalSkills]);

  return (
    <div className="w-full">
      {!loader && !ideas && !resumePreview && <ResumeReviewTextContent />}
      {loader && !ideas && (
        <section
          id="loader"
          className="flex w-full items-center justify-center mt-4"
        >
          <div className="sm:px-6 lg:px-0 flex items-center justify-center border-none w-96">
            <div className="text-center w-full">
              <lottie-player
                src="/assets/lottie/ai.json"
                background="white"
                speed="1"
                loop
                autoplay
              />
              <p className="text-gray-900 font-medium animate-pulse">
                {t("generatingSuggestions")}...
              </p>
            </div>
          </div>
        </section>
      )}
      <ResumeReviewIdeas />
      <ResumePreview />
      <ToastContainer />
    </div>
  );
};

export default ResumeReviewBody;
