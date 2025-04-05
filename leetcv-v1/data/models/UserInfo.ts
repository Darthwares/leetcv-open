import { resumeSchema } from "data/schemas/resume.schema";
import { userTokenSchema } from "data/schemas/userToken.schema";
import { RequestApproval } from "types/dashboardTypes";
import { z } from "zod";

export const ProjectFields = [
  "name",
  "start",
  "end",
  "company",
  "title",
  "skills",
  "summary",
  "impact",
  "learnings",
];

export const AwardFields = ["name", "year", "description"];

export const EducationFields = ["name", "degree", "major", "grade"];

export type Resume = z.infer<typeof resumeSchema>;

export type UserToken = z.infer<typeof userTokenSchema>;

export interface OutgoingRequestProps {
  outgoingRequests: RequestApproval[];
}

export interface ReviewsProps {
  reviews: any;
  currentMessage: { content: string; author: string; date: string };
}
