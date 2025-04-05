import { Project } from "data/models/Project";
import { Resume } from "data/models/UserInfo";
export function getUniqueSkills(skillList: string[]) {
  const skills = skillList
    .filter((skill) => skill.trim() !== "")
    .map((skill) => skill.trimStart())
    .filter((skill, index, arr) => arr.indexOf(skill) === index);
  return skills;
}
export async function getResumeDetails(
  inputBox: { id: number; value: string }[],
  resume: Resume,
  description: string,
  work: string,
  impact: string,
  newProjectSkills: Project[]
) {
  for (const item of inputBox) {
    let title = "";
    const resp = await fetch("/api/openai/generateWizardSkills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: item.value,
        expertize: resume.expertize!,
        yoe: resume.yoe!,
        industry: resume.industry,
        position: resume.areaOfInterest,
      }),
    });
    const res = await resp.json();

    const skills = res?.skill!;
    description = res?.description!?.trim();
    title = res?.title!?.replace(/(\r\n|\n|\r"|\.)/gm, "").trim();
    work = res?.work!;
    impact = res?.impact!;
    newProjectSkills.push({
      id: `${newProjectSkills.length}`,
      name: title,
      skills: skills
        ?.replace(/(\r\n|\n|\r)|(years|year\n)|([\]']|[\[\]"])/gm, "")
        .split(","),
      company: "",
      title: title,
      start: "2021-01",
      end: "2023-01",
      work,
      impact,
      url: "",
    });
  }
  return { description, work, impact };
}
