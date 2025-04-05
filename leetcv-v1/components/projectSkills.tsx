import React, { useState } from "react";
import ViewToggle from "./viewToggle";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/outline";
import { useTranslations } from "next-intl";
import PrintProjectSkills from "./printProjectSkills";

export interface ProjectSkillsProps {
  skills: string[];
}

export default function ProjectSkills({ skills }: ProjectSkillsProps) {
  const t = useTranslations("ProjectData");
  const [showMore, setShowMore] = useState(true);
  const filteredSkills = skills?.filter((item) => item.trim() !== "");
  const newSkills = showMore ? filteredSkills : filteredSkills.slice(0, 4);

  const mergedSkills: string[] = [];
  const lowercaseSkillsMap: { [key: string]: boolean } = {};

  newSkills.forEach((skill) => {
    const lowerCaseSkill = skill.toLowerCase();
    if (!lowercaseSkillsMap[lowerCaseSkill]) {
      lowercaseSkillsMap[lowerCaseSkill] = true;
      mergedSkills.push(skill);
    }
  });

  return (
    <div data-testid="project-skills">
      <div className="print:hidden flex gap-x-1 gap-y-1 flex-wrap print:-mt-3 items-center">
        <PrintProjectSkills skills={mergedSkills} />
        <div className="print:hidden">
          {filteredSkills.length > 4 && (
            <span className="mr-5 flex items-center">
              <a
                className="text-sm text-indigo-500 cursor-pointer inline-flex"
                onClick={() => {
                  setShowMore(!showMore);
                }}
              >
                <button className="px-2 py-1 border border-indigo-500 text-indigo-500 font-normal text-sm rounded-md">
                  {showMore ? (
                    <ViewToggle
                      state={t("seeLess")}
                      icon={<ChevronUpIcon className="w-5" />}
                    />
                  ) : (
                    <ViewToggle
                      state={t("seeMore")}
                      icon={<ChevronDownIcon className="w-5" />}
                    />
                  )}
                </button>
              </a>
            </span>
          )}
        </div>
      </div>
      <div className="hidden print:flex gap-x-1 gap-y-1 flex-wrap print:-mt-3 items-center">
        <PrintProjectSkills skills={filteredSkills} />
      </div>
    </div>
  );
}
