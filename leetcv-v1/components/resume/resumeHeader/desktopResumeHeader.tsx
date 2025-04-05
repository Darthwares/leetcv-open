import {
  aiReviewText,
  openAiReviewSidebarState,
  profileResumeState,
  resumeBannerColorState,
  resumeFontState,
  resumeState,
  showLoadingState,
  tokenCountState,
} from "@state/state";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { ResumeHeaderDetails } from "./resumeHeaderDetails";
import { compareStartYearsAndMonthsDesc } from "@constants/defaults";
import ReusableSidebar from "@components/reusableSideBar";
import { useRecoilState } from "recoil";
import { convertFromRaw, EditorState } from "draft-js";
import { markdownToDraft } from "markdown-draft-js";
import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { trpc } from "@utils/trpc";
import { useTranslations } from "next-intl";
import { fetchPostJSON } from "@lib/stripe/helper";
import ReusableImage from "@components/reusableImage";
import { useSession } from "next-auth/react";
import ToggleQrCode from "@components/toggleQrcode";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const DesktopResumeHeader = () => {
  const { status } = useSession();
  const [resume] = useRecoilState(profileResumeState);
  const qrValue = `${window?.origin}/r/${resume?.handle}`;
  const [userInfo] = useRecoilState(resumeState);
  const [loading, setLoading] = useRecoilState(showLoadingState);
  const [text, setText] = useRecoilState(aiReviewText);
  const [tokens] = useRecoilState(tokenCountState);
  const t = useTranslations("DesktopResumeHeader");
  const [openAiSidebar, setOpenAiSidebar] = useRecoilState(
    openAiReviewSidebarState
  );
  const [profileResume] = useRecoilState(profileResumeState);
  const experiences = profileResume.experiences;
  const [impactEditorStates, setImpactEditorStates] = useState<EditorState[]>(
    []
  );
  const [showQR, setShowQR] = useState(false);
  const shouldShowButton = !resume.hiddenImage && !resume.hiddenQrCode;
  const [font] = useRecoilState(resumeFontState);
  const [selectedBannerColor] = useRecoilState(resumeBannerColorState);

  const setAiReview = trpc.useMutation(["fs.aiReview.create"]);
  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);

  const { data: aiReview, refetch } = trpc.useQuery(
    ["fs.aiReview.getAiReviews", { id: userInfo.id }],
    {
      enabled: status === "authenticated",
    }
  );

  const sortedExperiences = experiences ? [...experiences] : [];
  if (sortedExperiences.length > 0) {
    sortedExperiences.sort(compareStartYearsAndMonthsDesc);
  }
  useEffect(() => {
    if (resume.hiddenImage && !resume.hiddenQrCode) {
      setShowQR(true);
    } else {
      setShowQR(false);
    }
  }, [resume]);

  const handleCheck = async () => {
    try {
      setLoading(true);
      const response = await fetchPostJSON("/api/openai/getAIReview", {
        userInfo: userInfo,
      });

      setText(response.aiReview);
      setLoading(false);

      let newTokenCount = tokens - 350;

      setTokens.mutate(
        {
          count: newTokenCount,
          handle: resume.handle,
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

  useEffect(() => {
    const newImpactStates: EditorState[] = [];
    const impactData = markdownToDraft(aiReview ?? text);
    const impactContent = convertFromRaw(impactData);
    newImpactStates.push(EditorState.createWithContent(impactContent));
    setImpactEditorStates(newImpactStates);
  }, [text, aiReview]);

  return (
    <div className="hidden md:block print:block print:mt-0">
      {!resume.hiddenImage && (
        <div className="flex justify-center relative lg:hidden md:mb-3 print:hidden">
          <div className={`h-36 w-full ${selectedBannerColor}`} />

          <ReusableImage
            src={resume.image!}
            className="object-cover h-32 w-32 rounded-full absolute top-2 text-white text-5xl"
            displayName={resume.displayName}
          />
        </div>
      )}
      <div
        className={`hidden print:flex ${
          resume.image !== resume.displayName
            ? "print:items-center"
            : "print:items-stretch"
        } print:justify-between`}
      >
        <div
          className={`hidden print:flex ${
            resume.image !== resume.displayName
              ? "print:items-center"
              : "print:items-stretch"
          } gap-6`}
        >
          {!resume.hiddenImage && (
            <ReusableImage
              src={resume.image!}
              className="rounded-lg object-cover h-[90%] w-32 text-white text-5xl"
              displayName={resume.displayName}
            />
          )}
          <div className="print:relative print:-top-[1.25rem]">
            <ResumeHeaderDetails />
          </div>
        </div>
        {!resume?.hiddenQrCode && (
          <div className="hidden md:block print:block">
            <div className="md:flex justify-center h-full pb-4 print:pb-0 print:-mt-1 hidden print:block">
              <QRCode
                qrStyle="dots"
                value={qrValue}
                // size={150}
                style={{
                  height: "100%", 
                }}
              />
            </div>
          </div>
        )}
      </div>
      <div className={` pt-2 relative lg:top-0 print:-top-3`}>
        <div className="flex print:hidden justify-between gap-4 md:gap-10 md:flex-row flex-col-reverse ">
          {(!resume.hiddenImage || !resume.hiddenQrCode) && (
            <div className="hidden justify-center lg:flex flex-col md:mb-3">
              {showQR ? (
                <div className="rounded-lg relative left-3 object-cover w-40 h-40">
                  <QRCode qrStyle="dots" value={qrValue} size={145} />
                </div>
              ) : (
                <ReusableImage
                  src={resume.image!}
                  className="rounded-lg relative left-3 object-cover w-40 h-40 text-white text-[5.5rem]"
                  displayName={resume.displayName}
                />
              )}
              {shouldShowButton &&
                location.pathname !== "/s/aiResume" &&
                location.pathname !== "/s/resumeIdeas" &&
                location.pathname !== "/s/convert" && (
                  <div className="flex mt-2.5 justify-center relative left-3 items-center print:hidden">
                    <ToggleQrCode showQR={showQR} setShowQR={setShowQR} />
                  </div>
                )}
            </div>
          )}
          <div className="w-full print:hidden md:block flex items-center -mt-[3px] print:-mt-2 justify-center flex-col">
            <ResumeHeaderDetails />
          </div>
        </div>
      </div>
      <div className={`my-1.5`}>
        {resume?.description && (
          <p
            className={`${font.className} md:pl-3 py-1 print:-mt-5 justify-center print:leading-5 lg:justify-start callout-bg text-base print:text-sm text-gray-700 rounded-md px-3`}
          >
            {resume?.description}
          </p>
        )}
      </div>
      <ReusableSidebar
        open={openAiSidebar}
        setOpen={setOpenAiSidebar}
        title={t("aiReviewTitle")}
        description={t("aiReviewDescription")}
        cssClass="fixed top-0 z-50 w-full"
        aiReview={true}
      >
        {loading && (
          <div className="max-w-lg min-h-screen flex items-center justify-center">
            <div className="w-60 flex flex-col justify-center items-center">
              <lottie-player
                src="/assets/lottie/ai.json"
                background="white"
                speed="1"
                loop
                autoplay
              />
              <p className="text-sm text-gray-500 ml-4">
                {t("generatingTips")}
              </p>
            </div>
          </div>
        )}
        {!loading && (
          <div className="-mb-12 w-full mt-4 md:mt-0 relative">
            <span className="text-base text-gray-700 fontSize font-normal px-5 editor experience-editor">
              <Editor editorState={impactEditorStates[0]} readOnly />
            </span>
          </div>
        )}
        <div className="flex sticky z-40 bottom-0 bg-white flex-shrink-0 justify-between px-6 py-4">
          {!loading && (aiReview || text) && (
            <button
              type="button"
              className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 w-32"
              onClick={() => {
                setText("");
                handleCheck();
                setOpenAiSidebar(true);
              }}
            >
              {t("reCheck")}
            </button>
          )}
        </div>
      </ReusableSidebar>
    </div>
  );
};
export default DesktopResumeHeader;
