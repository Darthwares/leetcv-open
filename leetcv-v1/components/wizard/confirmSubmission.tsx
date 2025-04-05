import { aiGeneratedResume } from "@constants/defaults";
import Header from "@components/header";
import {
  cleanState,
  confirmSubmissionState,
  hideMarqueeState,
  newSelectedSkillState,
  publicExperienceState,
  publicPreviewState,
  selectedSkillState,
  skillSetState,
  tokenCountState,
  useVideoState,
} from "@state/state";
import { trpc } from "@utils/trpc";
import { signIn, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { useWizard } from "react-use-wizard";
import { useRecoilState, useSetRecoilState } from "recoil";

export default function ConfirmSubmission() {
  const { status } = useSession();
  const router = useRouter();
  const [cleanResume] = useRecoilState(cleanState);
  const [resume, setResume] = useRecoilState(publicPreviewState);
  const setConfirmDialog = useSetRecoilState(confirmSubmissionState);
  const setNewSelectedList = useSetRecoilState(selectedSkillState);
  const setAddedSkills = useSetRecoilState(newSelectedSkillState);
  const setHideMarquee = useSetRecoilState(hideMarqueeState);
  const t = useTranslations("Wizard");
  const { goToStep } = useWizard();
  const setInputBox = useSetRecoilState(publicExperienceState);
  const [tokens] = useRecoilState(tokenCountState);
  const setUseThis = useSetRecoilState(useVideoState);
  const setSkillSet = useSetRecoilState(skillSetState);

  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);

  const handleConformClick = async () => {
    const getGeneratedResume = localStorage.getItem("confirmSubmitting");
    if (getGeneratedResume === null) {
      localStorage.setItem("confirmSubmitting", "true");
      localStorage.setItem("aiGeneratedResume", JSON.stringify(resume));
    }
    await aiGeneratedResume(resume)
      .then(async () => {
        if (tokens >= 560) {
          let newTokenCount = tokens - 560;

          setTokens.mutate({
            count: newTokenCount,
            handle: resume.handle,
          });
        }
        setUseThis(false);
        if (status === "unauthenticated") {
          await signIn().then(() => {
            router.push("/s/resumeEditor");
          });
        } else {
          await router.push("/s/resumeEditor");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    window.location.reload();
  };

  const handleButtonClick = () => {
    setResume(cleanResume);
    setConfirmDialog(false);
    setNewSelectedList([]);
    setAddedSkills([]);
    setSkillSet("");
    setHideMarquee(true);
    setUseThis(false);
    goToStep(0);
    setInputBox([{ id: 1, value: "" }]);
  };

  return (
    <>
      <Header>
        <div className="mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="w-full mb-6 lg:mb-0">
            <h2 className="text-3xl text-center md:text-left font-bold mb-4 brand-grad">
              {t("confirm")}
            </h2>
            <p className="md:text-lg">
              {status === "authenticated"
                ? t("replaceResume")
                : t("confirmMessage")}
            </p>
          </div>
          <div className="w-full flex items-center justify-center lg:justify-end gap-2">
            <button
              type="button"
              onClick={handleConformClick}
              className="text-white max-w-sm w-32 bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {t("yes")}
            </button>
            <button
              type="button"
              onClick={handleButtonClick}
              className="text-white max-w-sm w-32 bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </Header>
    </>
  );
}
