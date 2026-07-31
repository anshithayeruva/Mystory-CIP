import { Request, Response, NextFunction } from 'express';
import { FacultyPulseSessionService } from '../services/faculty.pulse-session.service';
import { sendSuccess } from '../utils/response';
import { PulseSessionCreateSchema, PulseSessionUpdateSchema } from '../validators/faculty.validator';

export class FacultyPulseSessionController {
  static async getPulseSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const sessions = await FacultyPulseSessionService.getPulseSessions((req.user as any)?.id);
      return sendSuccess(res, sessions, 'Sessions fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createPulseSession(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PulseSessionCreateSchema.parse(req.body);
      const session = await FacultyPulseSessionService.createPulseSession((req.user as any)?.id, data);
      return res.status(201).json({ success: true, data: session, message: 'Session created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async getPulseSessionById(req: Request, res: Response, next: NextFunction) {
    try {
      const session = await FacultyPulseSessionService.getPulseSessionById((req.params as { id: string }).id);
      return sendSuccess(res, session, 'Session fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async updatePulseSession(req: Request, res: Response, next: NextFunction) {
    try {
      const data = PulseSessionUpdateSchema.parse(req.body);
      const session = await FacultyPulseSessionService.updatePulseSession((req.params as { id: string }).id, data);
      return sendSuccess(res, session, 'Session updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deletePulseSession(req: Request, res: Response, next: NextFunction) {
    try {
      await FacultyPulseSessionService.deletePulseSession((req.params as { id: string }).id);
      return sendSuccess(res, null, 'Session deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  static async startLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FacultyPulseSessionService.startLiveSession((req.params as { id: string }).id);
      return sendSuccess(res, result, 'Live session started');
    } catch (error) {
      next(error);
    }
  }

  static async pauseLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FacultyPulseSessionService.pauseLiveSession((req.params as { id: string }).id);
      return sendSuccess(res, result, 'Live session paused');
    } catch (error) {
      next(error);
    }
  }

  static async resumeLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FacultyPulseSessionService.resumeLiveSession((req.params as { id: string }).id);
      return sendSuccess(res, result, 'Live session resumed');
    } catch (error) {
      next(error);
    }
  }

  static async endLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FacultyPulseSessionService.endLiveSession((req.params as { id: string }).id);
      return sendSuccess(res, result, 'Live session ended');
    } catch (error) {
      next(error);
    }
  }

  static async getLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await FacultyPulseSessionService.getLiveSession((req.params as { id: string }).id);
      return sendSuccess(res, result, 'Live session details');
    } catch (error) {
      next(error);
    }
  }

  static async getSessionSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const summary = await FacultyPulseSessionService.getSessionSummary((req.params as { id: string }).id);
      return sendSuccess(res, summary, 'Session summary');
    } catch (error) {
      next(error);
    }
  }

  static async getAllSessionSummaries(req: Request, res: Response, next: NextFunction) {
    try {
      const summaries = await FacultyPulseSessionService.getAllSessionSummaries((req.user as any)?.id);
      return sendSuccess(res, summaries, 'All session summaries');
    } catch (error) {
      next(error);
    }
  }

  static async getConceptGapAnalysis(req: Request, res: Response, next: NextFunction) {
    try {
      const analysis = await FacultyPulseSessionService.getConceptGapAnalysis((req.params as { subjectId: string }).subjectId);
      return sendSuccess(res, analysis, 'Concept gap analysis');
    } catch (error) {
      next(error);
    }
  }

  static async getAllConceptGaps(req: Request, res: Response, next: NextFunction) {
    try {
      const analysis = await FacultyPulseSessionService.getAllConceptGaps((req.user as any)?.id);
      return sendSuccess(res, analysis, 'All concept gaps');
    } catch (error) {
      next(error);
    }
  }
}
