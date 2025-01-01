import { z } from "zod";

export const activitySchema = z.object({
  name: z.string(),
});

export const activityRecordSchema = z.object({
  value: z.string(),
  logId: z.number(),
  activityId: z.number(),
});
