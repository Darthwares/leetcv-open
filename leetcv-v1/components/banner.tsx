import React, { useState } from "react";
import { useRouter } from "next/router";
import { useProgressPercent } from "@utils/progressPercent";
import { useTranslations } from "next-intl";
import { SvgClose, SvgInfo } from "./svgGrid";
import { trpc } from "@utils/trpc";
import {
  aiReviewText,
  openAiReviewSidebarState,
  openProjectIdeasSidebarState,
  resumeState,
  showLoadingState,
  subscriptionPlanState,
  tokenCountState,
} from "@state/state";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toast } from "react-toastify";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("Banner");
  const tP = useTranslations("PersonalSection");
  const tProject = useTranslations("ProjectData");
  const router = useRouter();
  const { result } = useProgressPercent();
  const setOpen = useSetRecoilState(openAiReviewSidebarState);
  const [userInfo] = useRecoilState(resumeState);
  const setLoading = useSetRecoilState(showLoadingState);
  const setAIReviewText = useSetRecoilState(aiReviewText);
  const [tokens] = useRecoilState(tokenCountState);
  const [plan] = useRecoilState(subscriptionPlanState);
  const [openSidebar, setOpenSidebar] = useRecoilState(
    openProjectIdeasSidebarState
  );
  const setAiReview = trpc.useMutation(["fs.aiReview.create"]);

  const { data: aiReview, refetch } = trpc.useQuery([
    "fs.aiReview.getAiReviews",
    { id: userInfo.id },
  ]);

  const { data: projectIdeas } = trpc.useQuery([
    "fs.projectIdeas.getProjectIdeas",
    { id: userInfo.id },
  ]);

  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);

  const handleCheck = async () => {
    try {
      if (aiReview) {
        return;
      }
      setLoading(true);
      const resp = await fetch("/api/openai/getAIReview", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo: userInfo,
        }),
      });
      const response = await resp.json();
      setAIReviewText(response?.aiReview!);
      setLoading(false);
      let newTokenCount = tokens - 350;

      setTokens.mutate(
        {
          count: newTokenCount,
          handle: userInfo.handle,
        },
        {
          onSuccess: () => {
            refetch();
          },
        }
      );

      if (response?.aiReview!) {
        return setAiReview.mutate(
          {
            id: userInfo.id,
            review: response?.aiReview,
          },
          {
            onSuccess: () => {
              refetch();
            },
          }
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleProjectIdeasCheck = () => {
    if (!projectIdeas && tokens < 500) {
      toast.error(tProject("notEnoughToken"));
      return;
    }
    setOpenSidebar(true);
  };

  const renderProjectIdeas = () => (
    <>
      <span>{t("orGetA")}</span>
      <a
        className="font-semibold  underline hover:no-underline items-center ml-2 cursor-pointer text-center"
        data-testid="link"
        onClick={handleProjectIdeasCheck}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleProjectIdeasCheck();
          }
        }}
        role="button"
        tabIndex={0}
      >
        {tProject("projectIdeas")}
      </a>
    </>
  );

  return (
    <div
      className="grid gap-2 relative top-3 md:top-4 w-full print:hidden"
      data-testid="banner"
    >
      {isVisible && result < 100 && (
        <div
          className="flex p-4 mb-4 text-indigo-800 rounded-lg bg-indigo-50"
          role="alert"
          data-testid="alert"
        >
          <SvgInfo />
          <span className="sr-only">{t("info")}</span>
          <div
            className="ml-3 text-base block space-x-2"
            data-testid="description"
          >
            <span>
              {t("resumeCreation")}
              <strong className="animate-none"> {result}%</strong>{" "}
              {t("investAFewMinutes")}
            </span>
            <a
              className="font-semibold underline hover:no-underline inline-flex items-center ml-2 cursor-pointer text-center"
              data-testid="link"
              onClick={() => {
                router.push("/s/resumeEditor");
              }}
            >
              {t("clickToEdit")}
              <span data-testid="svg">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </a>
            {plan === "Pro" && (
              <>
                <span>{t("orGet")}</span>
                <a
                  className="font-semibold  underline hover:no-underline  inline-flex items-center ml-2 cursor-pointer text-center"
                  data-testid="link"
                  onClick={() => {
                    setOpen(true);
                    handleCheck();
                  }}
                >
                  {t("aIReview")}
                </a>
              </>
            )}
            {userInfo.projects.length === 0  &&
              renderProjectIdeas()}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-indigo-50 text-indigo-500 rounded-lg focus:ring-2 focus:ring-indigo-400 p-1.5 hover:bg-indigo-200 inline-flex h-8 w-8"
            data-testid="closeButton"
            onClick={() => setIsVisible(false)}
          >
            <span className="sr-only">{t("close")}</span>
            <SvgClose />
          </button>
        </div>
      )}
      {result === 100 && (
        <div
          className="flex p-4 mb-4 text-indigo-800 rounded-lg bg-indigo-50"
          role="alert"
          data-testid="congratulation"
        >
          <SvgInfo />
          <span className="sr-only">{t("info")}</span>
          <div className="ml-3 text-base block space-x-2">
            <div className="w-full inline-flex">
              <span className="">
                {tP("congratulation")}
                <strong className="animate-none">
                  {result}% {tP("completed")}
                </strong>
                {result === 100 && plan !== "" && <>👏 {t("get")}</>}
                {plan !== "" && (
                  <a
                    className="font-semibold max-w-fit underline hover:no-underline inline-flex items-center ml-2 cursor-pointer text-center"
                    onClick={() => {
                      setOpen(true);
                      handleCheck();
                    }}
                  >
                    {t("aIReview")}
                  </a>
                )}
                {userInfo.projects.length === 0  &&
                  renderProjectIdeas()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Banner;
