import React, { useState } from "react";
import { Experience } from "data/models/Experience";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { noTokenErrorState, resumeState, tokenCountState } from "@state/state";
import { experienceFields, Field } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import dynamic from "next/dynamic";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
import RefineText from "@components/refineText";
import { trpc } from "@utils/trpc";
import Tooltip from "@components/tooltip";
import { useSession } from "next-auth/react";
import ChipForm from "../chip/chipForm";
export interface ExperienceFormProps {
  experience: Experience;
}

const RichEditor = dynamic(() => import("../../richEditor"), {
  ssr: false,
});

export default function ExperienceForm({ experience }: ExperienceFormProps) {
  const { status } = useSession();
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeExperience, setActiveExperience] =
    useState<Experience>(experience);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [generate, setGenerate] = useState("Generate");
  const [tokens] = useRecoilState(tokenCountState);
  const setTokens = trpc.useMutation(["fs.gptToken.setGPTToken"]);
  const [work, setWork] = React.useState(experience?.description!);
  const [text, setText] = useState("");
  const setNoTokenErrorState = useSetRecoilState(noTokenErrorState);

  const { refetch } = trpc.useQuery(
    ["fs.gptToken.checkToken", { id: userInfo.id, handle: userInfo.handle }],
    {
      enabled: status === "authenticated" && !!userInfo.id,
    }
  );

  if (tokens < 200) {
    setNoTokenErrorState(true);
  }

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      experienceFields(activeExperience).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
     if (activeExperience) {
       const updatedActiveExperience = {
         ...activeExperience,
         [id]: value,
         skills: Array.isArray(activeExperience.skills)
           ? activeExperience.skills
           : [], 
       };
       setActiveExperience(updatedActiveExperience);
     }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          experiences: userInfo.experiences?.map((exp: Experience) => {
            if (exp.id === activeExperience?.id) {
              return {
                ...exp,
                [id]: value,
                skills: Array.isArray(exp.skills) ? exp.skills : [],
              };
            }
            return exp;
          }),
        });
      }
    }
  };

  const handleIsPresent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target as HTMLInputElement;
    if (activeExperience) {
      setActiveExperience({ ...activeExperience, ["checked"]: checked });
    }

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        experiences: userInfo.experiences?.map((exp: Experience) => {
          if (exp.id === activeExperience?.id) {
            return { ...exp, ["checked"]: checked };
          }
          return exp;
        }),
      });
    }
  };

  const handleRefine = async () => {
    try {
      if (tokens < 200) {
        setNoTokenErrorState(true);
        return;
      }
      setNoTokenErrorState(false);
      setText("");
      setGenerate("Refine");

      const resp = await fetch("/api/openai/generateExperienceWork", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: experience?.description!,
        }),
      });
      const response = await resp.json();
      setText(response.work);
      setWork(response.work);

      let newTokenCount = tokens - 200;

      return setTokens.mutate(
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
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptSave = React.useCallback(() => {
    setGenerate("Generate");
    setNoTokenErrorState(false);

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        experiences: userInfo?.experiences?.map((exp) => {
          if (exp.id === activeExperience.id) {
            return { ...exp, description: work };
          }
          return exp;
        }),
      });
    }

    setText("");
  }, [experience.description, work]);

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`experiences`}>
            {activeExperience &&
              experienceFields(activeExperience).map(
                (expe: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`experienceField-${idx}`}
                      className={`${
                        expe.fieldName === "end" && expe.defaultValue === "true"
                          ? "md:pt-0 md:pb-2"
                          : ""
                      } p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={expe.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={expe.title}
                          className="text-sm flex gap-1 font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={expe} />
                          {(expe.type === "textarea" || expe.fieldName === "company") && (
                            <div className="flex items-center justify-center md:justify-start">
                              <Tooltip
                                tip={expe.fieldName === "company" ? t("companyHints") : t("workHints")}
                                width="w-48 sm:w-52 md:w-60"
                              />
                            </div>
                          )}
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          {expe.type === "textarea" ? (
                            <>
                              <RichEditor
                                placeholder={t("workDetail")}
                                markdownData={experience}
                                property="description"
                              />
                              <RefineText
                                generate={generate}
                                tokens={tokens}
                                text={text}
                                setText={setText}
                                selectText={work}
                                handleRefine={handleRefine}
                                handleAcceptSave={handleAcceptSave}
                                t={t}
                              />
                            </>
                          ) : (
                            <>
                              {expe.fieldName !== "end" &&
                                expe.fieldName !== "skills" && (
                                  <>
                                    <input
                                      id={expe.fieldName}
                                      name={expe.fieldName}
                                      data-testid={`input-${idx}`}
                                      type={expe.type ?? "text"}
                                      autoComplete={expe.autoComplete}
                                      defaultValue={expe.defaultValue}
                                      placeholder={expe.defaultValue as string}
                                      onBlur={handleBlur}
                                      onChange={(e) => {
                                        handleError(
                                          e,
                                          experienceFields(
                                            activeExperience
                                          ).find(
                                            (field) =>
                                              field.fieldName === e.target.id
                                          )?.mandatory,
                                          setFieldErrors
                                        );
                                        handleBlur(e);
                                      }}
                                      className="inputForm rounded-md border-gray-300 text-sm"
                                    />
                                    <ErrorMessage
                                      error={fieldErrors[expe.fieldName]}
                                    />
                                  </>
                                )}
                            </>
                          )}
                          {expe.fieldName === "skills" && (
                            <ChipForm
                              project={experience}
                              itemList={experience?.skills!}
                              property="expSkills"
                              isProject={"true"}
                              placeholder={t("expSkills")}
                            />
                          )}
                          {expe.fieldName === "end" && (
                            <>
                              <div>
                                {expe.defaultValue !== "true" && (
                                  <div>
                                    <input
                                      id={expe.fieldName}
                                      name={expe.fieldName}
                                      data-testid={`input-${idx}`}
                                      type={expe.type ?? "text"}
                                      autoComplete={expe.autoComplete}
                                      placeholder={expe.defaultValue as string}
                                      defaultValue={expe.defaultValue}
                                      onBlur={handleBlur}
                                      onChange={(e) =>
                                        handleError(
                                          e,
                                          experienceFields(
                                            activeExperience
                                          ).find(
                                            (field) =>
                                              field.fieldName === e.target.id
                                          )?.mandatory,
                                          setFieldErrors
                                        )
                                      }
                                      spellCheck={true}
                                      className="inputForm rounded-md border-gray-300 text-sm"
                                    />
                                    <ErrorMessage
                                      error={fieldErrors[expe.fieldName]}
                                    />
                                  </div>
                                )}
                                <div className="flex items-center pt-2 space-x-2">
                                  <input
                                    type="checkbox"
                                    checked={expe.defaultValue === "true"}
                                    onChange={handleIsPresent}
                                    className="inputForm rounded-md border-gray-300 text-sm"
                                  />
                                  <span className="text-gray-700 font-medium">
                                    {t("present")}
                                  </span>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
