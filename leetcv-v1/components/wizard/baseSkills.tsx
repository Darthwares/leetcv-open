import { colorFullSkills } from "@constants/defaults";
import { publicPreviewState, selectedSkillState } from "@state/state";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
interface BaseSkillsProps {
  skills: string[];
}

const BaseSkills = ({ skills }: BaseSkillsProps) => {
  const [selectedSkill, setSelectedSkill] = useState<string[]>([]);
  const [newSelectedList, setNewSelectedList] =
    useRecoilState<string[]>(selectedSkillState);
  const [resume, setResume] = useRecoilState(publicPreviewState);

  useEffect(() => {
    setSelectedSkill(newSelectedList);
    if (resume) {
      setResume({
        ...resume,
        skills: newSelectedList,
      });
    }
  }, [newSelectedList]);

  return (
    <div className="flex gap-1 flex-wrap items-center rounded-md w-full">
      {skills?.map((skill: string, id: number) => {
        const { rgb } = colorFullSkills(skill);
        return (
          <button
            key={id}
            style={{ background: `${rgb}` }}
            onClick={() => {
              const isSelected = selectedSkill.includes(skill);
              setSelectedSkill(
                isSelected
                  ? selectedSkill.filter((s) => s !== skill)
                  : [...selectedSkill, skill]
              );
              setNewSelectedList(
                isSelected
                  ? newSelectedList.filter((s) => s !== skill)
                  : [...newSelectedList, skill]
              );
            }}
            className={`toggle-btn py-1 text-left dark:text-gray-300 text-gray-900 font-semibold inline-flex ${
              selectedSkill.includes(skill) ? "border-2 border-indigo-400" : ""
            } m-[2px] cursor-pointer`}
          >
            <span>{skill}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BaseSkills;
