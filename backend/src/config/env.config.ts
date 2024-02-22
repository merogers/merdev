import 'dotenv/config';
import { z } from 'zod';

// Type Safe Environment Variables
const envSchema = z.object({
  PORT: z.string().optional(),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  MONGO_URI: z.string().trim().min(1),
  AWS_ACCESS_KEY_ID: z.string().trim().min(1),
  AWS_SECRET_ACCESS_KEY: z.string().trim().min(1),
  AWS_SES_TO: z.string().trim().min(1),
  AWS_SES_FROM: z.string().trim().min(1),
  AWS_REGION: z.string().trim().min(1),
  AWS_BUCKET: z.string().trim().min(1),
  JWT_SECRET: z.string().trim().min(1),
  CRYPTO_SECRET: z.string().trim().min(1),
  ORIGIN: z.string().trim().min(1),
});

export const env = envSchema.parse(process.env);
