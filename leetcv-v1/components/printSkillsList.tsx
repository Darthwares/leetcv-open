import React from "react";
import { colorFullSkills, pascalCase } from "@constants/defaults";
import { useSetRecoilState } from "recoil";
import { skillsToggleState } from "@state/state";
import { Skill } from "data/models/Skill";

interface PrintSkillsProps {
  skills: Skill[];
}

const PrintSkillsList = ({ skills }: PrintSkillsProps) => {
  const setSkills = useSetRecoilState(skillsToggleState);

  return (
    <>
      {skills?.map((skill, id) => {
        const { border, rgb } = colorFullSkills(skill.name);

        const pascalCaseText = pascalCase(skill.name);
        return (
          <div key={skill.name}>
            <button
              data-testid={`skillsToggle-${id}`}
              title={skill.name}
              onClick={() => {
                const selectedSkillName = skill.name;
                const updatedSkills = skills.map((updatedSkill) => {
                  return updatedSkill.name === selectedSkillName
                    ? {
                        ...updatedSkill,
                        selected: !updatedSkill.selected,
                      }
                    : updatedSkill;
                });
                setSkills(updatedSkills);
              }}
              className={`toggle-btn py-1 text-left text-gray-900 font-semibold ${
                skill.selected ? "selected" : ""
              }`}
              style={{ background: `${rgb}`, borderColor: `${border}` }}
            >
              <span className="flex justify-start items-start text-left text-sm">
                {pascalCaseText}
              </span>
              <span
                className="mx-1 bg-indigo-50 px-1 border rounded-full"
                style={{ borderColor: `${border}` }}
              >
                {skill.count}
              </span>
            </button>
          </div>
        );
      })}
    </>
  );
};

export default PrintSkillsList;
