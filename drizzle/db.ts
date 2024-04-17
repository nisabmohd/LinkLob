import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import * as schema from "./schema";

export const dbClient = drizzle(sql, {
  logger: true,
  schema,
});
