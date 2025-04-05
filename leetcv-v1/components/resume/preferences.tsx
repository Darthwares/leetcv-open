import { useTranslations } from "next-intl";
import { useRecoilState } from "recoil";
import { profileResumeState } from "@state/state";
import PreferenceChip from "@components/preferenceChip";
import ResumeSectionHeader from "./resumeSectionHeader";

function Preferences() {
  const [profileResume] = useRecoilState(profileResumeState);
  const preference = profileResume?.preferences;
  const t = useTranslations("Preference");
  if (preference?.length === 0) {
    return null;
  }
  return (
    <>
      {preference?.length && (
        <div data-testid={"preference"}>
          <ResumeSectionHeader title={t("preference")} />
          <div className="flex w-full flex-col">
            <div className="text-left w-full">
              <div className="flex flex-col">
                <PreferenceChip preference={preference} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Preferences;
