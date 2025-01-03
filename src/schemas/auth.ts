import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z.string(),
});

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
