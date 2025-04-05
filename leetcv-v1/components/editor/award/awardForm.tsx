import { Field, awardFields } from "../fieldMap";
import React, { useState } from "react";
import { Award } from "data/models/Award";
import { resumeState } from "../../../state/state";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import MandatoryField from "../mandatoryField";
import { removeNonASCII } from "@lib/helper/utfFilter";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
export interface AwardFormProps {
  award: Award;
}

export default function AwardForm({ award }: AwardFormProps) {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeAward, setActiveAward] = useState<Award>(award);
  const [charLength, setCharLength] = useState<number>(
    award.description.length
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      awardFields(activeAward).find((field) => field.fieldName === e.target.id)
        ?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;

      if (activeAward) {
        setActiveAward({ ...activeAward, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          awards: userInfo.awards?.map((awd: Award) => {
            if (awd.id === activeAward?.id) {
              return { ...awd, [id]: value };
            }
            return awd;
          }),
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    value = removeNonASCII(value);
    setCharLength(value.length);

    handleError(
      e,
      awardFields(activeAward).find((field) => field.fieldName === e.target.id)
        ?.mandatory,
      setFieldErrors
    );
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:p-3 md:pt-0 w-full justify-between">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`awards`}>
            {activeAward &&
              awardFields(activeAward).map((item: Field, idx: number) => {
                return (
                  <div
                    data-testid={`awardField-${idx}`}
                    className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                    key={item.fieldName}
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
                        {item.type === "textarea" ? (
                          <>
                            <textarea
                              id={item.fieldName}
                              name={item.fieldName}
                              data-testid={`input-${idx}`}
                              cols={30}
                              rows={5}
                              autoComplete={item.autoComplete}
                              defaultValue={removeNonASCII(
                                item.value as string
                              ).trim()}
                              placeholder={item.defaultValue as string}
                              onBlur={handleBlur}
                              onChange={handleChange}
                              spellCheck={true}
                              maxLength={350}
                              className="inputForm rounded-md border-gray-300 text-sm"
                            ></textarea>
                            <div className="text-sm text-gray-500 flex justify-between w-full sm:text-sm max-w-lg focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                              <p className="mt-2 text-sm text-gray-500">
                                {t("minCharText")}
                              </p>
                              <span className="mt-2 text-gray-500">
                                <span>{charLength}</span>
                                {t("maxChar")}
                              </span>
                            </div>
                            <ErrorMessage error={fieldErrors[item.fieldName]} />
                          </>
                        ) : (
                          <>
                            <input
                              autoFocus={item.fieldName === "name"}
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
                                  awardFields(activeAward).find(
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
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
