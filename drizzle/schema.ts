import { generateRandomText } from "@/lib/utils";
import { pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const PasteTable = pgTable("pastes", {
  id: varchar("id").primaryKey().$default(generateRandomText),
  name: varchar("name").notNull(),
  password: varchar("password"),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
