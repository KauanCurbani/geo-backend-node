import { z } from "zod";

const envSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
  POPULATE_DATABASE: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = envSchema.parse(process.env);
