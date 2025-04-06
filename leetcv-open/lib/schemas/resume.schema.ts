import { z } from "zod";

export const remoteWork = z.enum(["Office", "Remote", "Both", "None"]);

export const experienceSchema = z.object({
  id: z.string(),
  company: z.string(),
  position: z.string(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  current: z.boolean().optional(),
});

export const educationSchema = z.object({
  id: z.string(),
  school: z.string(),
  degree: z.string(),
  field: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  current: z.boolean().optional(),
});

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  url: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  technologies: z.array(z.string()).optional(),
});

export const socialMediaSchema = z.object({
  id: z.string(),
  platform: z.string(),
  url: z.string(),
});

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
  portfolioLink: z.string().optional(),
  industry: z.string().optional(),
  expertize: z.string().optional(),
  name: z.string().optional(),

  skills: z.array(z.string()).optional(),
  projects: z.array(projectSchema),
  experiences: z.array(experienceSchema).optional(),
  educations: z.array(educationSchema).optional(),
  socialMedia: z.array(socialMediaSchema).optional(),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Project = z.infer<typeof projectSchema>;
export type SocialMedia = z.infer<typeof socialMediaSchema>;