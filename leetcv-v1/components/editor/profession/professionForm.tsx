import { useRecoilState } from "recoil";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { resumeState } from "@state/state";
import DescList from "@components/descList";
import { Field, professionFields } from "../fieldMap";
import ToggleButton from "../toggleButton";
import ChipForm from "../chip/chipForm";
import Tooltip from "@components/tooltip";
import MandatoryField from "../mandatoryField";

export default function ProfessionForm() {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const yoe = userInfo?.yearOfExperience?.split(",");
  const [experience, setExperience] = useState([yoe?.[0], yoe?.[1]]);

  const handleYearsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExperience([event.target.value, experience[1]]);
  };

  const handleMonthsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setExperience([experience[0], event.target.value]);
  };

  const handleBlur = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { id, value } = e.target;
    const nextField = professionFields(userInfo)[index + 1];
    if (nextField) {
      const nextFieldElement = inputRefs.current[index + 1];
      if (nextFieldElement && nextFieldElement.value === "") {
        nextFieldElement.focus();
      }
    }
    const year = `${experience[0]},${experience[1]}`;
    if (id === "yoe") {
      setUserInfo({
        ...userInfo,
        yearOfExperience: year,
      });
    } else if (userInfo) {
      setUserInfo({
        ...userInfo,
        [id]: value ?? "",
      });
    }
  };

  const filteredSkills = userInfo.skills?.filter((item) => item.trim() !== "");

  useEffect(() => {
    const firstEmptyField = professionFields(userInfo).find(
      (field: Field, index: number) =>
        !field.defaultValue && !inputRefs.current[index]?.value
    );
    if (firstEmptyField) {
      const firstEmptyFieldIndex = professionFields(userInfo).findIndex(
        (field: Field) => field.fieldName === firstEmptyField.fieldName
      );
      if (inputRefs.current[firstEmptyFieldIndex]) {
        inputRefs.current[firstEmptyFieldIndex].focus();
      }
    }
  }, [userInfo.position, userInfo.currentCompany, userInfo.yearOfExperience]);

  return (
    <section
      id="#personaldetails"
      data-testid="professionList"
      className="md:mt-4 mt-2"
    >
      <DescList>
        {userInfo &&
          professionFields(userInfo).map((items: Field, id: number) => {
            return (
              <div key={items.fieldName}>
                <div className={`py-3 px-1.5 sm:grid sm:gap-4 bg-white`}>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    <label
                      htmlFor={items.fieldName}
                      className="text-sm font-medium flex gap-1 items-center text-gray-700 sm:mt-px sm:pt-2"
                      data-testid={`label-${items.fieldName}`}
                    >
                      <MandatoryField item={items} />
                      <span>
                        {items.fieldName === "preferences" && (
                          <>
                            <div className="flex items-center justify-center md:justify-start ">
                              <Tooltip
                                tip={t("jobPreferenceTips")}
                                width={"w-48 md:w-64"}
                              />
                            </div>
                          </>
                        )}
                      </span>
                    </label>
                    <div
                      className="mt-1 sm:mt-0 sm:col-span-2"
                      data-testid={`name-${items.fieldName}`}
                    >
                      <>
                        {items.fieldName === "preferences" && (
                          <ChipForm
                            itemList={userInfo?.preferences!}
                            property="preferences"
                            placeholder={t("enterJobPreference")}
                          />
                        )}
                        {items.fieldName === "skills" && (
                          <ChipForm
                            itemList={filteredSkills}
                            property="skills"
                            placeholder={t("enterSkills")}
                            isProject={"false"}
                          />
                        )}
                        {items.fieldName === "remoteWork" && <ToggleButton />}
                        {items.fieldName !== "skills" &&
                          items.fieldName !== "remoteWork" &&
                          items.fieldName !== "preferences" &&
                          items.fieldName !== "yoe" && (
                            <>
                              <input
                                ref={(ref) => {
                                  inputRefs.current[id] =
                                    ref as HTMLInputElement;
                                }}
                                id={items.fieldName}
                                name={items.fieldName}
                                data-testid={`input-${items.fieldName}`}
                                type={items.type ?? "text"}
                                autoComplete={items.autoComplete}
                                defaultValue={items.defaultValue}
                                placeholder={items.defaultValue as string}
                                disabled={items.readonly}
                                onBlur={(e) => handleBlur(e, id)}
                                spellCheck={true}
                                className="inputForm rounded-md border-gray-300"
                              />
                            </>
                          )}
                        {items.fieldName === "yoe" && (
                          <>
                            <div className="flex max-w-lg gap-2">
                              <select
                                value={experience[0]}
                                defaultValue={yoe?.[0]}
                                onChange={handleYearsChange}
                                id={items.fieldName}
                                onBlur={(e) => handleBlur(e, id)}
                                className="inputForm rounded-md border-gray-300"
                              >
                                {Array.from({ length: 61 }, (_, index) => (
                                  <option
                                    key={index}
                                    value={index}
                                    className="text-sm"
                                  >
                                    {index} {t("years")}
                                  </option>
                                ))}
                              </select>
                              <select
                                value={experience[1]}
                                onChange={handleMonthsChange}
                                defaultValue={yoe?.[0]}
                                id={items.fieldName}
                                onBlur={(e) => handleBlur(e, id)}
                                className="inputForm rounded-md border-gray-300"
                              >
                                {Array.from({ length: 12 }, (_, index) => (
                                  <option key={index} value={index}>
                                    {index} {t("months")}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </DescList>
    </section>
  );
}
