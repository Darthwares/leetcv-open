import { useRecoilState } from "recoil";
import { profileResumeState, resumeFontState } from "@state/state";
import { colorFullSkills, pascalCase } from "@constants/defaults";
import { useTranslations } from "next-intl";
import ResumeSectionHeader from "./resumeSectionHeader";

function Hobbies() {
  const t = useTranslations("Hobbies");
  const [profileResume] = useRecoilState(profileResumeState);
  const hobbies = profileResume?.hobbies;
  const [selectedFont] = useRecoilState(resumeFontState);
  let uniqueHobbies = [...new Set(hobbies)];

  return (
    <>
      <div>
        {uniqueHobbies?.length > 0 && (
          <>
            <div className="print:mt-5">
              <ResumeSectionHeader title={t("hobbies")} />
            </div>
            <div className="flex w-full flex-col px-5 relative right-3">
              <div className="text-left w-full ">
                <div className="flex flex-wrap gap-x-2">
                  {uniqueHobbies?.map((elem, idx: number) => {
                    const { border } = colorFullSkills(elem);
                    const pascalCaseHobby = pascalCase(elem);

                    return (
                      <div
                        className={`${selectedFont.className} font-medium chip-design border border-gray-200 w-fit px-2`}
                        style={{
                          borderColor: `${border}`,
                        }}
                        title={elem}
                        key={idx}
                        data-testid={`skill-${idx}`}
                      >
                        {pascalCaseHobby}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Hobbies;
