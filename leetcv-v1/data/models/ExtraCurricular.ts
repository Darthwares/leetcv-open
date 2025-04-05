import { z } from 'zod';
import { extraCurricularSchema } from 'data/schemas/extraCurricular.schema';

export type ExtraCurricular = z.infer<typeof extraCurricularSchema>;