import { educationSchema } from '../schemas/education.schema';
import { z } from 'zod';

export type Education = z.infer<typeof educationSchema>;