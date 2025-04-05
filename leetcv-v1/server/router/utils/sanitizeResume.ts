import { Resume } from "data/models/UserInfo";

export function sanitizeResume(resume: Resume) {
  if (resume["languages"] === undefined) {
    resume["languages"] = [];
  }
  if (resume["preferences"] === undefined) {
    resume["preferences"] = [];
  }
  if (resume["experiences"] === undefined) {
    resume.experiences = [];
  } else {
    resume.experiences.forEach((experience) => {
      if (experience["skills"] === undefined) {
        experience.skills = [];
      }
    });
  }
  if (resume["socialMedia"] === undefined) {
    resume["socialMedia"] = [];
  }
  if (resume["awards"] === undefined) {
    resume["awards"] = [];
  }
  if (resume["projects"] === undefined) {
    resume["projects"] = [];
  }
  if (resume["educations"] === undefined) {
    resume["educations"] = [];
  }
  if (resume["skills"] === undefined) {
    resume["skills"] = [];
  }
  if (resume["address"] === undefined) {
    resume["address"] = "";
  }
  if (resume["remoteWork"] === undefined) {
    resume["remoteWork"] = "Both";
  }
  if (resume["courses"] === undefined) {
    resume["courses"] = [];
  }
  if (resume["certificates"] === undefined) {
    resume["certificates"] = [];
  }
  if (resume["patents"] === undefined) {
    resume["patents"] = [];
  }
  if (resume["publications"] === undefined) {
    resume["publications"] = [];
  }
  if (resume["yearOfExperience"] === undefined) {
    resume["yearOfExperience"] = "0,0";
  }
  if (resume.followers === undefined) {
    resume.followers = 0;
  }
  if (resume.rating === undefined) {
    resume.rating = 0;
  }
  if (resume.phone === undefined) {
    resume.phone = "";
  }
  if (resume.workType === undefined) {
    resume.workType = "";
  }
  if (resume["hobbies"] === undefined) {
    resume["hobbies"] = [];
  }
  if (resume["showResume"] === undefined) {
    resume["showResume"] = false;
  }
  if (resume["causes"] === undefined) {
    resume["causes"] = [];
  }
  if (resume["causesList"] === undefined) {
    resume["causesList"] = [];
  }
  if (resume["avatar"] === undefined) {
    resume["avatar"] = "";
  }
  if (resume["image"] === undefined) {
    resume["image"] = "";
  }
  if (resume["progress"] === undefined) {
    resume["progress"] = 0;
  }
  if (resume["version"] === undefined) {
    resume["version"] = "1.0";
  }
  if (resume["yoe"] === undefined) {
    resume["yoe"] = "";
  }
  if (resume["position"] === undefined) {
    resume["position"] = "";
  }
  if (resume["description"] === undefined) {
    resume["description"] = "";
  }
  if (resume["dob"] === undefined) {
    resume["dob"] = "";
  }
  if (resume["portfolioLink"] === undefined) {
    resume["portfolioLink"] = "";
  }
  if (resume["yearOfExperience"] === undefined) {
    resume["yearOfExperience"] = "";
  }
  if (resume["isJoinedWaitList"] === undefined) {
    resume["isJoinedWaitList"] = "Waitlist";
  }
  if (resume["waitListDescription"] === undefined) {
    resume["waitListDescription"] = "";
  }
  if (resume["hiddenImage"] === undefined) {
    resume["hiddenImage"] = false;
  }
  if (resume["hiddenQrCode"] === undefined) {
    resume["hiddenQrCode"] = false;
  }
  if (resume["patents"] === undefined) {
    resume["patents"] = [];
  }
}
