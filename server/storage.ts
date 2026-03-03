import { leads, videoProgress, type InsertLead, type Lead, type InsertVideoProgress, type VideoProgress } from "@shared/schema";
import { db } from "./db";
import { eq, sql } from "drizzle-orm";

export interface IStorage {
  createLead(lead: InsertLead): Promise<Lead>;
  recordVideoProgress(data: InsertVideoProgress): Promise<VideoProgress>;
  getVideoStats(videoId: string): Promise<{ milestone: number; count: number }[]>;
}

export class DatabaseStorage implements IStorage {
  async createLead(insertLead: InsertLead): Promise<Lead> {
    const [lead] = await db.insert(leads).values(insertLead).returning();
    return lead;
  }

  async recordVideoProgress(data: InsertVideoProgress): Promise<VideoProgress> {
    const [record] = await db.insert(videoProgress).values(data).returning();
    return record;
  }

  async getVideoStats(videoId: string): Promise<{ milestone: number; count: number }[]> {
    const results = await db
      .select({
        milestone: videoProgress.milestone,
        count: sql<number>`count(*)::int`,
      })
      .from(videoProgress)
      .where(eq(videoProgress.videoId, videoId))
      .groupBy(videoProgress.milestone)
      .orderBy(videoProgress.milestone);
    return results;
  }
}

export const storage = new DatabaseStorage();
