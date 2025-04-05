import {
  newSelectedSkillState,
  selectedSkillState,
  skillSetState,
} from "@state/state";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import { useRecoilState } from "recoil";
import BaseSkills from "./baseSkills";
import ErrorState from "./errorState";
import StepperLine from "./stepperLine";
import WizardButton from "./wizardButton";
import Chip from "@components/editor/chip/chip";
import { getUniqueSkills } from "@lib/helper/aiWizardSkills";
import { generateSkillList } from "@constants/defaults";
import AIResumeVideo from "./AIResumeVideo";
import { PlusSvg } from "@components/svg";

const AddSkills = () => {
  const t = useTranslations("Wizard");
  const { previousStep, nextStep } = useWizard();
  const [skillSet] = useRecoilState<string>(skillSetState);
  const [skills, setSkills] = useState<string>();
  const [addedSkills, setAddedSkills] = useRecoilState(newSelectedSkillState);
  const [newSelectedList, setNewSelectedList] =
    useRecoilState(selectedSkillState);
  const [skillList, setSkillList] = useState<string[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (function hasSkills() {
      const data = generateSkillList(skillSet);
      setSkillList(data.skillList!);
    })();
  }, [skillSet]);

  const newSkillList = [...addedSkills, ...skillList];
  const uniqueSelectedSkill = getUniqueSkills(newSkillList);

  let uniqueNewSkills: string[] = [...new Set(newSelectedList)];
  const nonEmptyStrings = uniqueNewSkills.filter((str) => str !== "");

  useEffect(() => {
    import("@lottiefiles/lottie-player");
  });

  useEffect(() => {
    if (nonEmptyStrings.length === 0) {
      setError(true);
    }
  }, [nonEmptyStrings]);

  const handleAddSkills = () => {
    if (!skills?.trim()) {
      return;
    }
    setAddedSkills([...addedSkills, skills]);
    setNewSelectedList([...uniqueNewSkills, skills]);
    setSkills("");
  };

  return (
    <>
      <AIResumeVideo />
      <StepperLine />
      <div className="z-10 w-full py-4">
        <div className="relative w-full h-full md:h-auto">
          <div className="bg-white dark:bg-gray-800/50">
            <div className="mx-auto max-w-7xl">
              <div className="overflow-hidden bg-[#4b008205] rounded-lg rounded-b-none border border-gray-200 dark:border-gray-700 lg:grid lg:grid-cols-2">
                <div className="hidden lg:block h-96">
                  <div className="lg:self-center">
                    <div className="py-10">
                      <lottie-player
                        src={`/assets/lottie/skills1.json`}
                        speed="1"
                        loop
                        autoplay
                        data-testid="lottie"
                      ></lottie-player>
                    </div>
                  </div>
                </div>
                <div className="relative bg-white dark:bg-gray-800/50 p-5 w-full rounded-tr-md mx-auto">
                  <div className="h-96 overflow-y-scroll">
                    <div className="flex flex-col items-center justify-center w-full space-y-4">
                      {!uniqueSelectedSkill?.length && (
                        <p>{t("generateSkills")}</p>
                      )}
                      <BaseSkills skills={uniqueSelectedSkill} />
                      <div className="flex flex-col items-start justify-start w-full">
                        <div className="flex gap-3 w-full justify-between">
                          <div className="w-full">
                            <input
                              type="text"
                              value={skills}
                              onChange={(e) => {
                                setSkills(e.target.value);
                              }}
                              onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                  handleAddSkills();
                                }
                              }}
                              placeholder={t("customSkills")}
                              className="rounded-lg border dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-100 dark:border-gray-600 border-indigo-700 text-sm w-full flex-1"
                            />
                          </div>
                          <button
                            type="button"
                            className="border border-indigo-700 hover:bg-indigo-700 bg-indigo-600 text-white focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex justify-center items-center"
                            onClick={handleAddSkills}
                          >
                            <PlusSvg />
                          </button>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm pt-1 font-semibold dark:text-gray-300 text-slate-700">
                            {t("selectedSkills")}
                            {nonEmptyStrings.length}
                          </p>
                          <div className="flex flex-wrap text-left gap-1 pt-2">
                            {nonEmptyStrings.map((skill) => {
                              return (
                                <div
                                  key={skill}
                                  className="flex flex-wrap gap-1"
                                >
                                  <Chip
                                    label={skill}
                                    onDelete={() => {
                                      setNewSelectedList(
                                        newSelectedList.filter(
                                          (s) => s !== skill
                                        )
                                      );
                                    }}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="">
                      {error && nonEmptyStrings.length === 0 && (
                        <ErrorState message={t("errorMessage")} />
                      )}
                    </div>
                  </div>
                  <div className="flex xl:px-4 lg:px-0 items-center md:px-6 pt-6 pb-3 mt-5 border-t border-gray-200 justify-between mx-auto">
                    <WizardButton
                      label={t("previous")}
                      handleMove={() => previousStep()}
                    />
                    <WizardButton
                      label={t("next")}
                      handleMove={async () => {
                        const hasMultipleSkills = nonEmptyStrings.length > 0;
                        hasMultipleSkills && (await nextStep());
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddSkills;
