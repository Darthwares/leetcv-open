import React, { useState } from "react";
import { Education } from "data/models/Education";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { educationFields, Field } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
export interface EducationFormProps {
  education: Education;
}
export default function EducationForm({ education }: EducationFormProps) {
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeEducation, setActiveEducation] = useState<Education>(education);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      !e.target.value &&
      educationFields(activeEducation).find((field) => field.fieldName === e.target.id)
        ?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
      if (activeEducation) {
        setActiveEducation({ ...activeEducation, [id]: value });
      }

      if (userInfo) {
        setUserInfo({
          ...userInfo,
          educations: userInfo.educations?.map((edu: Education) => {
            if (edu.id === activeEducation?.id) {
              return { ...edu, [id]: value };
            }
            return edu;
          }),
        });
      }
    }
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`educations`}>
            {activeEducation &&
              educationFields(activeEducation).map(
                (item: Field, idx: number) => {
                  return (
                    <div
                      className={`p-1.5 md:py-3 sm:grid sm:gap-4 z-10 bg-white`}
                      key={item.fieldName}
                      data-testid={`educationField-${idx}`}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={item.title}
                          className="block text-sm font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={item} />
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          <>
                            <input
                              autoFocus={item.fieldName === "degree"}
                              id={item.fieldName}
                              name={item.fieldName}
                              data-testid={`input-${idx}`}
                              type={item.type ?? "text"}
                              autoComplete={item.autoComplete}
                              defaultValue={item.defaultValue}
                              placeholder={item.defaultValue as string}
                              onBlur={handleBlur}
                              onChange={(e) =>
                                handleError(
                                  e,
                                  educationFields(activeEducation).find(
                                    (field) => field.fieldName === e.target.id
                                  )?.mandatory,
                                  setFieldErrors
                                )
                              }
                              spellCheck={true}
                              className="inputForm rounded-md border-gray-300 text-sm"
                            />
                            <ErrorMessage error={fieldErrors[item.fieldName]} />
                          </>
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
