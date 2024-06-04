// previous version of drizzle is deprecated. Thankyou stack overflow

import { defineConfig } from "drizzle-kit";
import type { Config } from "drizzle-kit"
import dotenv from "dotenv"

dotenv.config({
    path: ".env.local",
})

export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
});