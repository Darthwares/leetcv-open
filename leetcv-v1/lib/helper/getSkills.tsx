import { Project } from "data/models/Project";
import { Skill } from "data/models/Skill";

export function getSkills(userSkills: string[], projects: Project[]) {
  let skills: Skill[] = [];
  if (userSkills && userSkills.length > 0) {
    skills = userSkills.map((skill) => {
      return {
        name: skill,
        count: 0,
        selected: false,
      } as Skill;
    });
  }
  if (projects && Array.isArray(projects) && projects.length > 0) {
    projects.forEach((project) => {
      project.skills.toString().split(',').forEach((projectSkill: string) => {
        const matchedSkill = skills.find((skill) => {
          return skill.name.toLowerCase() === projectSkill.toLowerCase();
        });
        if (matchedSkill) matchedSkill.count++;
      });
    });
  }
  return skills;
}
