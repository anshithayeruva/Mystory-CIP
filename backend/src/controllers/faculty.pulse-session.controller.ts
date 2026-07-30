import { Request, Response } from 'express';
import { FacultyPulseSessionService } from '../services/faculty.pulse-session.service';

export class FacultyPulseSessionController {
  static async getPulseSessions(req: Request, res: Response) {
    try {
      const sessions = await FacultyPulseSessionService.getPulseSessions((req.user as any)?.id as string);
      res.json(sessions);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async createPulseSession(req: Request, res: Response) {
    try {
      const session = await FacultyPulseSessionService.createPulseSession((req.user as any)?.id as string, req.body);
      res.status(201).json(session);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getPulseSessionById(req: Request, res: Response) {
    try {
      const session = await FacultyPulseSessionService.getPulseSessionById((req.params as { id: string }).id);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updatePulseSession(req: Request, res: Response) {
    try {
      const session = await FacultyPulseSessionService.updatePulseSession((req.params as { id: string }).id, req.body);
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async deletePulseSession(req: Request, res: Response) {
    try {
      await FacultyPulseSessionService.deletePulseSession((req.params as { id: string }).id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async startLiveSession(req: Request, res: Response) {
    try {
      const result = await FacultyPulseSessionService.startLiveSession((req.params as { id: string }).id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async endLiveSession(req: Request, res: Response) {
    try {
      const result = await FacultyPulseSessionService.endLiveSession((req.params as { id: string }).id);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getSessionSummary(req: Request, res: Response) {
    try {
      const summary = await FacultyPulseSessionService.getSessionSummary((req.params as { id: string }).id);
      res.json(summary);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getConceptGapAnalysis(req: Request, res: Response) {
    try {
      const analysis = await FacultyPulseSessionService.getConceptGapAnalysis((req.user as any)?.id as string);
      res.json(analysis);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
