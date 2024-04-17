import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const PasteTable = pgTable("pastes", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name").notNull(),
  password: varchar("password"),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
