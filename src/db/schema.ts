import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const contactSubmissions = pgTable("contact_submissions", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  company: varchar("company", { length: 255 }),
  service: varchar("service", { length: 255 }),
  budget: varchar("budget", { length: 255 }),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
