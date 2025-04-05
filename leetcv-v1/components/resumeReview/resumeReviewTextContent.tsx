import React, { useState } from "react";
import { Tab } from "@headlessui/react";
import {
  resumeState,
  resumeExpectedSkills,
  resumeExpectedYoE,
  resumeHeadlineCompletion,
  resumeIdeas,
  resumeJobDescription,
  resumeJobPosition,
  resumeLoader,
  resumePreviewState,
  resumeSkills,
  tokenCountState,
  sideBarOpenState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";
import ReusableVideoCard from "@components/reusableVideoCard";
import useManageToken from "@lib/helper/useManageToken";

const ResumeReviewTextContent = () => {
  const [jobDescription, setJobDescription] =
    useRecoilState(resumeJobDescription);
  const [userInfo] = useRecoilState(resumeState);
  const setIdeas = useSetRecoilState(resumeIdeas);
  const setSkills = useSetRecoilState(resumeSkills);
  const t = useTranslations("ResumeIdeas");
  const setExpectedSkills = useSetRecoilState(resumeExpectedSkills);
  const setLoader = useSetRecoilState(resumeLoader);
  const setHeadlineCompletion = useSetRecoilState(resumeHeadlineCompletion);
  const setExpectedYoE = useSetRecoilState(resumeExpectedYoE);
  const setJobPosition = useSetRecoilState(resumeJobPosition);
  const setResumePreview = useSetRecoilState(resumePreviewState);
  const [tokens] = useRecoilState(tokenCountState);
  const [errorMsg, setErrorMsg] = useState("");
  const isLgDevice = window.innerWidth >= 1024;
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const { deductToken } = useManageToken();

  const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (tokens < 600) {
      toast.error(t("insufficientTokens"));
      return;
    }
    setExpectedSkills([]);
    setSkills([]);
    setHeadlineCompletion("");
    setResumePreview(false);
    if (!jobDescription.trim()) {
      return setErrorMsg(t("enterDescription"));
    }

    if (jobDescription.length < 300) {
      return setErrorMsg(t("descriptionError"));
    }

    setLoader(true);
    setIdeas("");

    try {
      const resp = await fetch("/api/openai/resumeIdeas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo: userInfo,
          jobDescription,
        }),
      });
      const response = await resp.json();
      setLoader(false);
      setIdeas(response?.ideas);
      setHeadlineCompletion(response?.headlineCompletion);
      setJobPosition(response?.jobTitle);

      const stringWithDoubleQuotes = response?.skillCompletion.replace(
        /'/g,
        '"'
      );
      const resultArray = JSON.parse(stringWithDoubleQuotes) || [];
      setExpectedSkills(resultArray);

      const stringedYoE = response?.yoeCompletion.replace(/'/g, '"');
      const resultYoEArray = JSON.parse(stringedYoE) || [];
      setExpectedYoE(resultYoEArray);

      const findCommonSkills = () => {
        const lowerCaseResultArray = resultArray?.map((skill: string) =>
          skill.toLowerCase()
        );
        const lowerCaseResumeSkills = userInfo.skills?.map((skill) =>
          skill.toLowerCase()
        );
        return lowerCaseResultArray?.filter((skill: string) =>
          lowerCaseResumeSkills?.includes(skill)
        );
      };

      const commonSkills = findCommonSkills();
      setSkills(commonSkills);
      deductToken(600);
    } catch (error) {
      console.error("Error in onSubmit:", error);
      setLoader(false);
    }
  };
  return (
    <div
      className={`flex flex-col ${
        isSideBarClosed ? "lg:flex-row" : "lg:flex-col"
      } w-full xl:flex-row justify-between items-center lg:items-start gap-8 mt-4 lg:mt-8`}
    >
      <div
        className={`w-full ${
          isSideBarClosed ? "lg:w-[45%]" : "lg:w-full"
        } xl:w-[40%]`}
      >
        <ReusableVideoCard
          src="https://www.youtube.com/embed/xF5kPZuzli8?si=ijp_HmnU_xFtvonr?autoplay=1&mute=1"
          title={t("videoCardTitle")}
        />
      </div>
      <form
        className={`flex ${
          isSideBarClosed ? "lg:w-[55%]" : "lg:w-full"
        } flex-col w-full xl:w-[60%]`}
        onSubmit={handleFormSubmit}
      >
        <Tab.Group>
          {() => (
            <>
              <Tab.List className="flex items-center">
                <Tab
                  className={
                    "rounded-md border border-transparent px-3 py-1.5 font-semibold bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }
                >
                  {t("enterJobDescription")}
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-2">
                <Tab.Panel className="-m-0.5 rounded-lg p-0.5">
                  <div className={`flex flex-col w-full`}>
                    <textarea
                      rows={isLgDevice ? 14 : 10}
                      name="comment"
                      onChange={(e) => setJobDescription(e.target.value)}
                      id="comment"
                      className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder={t("addDescription")}
                    />
                    <p className="text-red-500 text-sm font-semibold ml-1 mt-1">
                      {errorMsg}
                    </p>
                    <div className="mt-2 flex justify-end">
                      <a href="#loader">
                        <button
                          type="submit"
                          className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 z-50"
                        >
                          {t("preview")}
                        </button>
                      </a>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </>
          )}
        </Tab.Group>
      </form>
    </div>
  );
};

export default ResumeReviewTextContent;
