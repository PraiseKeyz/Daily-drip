import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()).default(3000),
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid connection string'),
  JWT_SECRET: z.string().min(10, 'JWT_SECRET should be at least 10 characters for security'),
  APP_URL: z.string().url().default('http://localhost:3001'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.preprocess((val) => parseInt(val as string, 10), z.number()).default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);

  if (!result.success) {
    console.error('Environment validation failed! Please check your .env file:');
    result.error.issues.forEach((issue) => {
      console.error(`   - ${issue.path.join('.')}: ${issue.message}`);
    });
    throw new Error('Invalid environment configuration');
  }

  return result.data;
}