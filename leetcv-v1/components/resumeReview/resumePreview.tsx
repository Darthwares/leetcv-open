import { ResumeView } from "@components/resumeView";
import ReusableHeader from "@components/reusableHeader";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import {
  profileResumeState,
  resumeExpectedSkills,
  resumeHeadlineCompletion,
  resumeIdeaSkillsNotFit,
  resumeIdeas,
  resumeJobDescription,
  resumePreviewState,
  resumeSkills,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

const ResumePreview = () => {
  const t = useTranslations("ResumeIdeas");
  const [resumePreview, setResumePreview] = useRecoilState(resumePreviewState);
  const setIdeas = useSetRecoilState(resumeIdeas);
  const [skills, setSkills] = useRecoilState(resumeSkills);
  const [errorMsg, setErrorMsg] = useRecoilState(resumeIdeaSkillsNotFit);
  const setJobDescription = useSetRecoilState(resumeJobDescription);
  const [expectedSkills, setExpectedSkills] =
    useRecoilState(resumeExpectedSkills);
  const setHeadlineCompletion = useSetRecoilState(resumeHeadlineCompletion);
  const [resume] = useRecoilState(profileResumeState);
  const totalSkills: number = expectedSkills.length;
  const matchingSkills = skills.length;
  const percentage = (matchingSkills / totalSkills) * 100;
  const mutation = trpc.useMutation(["fs.resume.update"]);
  const router = useRouter();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section id="preview">
      <div className="mt-5 w-full">
        {resumePreview && (
          <>
            <ReusableHeader>
              <div className="text-sm leading-6 text-gray-900 flex lg:justify-between justify-end gap-4 items-center w-full flex-wrap">
                <h2 className="text-xl md:text-2xl font-semibold">
                  {t("areYouSure")}
                </h2>
                <div className="flex gap-2.5 md:gap-4">
                  <button
                    type="button"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                    onClick={async () => {
                      try {
                        await mutation.mutateAsync(resume);
                        await router.push("/s/resume");
                      } catch (error) {
                        setErrorMsg(t("skillNotFitMsg"));
                      }
                    }}
                  >
                    {t("confirm")}
                  </button>

                  <button
                    type="button"
                    className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm "
                    onClick={() => {
                      scrollToTop();
                      setExpectedSkills([]);
                      setSkills([]);
                      setHeadlineCompletion("");
                      setJobDescription("");
                      setIdeas("");
                      setResumePreview(false);
                    }}
                  >
                    {t("cancel")}
                  </button>
                </div>
              </div>
            </ReusableHeader>
            {errorMsg && (
              <p className="text-red-500 text-sm font-semibold ml-1 mt-1 flex sm:items-center items-start gap-1.5">
                <ExclamationCircleIcon className="text-red-500 w-5 h-5" />
                {errorMsg}
              </p>
            )}
          </>
        )}
      </div>
      {resumePreview && <ResumeView />}
    </section>
  );
};

export default ResumePreview;
