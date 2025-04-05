import { colorFullSkills } from "@constants/defaults";
import { resumeFontState } from "@state/state";
import React from "react";
import { useRecoilState } from "recoil";

export interface ProjectSkillsProps {
  skills: string[] | undefined;
}

export default function Skills({ skills }: ProjectSkillsProps) {
  const [selected] = useRecoilState(resumeFontState);

  return (
    <div className="flex gap-x-1.5 flex-wrap px-2" data-testid="projectSkills">
      {skills?.map((elem, idx: number) => {
        const { border, rgb } = colorFullSkills(elem);

        return (
          <p
            className={`chip-design ${selected.className} text-gray-900 border py-0.5 px-1.5 text-sm`}
            style={{ background: `${rgb}`, borderColor: `${border}` }}
            title={elem}
            key={idx}
            data-testid={`projectSkills-${idx}`}
          >
            {elem}
          </p>
        );
      })}
    </div>
  );
}
