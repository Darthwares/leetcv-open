import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState } from "@state/state";
import Skills from "@components/skills";
import ResumeSectionHeader from "./resumeSectionHeader";

function ResumeSkills() {
  const [profileResume] = useRecoilState(profileResumeState);
  const skills = profileResume?.skills;
  const t = useTranslations("Skills");
  const filteredSkills = skills?.filter((item) => item.trim() !== "");

  return (
    <>
      <div data-testid={"resumeSkills"}>
        {filteredSkills?.length! > 0 && (
          <>
            <ResumeSectionHeader title={t("proficiency")} />
            <div className="flex w-full flex-col">
              <div className="text-left w-full">
                <div className="flex flex-col">
                  <Skills skills={filteredSkills} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ResumeSkills;
