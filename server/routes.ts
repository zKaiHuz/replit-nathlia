import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const videoProgressInput = z.object({
  videoId: z.string(),
  milestone: z.number().int().min(0).max(100),
  timestamp: z.string().optional(),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post('/api/video-progress', async (req, res) => {
    try {
      const input = videoProgressInput.parse(req.body);
      const record = await storage.recordVideoProgress({
        videoId: input.videoId,
        milestone: input.milestone,
      });
      res.status(201).json(record);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data' });
      }
      throw err;
    }
  });

  app.get('/api/video-progress/:videoId', async (req, res) => {
    const { videoId } = req.params;
    const stats = await storage.getVideoStats(videoId);
    res.json({
      videoId,
      milestones: stats,
      summary: {
        totalViews: stats.find(s => s.milestone === 10)?.count || 0,
        reached25: stats.find(s => s.milestone === 25)?.count || 0,
        reached50: stats.find(s => s.milestone === 50)?.count || 0,
        reached75: stats.find(s => s.milestone === 75)?.count || 0,
        reached90: stats.find(s => s.milestone === 90)?.count || 0,
        reached95: stats.find(s => s.milestone === 95)?.count || 0,
        completed: stats.find(s => s.milestone === 100)?.count || 0,
      },
    });
  });

  return httpServer;
}
