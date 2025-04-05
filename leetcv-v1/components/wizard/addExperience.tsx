import {
  confirmSubmissionState,
  hideResume,
  projectSkillState,
  publicExperienceState,
  publicPreviewState,
  showAIResumeState,
  sideBarOpenState,
  useVideoState,
  userIdState,
} from "@state/state";
import { Project } from "data/models/Project";
import React, { useEffect, useRef, useState } from "react";
import { useWizard } from "react-use-wizard";
import { useRecoilState, useSetRecoilState } from "recoil";
import StepperLine from "./stepperLine";
import WizardButton from "./wizardButton";
import ConfirmSubmission from "./confirmSubmission";
import { useTranslations } from "next-intl";
import ErrorState from "./errorState";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { SvgInfo } from "@components/svgGrid";
import { getResumeDetails } from "@lib/helper/aiWizardSkills";
import { defaultImage } from "@constants/defaults";
import AIResumeVideo from "./AIResumeVideo";
import Header from "@components/header";
import TrashButton from "@components/trashButton";
import { PlusSvg } from "@components/svg";
import useManageToken from "@lib/helper/useManageToken";

const AddExperience = () => {
  const [inputBox, setInputBox] = useRecoilState(publicExperienceState);
  const [inputCounter, setInputCounter] = useState(1);
  const { data: session } = useSession();
  const [userId] = useRecoilState(userIdState);
  const setProjectSkills = useSetRecoilState(projectSkillState);
  const setAIResumeState = useSetRecoilState(showAIResumeState);
  const [resume, setResume] = useRecoilState(publicPreviewState);
  const { previousStep, nextStep } = useWizard();
  const [loading, setLoading] = useState(false);
  const [useThis, setUseThis] = useRecoilState(useVideoState);
  const [confirmDialog, setConfirmDialog] = useRecoilState(
    confirmSubmissionState
  );
  const setHasHiddenResume = useSetRecoilState(hideResume);
  const [error, setError] = useState(false);
  const [emptyState, setEmptyState] = useState(false);
  const t = useTranslations("Wizard");
  const defaultAvatar = defaultImage(userId);
  const [isSideBarClosed] = useRecoilState(sideBarOpenState);
  const { deductToken } = useManageToken();

  const { data: redoCounter, refetch } = trpc.useQuery(
    ["fs.gptToken.getRedoCount", { id: userId }],
    {
      enabled: !!userId,
    }
  );
  const setRedoCount = trpc.useMutation(["fs.gptToken.setRedoCount"], {
    onSuccess: () => {
      refetch();
    },
  });
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { data: handle } = trpc.useQuery(
    ["fs.waitList.getHandle", { id: userId }],
    {
      enabled: !!userId,
    }
  );

  const checkInputValidity = () => {
    const hasEmptyValue = inputBox.some((item) => item.value.trim() === "");
    if (hasEmptyValue) {
      setEmptyState(true);
      setError(false);
      return false;
    }

    const hasDuplicateValue = inputBox.some((item, index) => {
      return (
        inputBox.findIndex(
          (v) =>
            v.value.trim().toLowerCase() === item.value.trim().toLowerCase()
        ) !== index
      );
    });
    if (hasDuplicateValue) {
      setEmptyState(false);
      setError(true);
      return false;
    }

    setEmptyState(false);
    setError(false);
    return true;
  };

  const addInput = () => {
    if (!checkInputValidity()) {
      return;
    }
    setInputCounter((prevCounter) => prevCounter + 1);
    setInputBox((prevInputBoxes) => [
      ...prevInputBoxes,
      { id: inputCounter + 1, value: "" },
    ]);
  };

  const removeInputBox = (id: number) => {
    setEmptyState(false);
    setError(false);
    setInputBox((prevInputBoxes) =>
      prevInputBoxes.filter((input) => input.id !== id)
    );
  };

  const handleGenerate = async () => {
    if (!checkInputValidity()) {
      return;
    }
    setLoading(true);
    const newProjectSkills: Project[] = [];
    let description = "";
    let work = "";
    let impact = "";

    ({ description, work, impact } = await getResumeDetails(
      inputBox,
      resume,
      description,
      work,
      impact,
      newProjectSkills
    ));

    setProjectSkills(newProjectSkills);

    setResume({
      ...resume,
      id: userId,
      projects: newProjectSkills,
      displayName: resume.displayName,
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      image: defaultAvatar,
      email: session?.user?.email!,
      phoneNumber: "7894578XXX",
      description,
      handle,
      position: resume.isFresher ? "" : resume.position,
      currentCompany: "",
      yoe: resume.isFresher ? "" : resume.yoe,
      hobbies: [],
      preferences: [],
      socialMedia: [],
      languages: [],
      awards: [],
      courses: [],
      certificates: [],
      educations: [],
      experiences: [],
      publications: [],
      causes: [],
    });

    setLoading(false);
    setUseThis(true);
    deductToken(600);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newInputBox = inputBox.map((input) => {
      if (input.id === id) {
        return { ...input, value: e.target.value };
      }
      return input;
    });
    setInputBox(newInputBox);
  };

  const handleSetResume = () => {
    setConfirmDialog(true);
  };

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (inputRefs.current.length > 0) {
      const lastInputRef = inputRefs.current[inputRefs.current.length - 1];
      if (lastInputRef) {
        lastInputRef.focus();
      }
    }
  }, [inputBox.length]);

  return (
    <>
      {!useThis && (
        <>
          <AIResumeVideo />
          <StepperLine />
        </>
      )}
      <div
        className={`flex flex-col items-center dark:bg-gray-800/50 bg-white justify-center max-w-7xl w-full my-4 text-sm`}
      >
        <div className="flex flex-col items-center justify-center w-full">
          {!useThis && (
            <div
              className={`w-full overflow-y-scroll flex flex-col border dark:border-gray-700 border-gray-200 rounded-md`}
            >
              {loading && (
                <div className="flex items-center justify-center py-10">
                  <div className="h-72 w-full flex flex-col items-center justify-center gap-3">
                    <lottie-player
                      src="/assets/lottie/ai.json"
                      background="white"
                      speed="1"
                      loop
                      autoplay
                    ></lottie-player>
                    <p className="text-sm animate-pulse text-center">
                      {t("generatingResume")}
                    </p>
                  </div>
                </div>
              )}
              {!loading && (
                <div className="flex max-w-7xl items-center w-full">
                  {
                    <div className="w-full hidden bg-[#4b008205] lg:block">
                      <lottie-player
                        src={`/assets/lottie/task.json`}
                        speed="1"
                        loop
                        autoplay
                        data-testid="lottie"
                      ></lottie-player>
                    </div>
                  }
                  <div className="px-6 pt-6 pb-4 w-full">
                    <p className="pb-4 text-lg font-semibold">
                      {t("oneLinerProject")}
                    </p>
                    <div
                      className={`${
                        inputBox?.length > 6 && "h-72"
                      } w-full space-y-3 overflow-y-scroll`}
                    >
                      {inputBox.map((input, index) => {
                        return (
                          <div
                            key={input.id}
                            className="flex items-center gap-2 w-full"
                          >
                            <input
                              type="text"
                              name=""
                              className="rounded-lg w-full dark:text-gray-100 dark:placeholder:text-gray-100 dark:bg-gray-800 dark:border-gray-600"
                              id={`${input.id}`}
                              value={input.value}
                              placeholder={t("placeholderWorkedOn")}
                              onChange={(e) => {
                                if (inputBox.length > 1) {
                                  setError(!e.target.value);
                                }
                                setEmptyState(e.target.value === "");
                                handleInputChange(e, input.id);
                              }}
                              onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                  addInput();
                                }
                              }}
                              ref={(inputRef) => {
                                inputRefs.current[index] = inputRef;
                                if (index === inputBox.length - 1) {
                                  inputRef?.focus();
                                }
                              }}
                            />
                            {inputBox.length > 1 && (
                              <TrashButton
                                onClick={() => removeInputBox(input.id)}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <div className="pt-2">
                      {!emptyState && error && (
                        <ErrorState message={t("doNotRepeat")} />
                      )}
                      {emptyState && (
                        <ErrorState message={t("cannotBeEmpty")} />
                      )}
                    </div>
                    <div className="mt-2 flex gap-3 items-center">
                      <button
                        type="button"
                        className="border bg-indigo-600 border-indigo-700 hover:bg-indigo-700 text-white focus:outline-none font-medium rounded-full text-sm p-2 text-center inline-flex items-center"
                        onClick={addInput}
                      >
                        <PlusSvg />
                      </button>
                      <span className="text-sm text-indigo-600">
                        {t("totalProject")} {inputBox?.length}
                      </span>
                    </div>
                    <div
                      className={`xl:px-4 lg:px-0 flex items-center pt-6 pb-3 mt-5 border-t border-gray-200 justify-between mx-auto`}
                    >
                      <WizardButton
                        label={t("previous")}
                        handleMove={() => previousStep()}
                      />
                      <WizardButton
                        label={t("generate")}
                        handleMove={async () => {
                          await handleGenerate();
                          setHasHiddenResume(true);
                          await nextStep();
                          setAIResumeState(true);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
          {useThis && (
            <div className="w-full">
              <div className="flex flex-col items-center gap-4">
                {confirmDialog && <ConfirmSubmission />}
                {!confirmDialog && (
                  <Header>
                    <div
                      className={`mx-auto ${
                        isSideBarClosed
                          ? "lg:flex-row lg:justify-end"
                          : "lg:flex-col"
                      } xl:flex-row w-full flex flex-col lg:flex-row justify-between items-center`}
                    >
                      <div className="flex p-4 sm:items-center text-indigo-800 rounded-lg">
                        <SvgInfo />
                        <div className="ml-3 md:text-lg block space-x-2">
                          <span className="md:whitespace-nowrap whitespace-normal">
                            {t("successfully")}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-full flex items-center justify-center lg:justify-end gap-3`}
                      >
                        <WizardButton
                          label={t("useThis")}
                          handleMove={handleSetResume}
                        />
                        <WizardButton
                          label={t("redo")}
                          handleMove={() => {
                            setUseThis(false);
                            setHasHiddenResume(false);
                            if (redoCounter < 3) {
                              return setRedoCount.mutate({
                                count: redoCounter + 1,
                                id: userId,
                              });
                            }
                            setRedoCount.mutate({
                              count: redoCounter + 1,
                              id: userId,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </Header>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default AddExperience;
