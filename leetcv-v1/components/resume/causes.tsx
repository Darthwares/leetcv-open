import { colorFullSkills } from "@constants/defaults";
import { resumeFontState, resumeState } from "@state/state";
import { useTranslations } from "next-intl";
import React from "react";
import { useRecoilState } from "recoil";
import ResumeSectionHeader from "./resumeSectionHeader";

export default function Causes() {
  const [resume] = useRecoilState(resumeState);
  const t = useTranslations("CauseData");
  const [selectedFont] = useRecoilState(resumeFontState);

  return (
    <>
      {resume?.causesList?.length! > 0 && (
        <div className="print:mt-5">
          <ResumeSectionHeader title={t("causes")} />
        </div>
      )}
      <div className="flex space-x-2 flex-wrap px-2" data-testid="causes">
        {resume.causesList?.map((item, idx: number) => {
          const { border } = colorFullSkills(item);
          return (
            <div
              className={`${selectedFont.className} chip-design border border-gray-200 w-fit px-2 font-medium`}
              title={item}
              key={idx}
              style={{
                borderColor: `${border}`,
              }}
              data-testid={`cause-${idx}`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </>
  );
}
