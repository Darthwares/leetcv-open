import { colorFullSkills } from "@constants/defaults";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import ViewSkillToggle from "@components/viewToggle";
import React, { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  featuredSkillsLengthState,
  profileResumeState,
  resumeFontState,
  selectedSkillState,
  showSelectedSkillState,
  skillsToggleState,
} from "../../state/state";
import { LowercaseSkill } from "data/models/UserReview";

export default function SkillsToggle() {
  const [skills, setSkills] = useRecoilState(skillsToggleState);
  const [resume] = useRecoilState(profileResumeState);
  const [selectedSkillList, setSelectedSkillList] =
    useRecoilState(selectedSkillState);
  const [showMore, setShowMore] = useState(true);
  const filteredSkills = skills?.filter((item) => item.name.trim() !== "");
  const newSkills = showMore ? filteredSkills : filteredSkills.slice(0, 5);
  const setSelectedSkill = useSetRecoilState(showSelectedSkillState);
  const setSkillsLength = useSetRecoilState(featuredSkillsLengthState);
  const [selected] = useRecoilState(resumeFontState);

  useEffect(() => {
    const combinedProjectsAndExperiences = [
      ...(resume?.projects ?? []),
      ...(resume?.experiences ?? []),
    ];

    const skillMap = new Map();

    combinedProjectsAndExperiences?.forEach((item) => {
      const uniqueSkills = new Set(item?.skills?.map((skill) => skill.trim()));

      uniqueSkills.forEach((skillName) => {
        const skillCount = skillMap.get(skillName);
        if (skillCount) {
          skillMap.set(skillName, skillCount + 1);
        } else {
          skillMap.set(skillName, 1);
        }
      });
    });

    const skillSelections = Array.from(skillMap, ([name, count]) => ({
      name,
      selected: false,
      count,
    }));

    setSkills(skillSelections);
  }, [resume]);

  const mergedSkills: LowercaseSkill[] = [];
  const lowercaseSkillsMap: { [key: string]: boolean } = {};

  useEffect(() => {
    setSkillsLength(mergedSkills?.length);
  }, [mergedSkills]);

  if (filteredSkills.length === 0) {
    return null;
  }

  newSkills.forEach((skill) => {
    const lowerCaseSkill = skill.name.toLowerCase();
    if (!lowercaseSkillsMap[lowerCaseSkill]) {
      lowercaseSkillsMap[lowerCaseSkill] = true;
      mergedSkills.push(skill);
    }
  });

  const handleSkillToggle = (selectedSkillName: string) => {
    const updatedSkills = skills.map((updatedSkill) => {
      return updatedSkill.name.toLowerCase() === selectedSkillName
        ? {
            ...updatedSkill,
            selected: !updatedSkill.selected,
          }
        : updatedSkill;
    });
    setSkills(updatedSkills);
    setSelectedSkillList(
      selectedSkillList.includes(selectedSkillName)
        ? selectedSkillList.filter((skill) => {
            const isNotSelectedSkill = skill !== selectedSkillName;
            setSelectedSkill(isNotSelectedSkill);
            return isNotSelectedSkill;
          })
        : [...selectedSkillList, selectedSkillName]
    );
  };

  return (
    <section
      className={`w-full flex pt-[2px] rounded-md bg-gradient-to-r from-slate-50 via-slate-100 to-slate-50`}
      data-testid={`skillsToggle`}
    >
      <div className="flex flex-col justify-between items-center">
        <div className="flex gap-2 flex-wrap text-left items-center rounded-md p-2 w-full print:w-full print:flex-wrap">
          {mergedSkills?.map((skill, id) => {
            const { border, rgb } = colorFullSkills(skill.name);
            return (
              <div key={skill.name}>
                <button
                  data-testid={`skillsToggle-${id}`}
                  title={skill.name}
                  onClick={() => handleSkillToggle(skill.name.toLowerCase())}
                  className={`${selected.className} toggle-btn project-skills-chip py-1 text-left text-gray-900 font-semibold`}
                  style={{
                    background: skill.selected ? "#f7e583" : `${rgb}`,
                    borderColor: `${border}`,
                  }}
                >
                  <span className="text-sm whitespace-wrap">{skill.name}</span>
                  <span
                    className="mx-1 bg-indigo-50 px-1 border rounded-full print:hidden"
                    style={{ borderColor: `${border}` }}
                  >
                    {skill.count}
                  </span>
                </button>
              </div>
            );
          })}
          <div className="print:hidden">
            {skills.length > 5 && (
              <span className="mr-5 flex items-center">
                <a
                  className="text-sm text-indigo-500 cursor-pointer inline-flex"
                  onClick={() => {
                    setShowMore(!showMore);
                  }}
                >
                  <button className="px-2 py-1 border border-indigo-500 text-indigo-500 font-normal text-sm rounded-md">
                    {showMore ? (
                      <ViewSkillToggle
                        state="See Less"
                        icon={<ChevronUpIcon className="w-5" />}
                      />
                    ) : (
                      <ViewSkillToggle
                        state="See More"
                        icon={<ChevronDownIcon className="w-5" />}
                      />
                    )}
                  </button>
                </a>
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
