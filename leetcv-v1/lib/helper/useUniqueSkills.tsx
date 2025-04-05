import { Resume } from "data/models/UserInfo";
import { useMemo } from "react";

export const useUniqueSkills = (resume: Resume): string[] => {
  return useMemo(() => {
    const resumeSkills = resume.skills?.map((skill) => skill) || [];
    const projectSkills =
      resume.projects?.flatMap((project) =>
        project.skills.map((skill) => skill)
      ) || [];

    const allSkills = [...resumeSkills, ...projectSkills].filter(
      (skill) => skill.trim() !== ""
    );

    const uniqueSkillsMap = new Map<string, string>();

    allSkills.forEach((skill) => {
      const lowerCaseSkill = skill.toLowerCase();
      if (!uniqueSkillsMap.has(lowerCaseSkill)) {
        uniqueSkillsMap.set(lowerCaseSkill, skill);
      }
    });

    return Array.from(uniqueSkillsMap.values());
  }, [resume]);
};
