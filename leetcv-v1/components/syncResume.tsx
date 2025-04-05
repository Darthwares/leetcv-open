import { convertLanguages } from "@constants/defaults";
import { resumeState } from "@state/state";
import { Resume } from "data/models/UserInfo";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export interface AutoSyncResumeProps {
  setResume: Resume;
}

const AutoSyncResume = ({ setResume }: any) => {
  const [resume] = useRecoilState(resumeState);
  useEffect(() => {
    if (
      resume?.languages &&
      resume.languages.every((lang) => typeof lang === "string")
    ) {
      const updatedLanguages = convertLanguages(resume.languages);
      if (
        JSON.stringify(resume.languages) !== JSON.stringify(updatedLanguages)
      ) {
        setResume({
          ...resume,
          languages: updatedLanguages,
        });
      }
    }
  }, [resume]);

  return null;
};

export default AutoSyncResume;
