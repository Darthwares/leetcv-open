import { requestSchema } from './../schemas/request.schema';
import { z } from 'zod';

export type Request = z.infer<typeof requestSchema>;
