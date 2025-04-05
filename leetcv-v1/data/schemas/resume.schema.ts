import { awardSchema } from "./award.schema";
import { educationSchema } from "./education.schema";
import { experienceSchema } from "./experience.schema";
import { projectSchema } from "./project.schema";
import { socialMediaSchema } from "./socialMedia.schema";
import { z } from "zod";
import { courseSchema } from "./course.schema";
import { certificateSchema } from "./certificate.schema";
import { publicationSchema } from "./publication.schema";
import { causeSchema } from "./cause.schema";
import { languageSchema } from "./language.schema";
import { patentSchema } from "./patentSchema.schema";
import { extraCurricularSchema } from "./extraCurricular.schema";

export const remoteWork = z.enum(["Office", "Remote", "Both", "None"]);

export const resumeSchema = z.object({
  id: z.string(),
  handle: z.string(),
  email: z.string(),
  private: z.boolean(),
  image: z.string().optional(),
  avatar: z.string().optional(),
  displayName: z.string(),
  description: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  state: z.string().optional(),
  phoneNumber: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  currentCompany: z.string().optional(),
  title: z.string().optional(),
  team: z.string().optional(),
  position: z.string().optional(),
  yoe: z.string().optional(),
  workType: z.string().optional(),
  phone: z.string().optional(),
  rating: z.number().optional(),
  remoteWork: remoteWork,
  followers: z.number().optional(),
  updatedAt: z.any().optional(),
  progress: z.number().optional(),
  showResume: z.boolean().optional(),
  dob: z.string().optional(),
  portfolioLink: z.string().optional(),
  industry: z.string().optional(),
  expertize: z.string().optional(),
  name: z.string().optional(),
  specialization: z.string().optional(),
  areaOfInterest: z.string().optional(),
  isFresher: z.boolean().optional(),
  isJoinedWaitList: z.enum(["Pending", "Waitlist", "Approved"]).optional(),
  waitListDescription: z.string().optional(),

  skills: z.array(z.string()).optional(),
  preferences: z.array(z.string()).optional(),
  projects: z.array(projectSchema),
  experiences: z.array(experienceSchema).optional(),
  awards: z.array(awardSchema).optional(),
  courses: z.array(courseSchema).optional(),
  educations: z.array(educationSchema).optional(),
  certificates: z.array(certificateSchema).optional(),
  patents: z.array(patentSchema).optional(),
  publications: z.array(publicationSchema).optional(),
  socialMedia: z.array(socialMediaSchema).optional(),
  languages: z.array(languageSchema).optional(),
  causes: z.array(causeSchema).optional(),
  hobbies: z.array(z.string()).optional(),
  causesList: z.array(z.string()).optional(),
  version: z.string(),
  yearOfExperience: z.string().optional(),
  hiddenImage: z.boolean().optional(),
  hiddenQrCode: z.boolean().optional(),
  extraCurricularActivities: z.array(extraCurricularSchema).optional(),
});
