import { z } from 'zod';
import { awardSchema } from 'data/schemas/award.schema';

export type Award = z.infer<typeof awardSchema>;