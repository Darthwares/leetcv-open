import { useRecoilState } from "recoil";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { resumeState } from "@state/state";
import DescList from "@components/descList";
import { Field, languageFields } from "../fieldMap";
import { Language } from "data/models/Language";
import MandatoryField from "../mandatoryField";
import { predefinedLanguages } from "@constants/defaults";
import { AutoCompleteChangeParams } from "primereact/autocomplete";
import AutoCompleteInput from "@components/autoCompleteInput";
export interface LanguageFormProps {
  language: Language;
}
export default function LanguageForm({ language }: LanguageFormProps) {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeLanguage, setActiveLanguage] = useState<Language>(language);
  const [items, setItems] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement> | AutoCompleteChangeParams
  ) => {
    const newValue = e.target.value.trim();
    if (!newValue) {
      return;
    } else {
      const { id, value } = e.target as HTMLInputElement;
      if (activeLanguage) {
        setActiveLanguage({ ...activeLanguage, [id]: value });
      }
      if (userInfo) {
        setUserInfo({
          ...userInfo,
          languages: userInfo.languages?.map((language: Language) => {
            if (language.id === activeLanguage?.id) {
              return { ...language, [id]: value };
            }
            return language;
          }),
        });
      }
    }
  };

  const handleCheckboxChange = (
    skill: "read" | "write" | "speak",
    value: boolean
  ) => {
    setUserInfo({
      ...userInfo,
      languages: userInfo.languages?.map((language: Language) => {
        if (language.id === activeLanguage?.id) {
          return { ...language, [skill]: value };
        }
        return language;
      }),
    });
  };

  const handleInputChange = (e: AutoCompleteChangeParams, item: string) => {
    const newValue = e.target.value.trim();
    const selectedLanguage = userInfo.languages?.find(
      (language) => language.name.toLowerCase() === newValue.toLowerCase()
    );
    if (selectedLanguage) {
      setErrorMsg(`${newValue} ${t("alreadyAdded")}`);
    } else {
      setErrorMsg("");
    }
    setActiveLanguage({
      ...activeLanguage,
      [item]: newValue,
    });
  };

  const search = (event: { query: string }) => {
    const query = event.query.toLowerCase();
    const selectedLanguages = userInfo.languages?.map((language) =>
      language.name.toLowerCase()
    );
    const filteredLanguages = predefinedLanguages.filter(
      (language) =>
        language.toLowerCase().startsWith(query) &&
        !selectedLanguages?.includes(language.toLowerCase())
    );

    setItems(filteredLanguages);
  };

  return (
    <section
      id="#languageDetails"
      data-testid="language"
      className="w-full md:mt-4 mt-2"
    >
      <DescList>
        {userInfo &&
          languageFields(activeLanguage).map((item: Field, index: number) => {
            return (
              <div key={item.fieldName}>
                <div className={`p-3 md:px-5 sm:grid sm:gap-4 bg-white`}>
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
                    {item.title !== "Ability" && (
                      <label
                        htmlFor={item.title}
                        className="block text-sm font-medium text-gray-700 relative "
                        data-testid={`label-${item.title}`}
                      >
                        <MandatoryField item={item} />
                      </label>
                    )}
                    <div
                      className="mt-1 sm:mt-0 sm:col-span-2"
                      data-testid={`name-${item.fieldName}`}
                    >
                      {item.fieldName === "name" && (
                        <div className="flex lg:flex-row flex-col w-full justify-start lg:justify-between items-start  gap-7 lg:gap-4 pt-3 md:pt-0">
                          <div className="w-full lg:max-w-md space-x-2">
                            <AutoCompleteInput
                              inputId={item.fieldName}
                              inputValue={activeLanguage[item.fieldName]}
                              items={items}
                              placeholder={"Select Language"}
                              search={search}
                              handleInputChange={(
                                e: AutoCompleteChangeParams
                              ) => handleInputChange(e, item.fieldName)}
                              handleBlur={handleBlur}
                              className={"inputForm rounded-md text-sm"}
                              inputClassName={"w-full rounded-md text-sm"}
                            />
                            {errorMsg && (
                              <p className="text-red-500 mt-1 text-xs font-medium first-letter-uppercase">
                                {errorMsg}
                              </p>
                            )}
                          </div>
                          <div className=" items-center gap-20 flex justify-center w-full">
                            <div className="flex flex-col h-5 gap-y-2 items-center">
                              <input
                                checked={language.read}
                                onChange={(e) =>
                                  handleCheckboxChange("read", e.target.checked)
                                }
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <p>{t("read")}</p>
                            </div>
                            <div className="flex h-5 flex-col gap-y-2 items-center">
                              <input
                                checked={language.write}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    "write",
                                    e.target.checked
                                  )
                                }
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <p>{t("write")}</p>
                            </div>
                            <div className="flex h-5 flex-col gap-y-2 items-center">
                              <input
                                checked={language.speak}
                                onChange={(e) =>
                                  handleCheckboxChange(
                                    "speak",
                                    e.target.checked
                                  )
                                }
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                              />
                              <p>{t("speak")}</p>
                            </div>
                          </div>
                        </div>
                      )}
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
