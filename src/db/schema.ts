import { timestamp, pgTable, varchar } from "drizzle-orm/pg-core";

export const Article = pgTable("article", {
  title: varchar("title").notNull(),
  source: varchar("source").notNull(),
  url: varchar("url").primaryKey().notNull(),
  createdOn: timestamp("createdOn"),
});
