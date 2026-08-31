import { json, pgEnum, pgTable, text, timestamp, varchar, serial } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */

export const roleEnum = pgEnum("role", ["user", "admin"]);

export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const quoteRequests = pgTable("quoteRequests", {
  id: serial("id").primaryKey(),
  reference: varchar("reference", { length: 32 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  phone: varchar("phone", { length: 80 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  company: varchar("company", { length: 240 }),
  notes: text("notes"),
  itemsJson: json("itemsJson").notNull(),
  attachmentsJson: json("attachmentsJson"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuoteRequest = typeof quoteRequests.$inferSelect;
