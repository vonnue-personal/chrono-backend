import { z } from "zod";

export const eventSchema = z.object({
  projectId: z.number(),
  description: z.string(),
  startTime: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format, Must be ISO 8601,",
  }),
});

export const getEventsSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format. Must be ISO 8601 or 'YYYY-MM-DD'.",
  }),
});
