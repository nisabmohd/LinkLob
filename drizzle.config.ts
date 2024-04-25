import type { Config } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig("./", dev);

export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL!,
  },
} satisfies Config;
