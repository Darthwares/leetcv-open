import { z } from 'zod';
import { projectSchema } from '../schemas/project.schema';

export type Project = z.infer<typeof projectSchema>;