import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useTranslations } from "next-intl";
import { resumeState } from "@state/state";
import { Field, patentFields } from "../fieldMap";
import MandatoryField from "../mandatoryField";
import { removeNonASCII } from "@lib/helper/utfFilter";
import { FieldErrors, handleError } from "@constants/defaults";
import ErrorMessage from "../errorMessage";
import { Patent } from "data/models/Patent";
import { v4 as guid } from "uuid";
import { XCircleIcon } from "@heroicons/react/outline";

export interface PatentFormProps {
  patent: Patent;
}

export default function PatentForm({ patent }: Readonly<PatentFormProps>) {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activePatent, setActivePatent] = useState<Patent>(patent);
  const [descCharLength, setDescCharLength] = useState<number>(
    patent?.patentDescription?.length!
  );
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (
      !e.target.value &&
      patentFields(activePatent).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory
    ) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;

      if (activePatent) {
        setActivePatent({ ...activePatent, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          patents: userInfo.patents?.map((patent: Patent) => {
            if (patent.id === activePatent?.id) {
              return { ...patent, [id]: value };
            }
            return patent;
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
      patentFields(activePatent).find(
        (field) => field.fieldName === e.target.id
      )?.mandatory,
      setFieldErrors
    );
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    if (activePatent) {
      setActivePatent({ ...activePatent, isPatentIssued: checked });
    }
    if (userInfo) {
      setUserInfo({
        ...userInfo,
        patents: userInfo.patents?.map((pat: Patent) => {
          if (pat.id === activePatent?.id) {
            return { ...pat, isPatentIssued: checked };
          }
          return pat;
        }),
      });
    }
  };

  const handleAddMember = (
    e: React.FormEvent<HTMLFormElement> | React.KeyboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();
    if (e.currentTarget.value.trim() === "") {
      return;
    }

    const newMember = {
      id: guid(),
      name: e.currentTarget.value.trim(),
      url: "",
    };
    const normalizeToArray = (value: any) =>
      Array.isArray(value) ? value : [];

    setActivePatent((prevPatent) => ({
      ...prevPatent,
      patentMembers: [...normalizeToArray(prevPatent.patentMembers), newMember],
    }));

    if (userInfo) {
      setUserInfo({
        ...userInfo,
        patents: userInfo.patents?.map((pat: Patent) => {
          if (pat.id === activePatent?.id) {
            return {
              ...pat,
              patentMembers: [
                ...normalizeToArray(pat.patentMembers),
                newMember,
              ],
            };
          }
          return pat;
        }),
      });
    }
    e.currentTarget.value = "";
  };

  const handleRemoveMember = (memberId: string) => {
    const updatedMembers =
      activePatent.patentMembers?.filter((member) => member.id !== memberId) ||
      [];
    setActivePatent((prevPatent) => ({
      ...prevPatent,
      patentMembers: updatedMembers,
    }));

    if (userInfo) {
      const updatedPatents = userInfo.patents?.map((pat: Patent) => {
        if (pat.id === activePatent?.id) {
          const updatedMembers =
            pat.patentMembers?.filter((member) => member.id !== memberId) || [];
          return { ...pat, patentMembers: updatedMembers };
        }
        return pat;
      });
      setUserInfo((prevUserInfo) => ({
        ...prevUserInfo,
        patents: updatedPatents,
      }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      handleAddMember(e);
    }
  };

  return (
    <div className="flex lg:flex-row flex-col w-full gap-0 lg:gap-10 rounded-lg">
      <div className="flex gap-5 md:px-3 w-full justify-between pt-0">
        <div className="w-full md:mt-4 mt-2">
          <div data-testid={`publications`}>
            {activePatent &&
              patentFields(activePatent).map(
                (localItemValue: Field, idx: number) => {
                  return (
                    <div
                      data-testid={`publicationField-${idx}`}
                      className={`p-1.5 md:py-3 sm:grid sm:gap-4 bg-white`}
                      key={localItemValue.fieldName}
                    >
                      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start justify-center py-1 sm:py-2 md:py-0.5">
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
                                defaultValue={
                                  localItemValue?.defaultValue as string
                                }
                                placeholder={
                                  localItemValue.placeholder as string
                                }
                                onBlur={handleBlur}
                                onChange={handleChange}
                                maxLength={300}
                                spellCheck={true}
                                className="block max-w-lg text-sm w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="text-sm text-gray-500 flex justify-between max-w-lg w-full sm:text-sm">
                                <p className="mt-2 text-sm text-gray-500">
                                  {t("aboutPatentMessage")}
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
                              {localItemValue.fieldName !== "patentStatus" &&
                                localItemValue.fieldName !==
                                  "patentMembers" && (
                                  <>
                                    <input
                                      autoFocus={
                                        localItemValue.fieldName === "title"
                                      }
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
                                          patentFields(activePatent).find(
                                            (field) =>
                                              field.fieldName === e.target.id
                                          )?.mandatory,
                                          setFieldErrors
                                        )
                                      }
                                      spellCheck={true}
                                      className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    />
                                    <ErrorMessage
                                      error={
                                        fieldErrors[localItemValue.fieldName]
                                      }
                                      id={localItemValue.fieldName}
                                    />
                                  </>
                                )}
                            </>
                          )}
                          {localItemValue.fieldName === "patentStatus" && (
                            <div className="flex items-center gap-3">
                              <input
                                id="patentStatus"
                                type="checkbox"
                                checked={localItemValue?.defaultBooleanValue}
                                onChange={handleCheckboxChange}
                                className="inputForm rounded-md cursor-pointer border-gray-300 text-sm"
                              />
                              <label
                                htmlFor="patentStatus"
                                className="text-gray-700 font-medium cursor-pointer"
                              >
                                {t("patentIssued")}
                              </label>
                            </div>
                          )}
                          {localItemValue.fieldName === "patentMembers" && (
                            <>
                              {Array.isArray(activePatent.patentMembers) &&
                                activePatent.patentMembers.length !== 0 && (
                                  <div className="flex items-stretch border py-2 border-gray-200 gap-1 overflow-y-scroll rounded-lg max-w-lg flex-wrap p-1 mb-2">
                                    {activePatent.patentMembers.map(
                                      (member) => (
                                        <div
                                          key={member.id}
                                          className="flex items-start px-2 py-1 rounded-md text-sm font-medium leading-5 bg-[#EEF2FF] border border-indigo-400 text-indigo-500 m-[2px]"
                                        >
                                          <span className="relative capitalize whitespace-normal">
                                            {member.name}
                                          </span>
                                          <button
                                            onClick={() =>
                                              handleRemoveMember(member.id)
                                            }
                                            className="ml-2 transition duration-150 ease-in-out "
                                          >
                                            <XCircleIcon className="w-5 " />
                                          </button>
                                        </div>
                                      )
                                    )}
                                  </div>
                                )}
                              <form onSubmit={handleAddMember}>
                                <input
                                  autoFocus={
                                    localItemValue.fieldName === "patentMembers"
                                  }
                                  id={localItemValue.fieldName}
                                  name={localItemValue.fieldName}
                                  data-testid={`input-${idx}`}
                                  type={localItemValue.type ?? "text"}
                                  autoComplete={localItemValue.autoComplete}
                                  defaultValue={localItemValue.defaultValue}
                                  placeholder={
                                    localItemValue.placeholder as string
                                  }
                                  onKeyDown={handleKeyDown}
                                  spellCheck={true}
                                  className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                />
                              </form>
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
