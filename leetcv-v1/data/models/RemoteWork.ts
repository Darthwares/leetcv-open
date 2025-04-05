import { remoteWork } from './../schemas/resume.schema';
import { z } from 'zod';

export type RemoteWork = z.infer<typeof remoteWork>;