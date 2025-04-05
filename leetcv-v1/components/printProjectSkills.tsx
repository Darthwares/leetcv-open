import { colorFullSkills } from "@constants/defaults";
import { resumeFontState, selectedSkillState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

export interface PrintProjectSkillsProps {
  skills: string[];
}

const PrintProjectSkills = ({ skills }: PrintProjectSkillsProps) => {
  const [selectedSkillList] = useRecoilState(selectedSkillState);
  const [selectedFont] = useRecoilState(resumeFontState);

  const isSkillSelected = (skill: string) => {
    return selectedSkillList.includes(skill.trim());
  };

  return (
    <>
      {skills?.map((skill, idx: number) => {
        const isHighlighted = isSkillSelected(skill.toLowerCase());
        const { rgb, border } = colorFullSkills(skill);

        return (
          <span
            className={`${selectedFont.className} chip-design text-gray-900 text-sm dark:text-gray-100 border border-gray-300 py-0.5 px-1.5`}
            style={{
              background: isHighlighted ? "#f7e583" : `${rgb}`,
              borderColor: `rgba(130, 91, 184, 0.5)`,
            }}
            title={skill}
            key={idx}
            data-testid={`skill-${idx}`}
          >
            {skill}
          </span>
        );
      })}
    </>
  );
};

export default PrintProjectSkills;
