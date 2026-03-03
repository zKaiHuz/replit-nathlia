import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
});

export const insertLeadSchema = createInsertSchema(leads).pick({
  email: true,
});

export type InsertLead = z.infer<typeof insertLeadSchema>;
export type Lead = typeof leads.$inferSelect;

export const videoProgress = pgTable("video_progress", {
  id: serial("id").primaryKey(),
  videoId: text("video_id").notNull(),
  milestone: integer("milestone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertVideoProgressSchema = createInsertSchema(videoProgress).pick({
  videoId: true,
  milestone: true,
});

export type InsertVideoProgress = z.infer<typeof insertVideoProgressSchema>;
export type VideoProgress = typeof videoProgress.$inferSelect;
