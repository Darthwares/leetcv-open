import { requestListSchema } from "data/schemas/requestList.schema";
import { z } from "zod";

export type RequestList = z.infer<typeof requestListSchema>;
