import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'
env

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './.migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL
  }

})