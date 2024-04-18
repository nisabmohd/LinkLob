import { loadEnvConfig } from "@next/env";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { sql } from "@vercel/postgres";

const dev = process.env.NODE_ENV !== "production";
loadEnvConfig("./", dev);

const migrationClient = drizzle(sql);
migrate(migrationClient, { migrationsFolder: "drizzle/migrations" });
