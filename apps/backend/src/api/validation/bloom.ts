import { z } from "zod";

export const bloomData = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  dailytimeGoal: z
    .number()
    .min(5, {
      message: "Daily Commitment must be at least 5 minutes",
    })
    .max(480, {
      message: "Daily Commitment cannot exceed 480 minutes",
    }),
});
