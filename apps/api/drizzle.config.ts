import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// Load environment variables
config();

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schemas/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:123noobgg123++@localhost:1453/postgres',
  },
});
