import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { resumeState } from "@state/state";
import { extraCurricularFields, Field } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
import Tooltip from "@components/tooltip";
import { ExtraCurricular } from "data/models/ExtraCurricular";
import dynamic from "next/dynamic";
import { removeNonASCII } from "@lib/helper/utfFilter";

const RichEditor = dynamic(() => import("../../richEditor"), {
  ssr: false,
});

export interface ExtraCurricularFormProps {
  activity: ExtraCurricular;
}

export default function ExtraCurricularForm({
  activity,
}: ExtraCurricularFormProps) {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeActivity, setActiveActivity] =
    useState<ExtraCurricular>(activity);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [charLength, setCharLength] = useState<number>(
    activity.description?.length ?? 0
  );

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      extraCurricularFields(activeActivity).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
      if (activeActivity) {
        const updatedActiveActivity = {
          ...activeActivity,
          [id]: value,
        };
        setActiveActivity(updatedActiveActivity);
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          extraCurricularActivities: userInfo.extraCurricularActivities?.map(
            (act: ExtraCurricular) => {
              if (act.id === activeActivity?.id) {
                return {
                  ...act,
                  [id]: value,
                };
              }
              return act;
            }
          ),
        });
      }
    }
  };

  const handleIsPresent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target as HTMLInputElement;
    if (activeActivity) {
      setActiveActivity({ ...activeActivity, ["checked"]: checked });
    }

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        extraCurricularActivities: userInfo.extraCurricularActivities?.map(
          (act: ExtraCurricular) => {
            if (act.id === activeActivity?.id) {
              return { ...act, ["checked"]: checked };
            }
            return act;
          }
        ),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    value = removeNonASCII(value);
    setCharLength(value.length);

    handleError(
      e,
      extraCurricularFields(activeActivity).find((field) => field.fieldName === e.target.id)
        ?.mandatory,
      setFieldErrors
    );
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`extraCurricularActivities`}>
            {activeActivity &&
              extraCurricularFields(activeActivity).map(
                (act: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`extraCurricularActivitiesField-${idx}`}
                      className={`${act.fieldName === "end" && act.defaultValue === "true"
                        ? "md:pt-0 md:pb-2"
                        : ""
                        } p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={act.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={act.title}
                          className="text-sm flex gap-1 font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={act} />
                          {act.type === "textarea" && (
                            <div className="flex items-center justify-center md:justify-start">
                              <Tooltip
                                tip={t("workHints")}
                                width="w-48 sm:w-52 md:w-60"
                              />
                            </div>
                          )}
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          {act.type === "textarea" ? (
                            <>
                              <textarea
                                id={act.fieldName}
                                name={act.fieldName}
                                data-testid={`input-${idx}`}
                                cols={30}
                                rows={5}
                                autoComplete={act.autoComplete}
                                defaultValue={removeNonASCII(
                                  act.value as string
                                ).trim()}
                                placeholder={act.defaultValue as string}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                spellCheck={true}
                                maxLength={300}
                                className="inputForm rounded-md border-gray-300 text-sm"
                              />

                              <div className="text-sm text-gray-500 flex justify-between w-full sm:text-sm max-w-lg focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                                <p className="mt-2 text-sm text-gray-500">
                                  {t("aboutActivityMessage")}
                                </p>
                                <span className="mt-2 text-gray-500">
                                  <span>{charLength}</span>
                                  {t("maxPublicationChar")}
                                </span>
                              </div>
                            </>
                          ) : (
                            <>
                              {act.fieldName !== "end" &&
                                act.fieldName !== "skills" && (
                                  <>
                                    <input
                                      id={act.fieldName}
                                      name={act.fieldName}
                                      data-testid={`input-${idx}`}
                                      type={act.type ?? "text"}
                                      autoComplete={act.autoComplete}
                                      defaultValue={act.defaultValue}
                                      placeholder={act.defaultValue as string}
                                      onBlur={handleBlur}
                                      onChange={(e) => {
                                        handleError(
                                          e,
                                          extraCurricularFields(
                                            activeActivity
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
                                      error={fieldErrors[act.fieldName]}
                                    />
                                  </>
                                )}
                            </>
                          )}
                          {act.fieldName === "end" && (
                            <div>
                              {act.defaultValue !== "true" && (
                                <div>
                                  <input
                                    id={act.fieldName}
                                    name={act.fieldName}
                                    data-testid={`input-${idx}`}
                                    type={act.type ?? "text"}
                                    autoComplete={act.autoComplete}
                                    placeholder={act.defaultValue as string}
                                    defaultValue={act.defaultValue}
                                    onBlur={handleBlur}
                                    onChange={(e) =>
                                      handleError(
                                        e,
                                        extraCurricularFields(
                                          activeActivity
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
                                    error={fieldErrors[act.fieldName]}
                                  />
                                </div>
                              )}
                              <div className="flex items-center pt-2 space-x-2">
                                <input
                                  type="checkbox"
                                  checked={act.defaultValue === "true"}
                                  onChange={handleIsPresent}
                                  className="inputForm rounded-md border-gray-300 text-sm"
                                />
                                <span className="text-gray-700 font-medium">
                                  {t("present")}
                                </span>
                              </div>
                            </div>
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
