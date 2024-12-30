import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const adventuresTable = sqliteTable("adventures", {
  timestamp: text("created_at")
    .default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
    .notNull()
    .primaryKey(),
  adventure: text().notNull(),
  completed: integer("boolean").default(0).notNull(),
});

export type Adventure = typeof adventuresTable.$inferSelect;

export const memoriesTable = sqliteTable("memories", {
  timestamp: text("created_at")
    .default(sql`strftime('%Y-%m-%dT%H:%M:%fZ', 'now')`)
    .notNull()
    .primaryKey(),
  memory: text().notNull(),
});

export type Memory = typeof memoriesTable.$inferSelect;
