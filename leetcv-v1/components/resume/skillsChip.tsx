import React, { useState } from "react";
import { Chips } from "primereact/chips";
import { useRecoilState } from "recoil";
import { resumeState } from "@state/state";
import { Project } from "data/models/Project";
import { useTranslations } from "next-intl";

export interface SkillsChipProps {
  project: Project;
  property: "skills";
}
const SkillsChip = (props: any) => {
  const t = useTranslations("Dashboard");
  const [userInfo, setUserInfo] = useRecoilState(resumeState);
  const [activeProject, setActiveProject] = useState<Project>(props.project);
  const [skills, setSkills] = useState(
    activeProject ? props.project.skills : props.skills
  );
  return (
    <div data-testid="skills">
      <Chips
        className="block"
        value={skills}
        separator=","
        onChange={(e) => {
          setSkills(e.target.value);
          let { id, value } = e.target;
          let uniqueSkill = [
            ...new Set(
              value.map(
                (skill) => `${skill.charAt(0).toUpperCase()}${skill.slice(1)}`
              )
            ),
          ];
          if (activeProject) {
            setActiveProject({ ...activeProject, [id]: uniqueSkill });
          }
          if (userInfo) {
            setUserInfo({
              ...userInfo,
              projects: userInfo.projects?.map((proj: Project) => {
                if (proj.id === activeProject?.id) {
                  return { ...proj, [props.property]: uniqueSkill };
                }
                return proj;
              }),
            });
          }
          if (userInfo && !activeProject) {
            setUserInfo({ ...userInfo, ["skills"]: uniqueSkill });
          }
        }}
        placeholder={t("placeholderText")}
      />
    </div>
  );
};

export default SkillsChip;
