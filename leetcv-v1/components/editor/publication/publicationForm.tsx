import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { Publication } from "data/models/Publication";
import { resumeState } from "@state/state";
import { Field, publicationFields } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { removeNonASCII } from "@lib/helper/utfFilter";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";

export interface PublicationFormProps {
  publication: Publication;
}

export default function PublicationForm({ publication }: PublicationFormProps) {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activePublication, setActivePublication] =
    useState<Publication>(publication);
  const [descCharLength, setDescCharLength] = useState<number>(
    publication?.description?.length
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      publicationFields(activePublication).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;

      if (activePublication) {
        setActivePublication({ ...activePublication, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          publications: userInfo.publications?.map((pub: Publication) => {
            if (pub.id === activePublication?.id) {
              return { ...pub, [id]: value };
            }
            return pub;
          }),
        });
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { value } = e.target;
    value = removeNonASCII(value);
    e.target.value = value;
    setDescCharLength(value.length);

    handleError(
      e,
      publicationFields(activePublication).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory,
      setFieldErrors
    );
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`publications`}>
            {activePublication &&
              publicationFields(activePublication).map(
                (localItemValue: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`publicationField-${idx}`}
                      className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={localItemValue.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center">
                        <label
                          htmlFor={localItemValue.title}
                          className="block text-sm font-medium text-gray-700"
                          data-testid={`label-${idx}`}
                        >
                          <MandatoryField item={localItemValue} />
                        </label>
                        <div
                          className="mt-1 sm:mt-0 sm:col-span-2"
                          data-testid={`name-${idx}`}
                        >
                          {localItemValue.type === "textarea" ? (
                            <>
                              <textarea
                                cols={30}
                                rows={5}
                                id={localItemValue.fieldName}
                                name={localItemValue.fieldName}
                                data-testid={`input-${idx}`}
                                autoComplete={localItemValue.autoComplete}
                                defaultValue={removeNonASCII(
                                  localItemValue.value as string
                                ).trim()}
                                placeholder={
                                  localItemValue.placeholder as string
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                maxLength={300}
                                spellCheck={true}
                                className="block max-w-lg text-sm w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              ></textarea>
                              <div className="text-sm text-gray-500 flex justify-between max-w-lg w-full sm:text-sm">
                                <p className="mt-2 text-sm text-gray-500">
                                  {t("aboutPublicationMessage")}
                                </p>
                                <span className="mt-2 text-gray-500">
                                  <span>{descCharLength}</span>
                                  {t("maxPublicationChar")}
                                </span>
                              </div>
                              <ErrorMessage
                                error={fieldErrors[localItemValue.fieldName]}
                              />
                            </>
                          ) : (
                            <>
                              <input
                                autoFocus={localItemValue.fieldName === "title"}
                                id={localItemValue.fieldName}
                                name={localItemValue.fieldName}
                                data-testid={`input-${idx}`}
                                type={localItemValue.type ?? "text"}
                                autoComplete={localItemValue.autoComplete}
                                defaultValue={localItemValue.defaultValue}
                                placeholder={
                                  localItemValue.placeholder as string
                                }
                                onBlur={handleBlur}
                                onChange={(e) =>
                                  handleError(
                                    e,
                                    publicationFields(activePublication).find(
                                      (field) => field.fieldName === e.target.id
                                    )?.mandatory,
                                    setFieldErrors
                                  )
                                }
                                spellCheck={true}
                                className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              />
                              <ErrorMessage
                                error={fieldErrors[localItemValue.fieldName]}
                                id={localItemValue.fieldName}
                              />
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
