import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./supabase/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: `postgresql://postgres.fgjlctaohaspvukcsxoc:${process.env.SUPABASE_PW!}@aws-0-us-east-1.pooler.supabase.com:6543/postgres`,
  },
});
