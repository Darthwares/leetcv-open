import { z } from 'zod';
import { prospectSchema } from 'data/schemas/prospect.schema';

export type Prospect = z.infer<typeof prospectSchema>;