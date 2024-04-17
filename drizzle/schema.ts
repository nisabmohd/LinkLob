import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const PasteTable = pgTable(
  "pastes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    paste: varchar("paste")
      .notNull()
      .$default(() => {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "";
        for (let i = 0; i < 6; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          result += characters.charAt(randomIndex);
        }
        return result;
      }),
    name: varchar("name").notNull(),
    password: varchar("password"),
    content: text("content").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
  },
  (table) => {
    return {
      pasteIndex: uniqueIndex("pasteIndex").on(table.paste),
    };
  }
);
