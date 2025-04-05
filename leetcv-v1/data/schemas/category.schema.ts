import { z } from "zod";

export const categorySchema = z.enum(["Projects", "Education", "Awards"]);

export const categoryReviewSchema = z.enum([
  "Projects-Review",
  "Educations-Review",
  "Awards-Review",
  "Experience-Review",
  "Publication-Review",
]);
