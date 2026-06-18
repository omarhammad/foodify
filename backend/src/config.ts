import dotenv from 'dotenv';
import { z } from 'zod';

const env = process.env.NODE_ENV ?? 'dev';

// Later files override earlier ones — base, then env-specific, then local
dotenv.config({ path: '.env' });
dotenv.config({ path: `.env.${env}`, override: true });
dotenv.config({ path: '.env.local', override: true });

const schema = z.object({
    NODE_ENV: z.enum(['dev', 'prod', 'test']).default('dev'),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    console.error('❌ Invalid environment config:\n' + z.prettifyError(parsed.error));
    process.exit(1);
}

export const config = parsed.data;