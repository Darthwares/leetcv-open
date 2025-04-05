import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { CheckIcon, XIcon } from "@heroicons/react/outline";
import { pascalCase } from "@constants/defaults";
import ResumeSectionHeader from "./resumeSectionHeader";

function Languages() {
  const [profileResume] = useRecoilState(profileResumeState);
  const language = profileResume?.languages;
  const [selectedFont] = useRecoilState(resumeFontState);
  const t = useTranslations("Language");
  if (language?.length === 0) {
    return null;
  }
  return (
    <>
      <div data-testid={"language"} className="print:mt-1">
        {language?.length! > 0 && (
          <>
            <ResumeSectionHeader title={t("language")} />
            <div className="flex w-full flex-col">
              <div className="text-left max-w-sm">
                <div className="flex w-full flex-col">
                  <div className="flex flex-col pl-2 md:pl-0 gap-3 w-full pb-4">
                    <div className="flex w-full print:hidden justify-end relative space-x-3 right-5 print:right-0 text-sm gap-2">
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                        {t("read")}
                      </p>
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                        {t("write")}
                      </p>
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                        {t("speak")}
                      </p>
                    </div>
                    <div className="w-full hidden print:flex justify-end relative space-x-3 right-5 print:right-0 text-sm gap-2">
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                       R
                      </p>
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                      W
                      </p>
                      <p className="font-bold text-sm print:text-xs text-gray-700">
                       S
                      </p>
                    </div>
                    {language?.map((item) => {
                      const pascalCaseLanguage = pascalCase(item.name);
                      return (
                        <div
                          key={item.id}
                          className="flex items-center justify-between w-full"
                        >
                          <div>
                            {item.name && (
                              <p
                                className={`${selectedFont.className} text-sm pl-2 w-[9.5rem] print:w-[6rem] break-words text-gray-700`}
                              >
                                {pascalCaseLanguage}
                              </p>
                            )}
                          </div>
                          {item.name && (
                            <div className="flex items-center justify-end gap-7 print:gap-4 relative print:right-0 right-7">
                              <div>
                                {item.read === true ? (
                                  <CheckIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <XIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-red-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>
                              <div>
                                {item.write === true ? (
                                  <CheckIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <XIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-red-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>
                              <div>
                                {item.speak === true ? (
                                  <CheckIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-green-500"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <XIcon
                                    className="ml-auto h-5 w-5 print:w-3 print:h-3 text-red-500"
                                    aria-hidden="true"
                                  />
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
export default Languages;
