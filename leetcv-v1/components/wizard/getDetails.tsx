import {
  hideMarqueeState,
  hideResume,
  publicPreviewState,
  skillSetState,
  tokenCountState,
  inputErrorState,
} from "@state/state";
import { useWizard } from "react-use-wizard";
import { useRecoilState, useSetRecoilState } from "recoil";
import StepperLine from "./stepperLine";
import Switch from "react-switch";
import WizardButton from "./wizardButton";
import { useTranslations } from "next-intl";
import { experiencedField, fresherField } from "@components/editor/fieldMap";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import AIResumeVideo from "./AIResumeVideo";
import AsteriskSymbol from "@components/asteriskSymbol";
import { experience, fresher } from "@constants/defaults";

const GetDetails = () => {
  const [resume, setResume] = useRecoilState(publicPreviewState);
  const [SkillSet, setSkillSet] = useRecoilState(skillSetState);
  const [loading, setLoading] = useState(false);
  const { nextStep } = useWizard();
  const t = useTranslations("Wizard");
  const setHasHidden = useSetRecoilState(hideResume);
  const setHideMarquee = useSetRecoilState(hideMarqueeState);
  const [inputError, setInputError] = useRecoilState(inputErrorState);
  const [tokens] = useRecoilState(tokenCountState);
  const [isButtonDisable, setIsButtonDisable] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (resume) {
      setResume({ ...resume, [e.target.id]: e.target.value });
    }
    setInputError({
      ...inputError,
      [e.target.id]: e.target.value.trim() === "",
    });
  };

  useEffect(() => {
    handleCheckButton();
  }, [resume]);

  const handleCheckButton = () => {
    if (resume.isFresher) {
      setIsButtonDisable(
        fresher.every((field) => field in inputError)
          ? fresher.some((field) => inputError[field])
          : true
      );
    } else {
      setIsButtonDisable(
        experience.every((field) => field in inputError)
          ? experience.some((field) => inputError[field])
          : true
      );
    }
  };

  const handleFresher = async () => {
    if (
      resume.displayName &&
      resume.specialization &&
      resume.industry &&
      resume.areaOfInterest
    ) {
      if (tokens < 560) {
        return toast.warning(t("pleaseSubscribe"));
      }
      setLoading(true);
      if (SkillSet.length === 0) {
        try {
          const resp = await fetch("/api/openai/generateFresherSkills", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              specialization: resume.specialization,
              industry: resume.industry,
              areaOfInterest: resume.areaOfInterest,
            }),
          });
          const response = await resp.json();
          setSkillSet(response?.skills);
        } catch (error) {
          console.error(error);
        }
      }
      setLoading(false);
      setHasHidden(false);
      setHideMarquee(false);
      await nextStep();
    }
  };

  const handleExperience = async () => {
    if (
      resume.displayName &&
      resume.position &&
      resume.industry &&
      resume.expertize &&
      resume.yoe
    ) {
      if (tokens < 560) {
        return toast.warning(t("pleaseSubscribe"));
      }
      setLoading(true);
      try {
        const resp = await fetch("/api/openai/generateExperiencedSkills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            specialization: resume.specialization,
            industry: resume.industry,
            areaOfInterest: resume.areaOfInterest,
          }),
        });
        const response = await resp.json();
        setSkillSet(response?.skills);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
      setHasHidden(false);
      setHideMarquee(false);
      await nextStep();
    }
  };

  return (
    <div id="wizardDetails" className="w-full">
      <AIResumeVideo />
      <div className="w-full md:mt-0">
        <StepperLine />
        <div className="z-50 w-full py-4">
          <div className="relative w-full h-full mx-auto flex md:h-auto">
            <div className="relative w-full bg-white dark:bg-gray-800/50 dark:border-gray-700 border border-gray-200 rounded-lg shadow">
              {!loading && (
                <div className="flex max-w-7xl items-center w-full">
                  <div className="w-full hidden bg-[#4b008205] lg:block">
                    <lottie-player
                      src={`/assets/lottie/form.json`}
                      speed="1"
                      loop
                      autoplay
                      data-testid="lottie"
                    ></lottie-player>
                  </div>
                  <div className="w-full py-4 lg:py-0">
                    <div className="flex items-center justify-center py-5 gap-2">
                      <p>{t("areYouFresher")}</p>
                      <Switch
                        onChange={(e) => setResume({ ...resume, isFresher: e })}
                        height={20}
                        width={40}
                        checked={resume.isFresher!}
                        onColor="#4F46E5"
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </div>
                    {resume.isFresher ? (
                      <div className="bg-white dark:bg-gray-800/10 rounded-lg px-3 sm:px-8 pb-5 mx-auto w-full">
                        {fresherField(resume).map((item) => {
                          return (
                            <div key={item.fieldName} className="pb-1.5">
                              <label
                                htmlFor={item.fieldName}
                                className="block text-sm font-medium leading-6 dark:text-white text-gray-900 py-1"
                              >
                                {item.title}{" "}
                                <AsteriskSymbol className="text-red-600" />
                              </label>
                              <div className="">
                                <input
                                  type="text"
                                  name={item.title}
                                  defaultValue={item.defaultValue}
                                  onChange={(e) => handleChange(e)}
                                  id={item.fieldName}
                                  key={item.fieldName}
                                  placeholder={item.placeholder}
                                  className={`block w-full ${
                                    inputError[item.fieldName]
                                      ? "border-red-600"
                                      : " "
                                  } lg:max-w-md rounded-md dark:border-gray-600 border-gray-300 shadow-sm focus:border-indigo-500 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-100 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-gray-800/10 rounded-lg px-3 sm:px-8 pb-5 mx-auto w-full">
                        {experiencedField(resume).map((exp) => {
                          return (
                            <>
                              <div key={exp.fieldName} className="pb-1.5">
                                <label
                                  htmlFor={exp.fieldName}
                                  className="block text-sm font-medium leading-6 dark:text-white text-gray-900 py-1"
                                >
                                  {exp.title}{" "}
                                  <span className="text-red-600">*</span>
                                </label>
                                <div className="">
                                  <input
                                    type="text"
                                    name={exp.title}
                                    defaultValue={exp.defaultValue}
                                    onChange={handleChange}
                                    id={exp.fieldName}
                                    key={exp.fieldName}
                                    placeholder={exp.placeholder}
                                    className={`block w-full ${
                                      inputError[exp.fieldName]
                                        ? "border-red-600"
                                        : " "
                                    } lg:max-w-md rounded-md dark:border-gray-600 border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-100 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                                  />
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
                    <div
                      className={`${
                        resume.isFresher ? "pb-4" : "pb-6"
                      } flex items-center justify-end px-3.5 sm:px-8 lg:max-w-lg`}
                    >
                      <WizardButton
                        label={"Next"}
                        disable={isButtonDisable}
                        handleMove={
                          resume.isFresher ? handleFresher : handleExperience
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              <div>
                {loading && (
                  <div className="flex items-center justify-center py-10">
                    <div className="w-60 flex flex-col items-center justify-center gap-3">
                      <lottie-player
                        src="/assets/lottie/ai.json"
                        background="white"
                        speed="1"
                        loop
                        autoplay
                      ></lottie-player>
                      <p className="text-sm animate-pulse relative left-3">
                        {t("generateSkills")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
export default GetDetails;
