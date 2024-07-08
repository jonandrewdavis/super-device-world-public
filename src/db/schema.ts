import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "pending",
  "scheduled",
  "available",
]);

export const itemsTable = pgTable("items_table", {
  id: serial("id").primaryKey(),
  uuid: uuid("uuid").defaultRandom(),
  name: text("name").notNull(),
  device: text("device").notNull(),
  path: text("path").notNull(),
  status: statusEnum("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export type InsertItem = typeof itemsTable.$inferInsert;
export type SelectItem = typeof itemsTable.$inferSelect;
