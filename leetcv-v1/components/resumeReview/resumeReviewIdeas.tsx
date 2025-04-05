import {
  profileResumeState,
  resumeState,
  resumeExpectedSkills,
  resumeExpectedYoE,
  resumeHeadlineCompletion,
  resumeIconColor,
  resumeIdeas,
  resumeJobPosition,
  resumeMessage,
  resumePreviewState,
  resumeSkills,
  resumeIdeaSkillsNotFit,
} from "@state/state";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import ReusableFeed from "./reusableFeed";
import MarkdownWithTextColor from "@components/markdownWithTextColor";
import Skills from "@components/skills";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { useTranslations } from "next-intl";

const ResumeReviewIdeas = () => {
  const [ideas, setIdeas] = useRecoilState(resumeIdeas);
  const [expectedSkills] = useRecoilState(resumeExpectedSkills);
  const [skills] = useRecoilState(resumeSkills);
  const [headlineCompletion] = useRecoilState(resumeHeadlineCompletion);
  const [jobPosition] = useRecoilState(resumeJobPosition);
  const [expectedYoE] = useRecoilState(resumeExpectedYoE);
  const [iconColor] = useRecoilState(resumeIconColor);
  const [resumePreview, setResumePreview] = useRecoilState(resumePreviewState);
  const [userInfo] = useRecoilState(resumeState);
  const t = useTranslations("ResumeIdeas");
  const setResume = useSetRecoilState(profileResumeState);
  const [message] = useRecoilState(resumeMessage);
  const setErrorMsg = useSetRecoilState(resumeIdeaSkillsNotFit);

  const scrollToTop = () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  const handlePreview = () => {
    setResumePreview(!resumePreview);
    setIdeas("");
    scrollToTop();
    setErrorMsg("");
    if (userInfo) {
      const updatedSkillsSet = new Set([...expectedSkills, ...skills]);
      const updatedSkills = Array.from(updatedSkillsSet);
      setResume({
        ...userInfo,
        description: headlineCompletion,
        skills: updatedSkills,
        yearOfExperience: expectedYoE[0],
        position: jobPosition,
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-start w-full lg:gap-4">
      <div>
        {ideas && (
          <ReusableFeed title={t("resumeIdeas")}>
            <div className="lg:max-w-2xl border border-gray-300 rounded-md py-4 px-6">
              <MarkdownWithTextColor content={ideas} />
            </div>
          </ReusableFeed>
        )}
      </div>
      {ideas && (
        <div className="w-full -mt-5 lg:mt-0 lg:max-w-lg">
          {expectedSkills.length > 0 && (
            <ReusableFeed title="Expected Skills">
              <Skills skills={[...new Set(expectedSkills)]} />
            </ReusableFeed>
          )}
          {skills.length > 0 && (
            <ReusableFeed title={t("commonSkills")}>
              <Skills skills={[...new Set(skills)]} />
            </ReusableFeed>
          )}

          {headlineCompletion && (
            <>
              <ReusableFeed title={t("headline")}>
                <p>{headlineCompletion}</p>
              </ReusableFeed>

              <ReusableFeed title={t("jobPosition")}>
                <p>{jobPosition}</p>
              </ReusableFeed>

              <ReusableFeed title={t("yearsOfExperience")}>
                <p>
                  {expectedYoE[0]}
                  {expectedYoE.length > 1 && expectedYoE[1] !== "0" && (
                    <span> - {expectedYoE[1]}</span>
                  )}{" "}
                  {t("years")}
                </p>
              </ReusableFeed>

              <div className="flex gap-2 items-start">
                <div>
                  <CheckCircleIcon
                    className={`w-5 h-5 ${iconColor} relative top-0.5`}
                  />
                </div>
                <p>
                  {skills.length} {t("of")} {expectedSkills.length}{" "}
                  {t("skillsMatch")} - {message}
                </p>
              </div>

              <div>
                <ReusableFeed title="Preview Updated Resume">
                  {headlineCompletion && (
                    <div className="mt-4">
                      <button
                        className="bg-indigo-500 text-white text-sm py-2 px-4 rounded-md"
                        onClick={handlePreview}
                      >
                        {t("previewResume")}
                      </button>
                    </div>
                  )}
                </ReusableFeed>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeReviewIdeas;
