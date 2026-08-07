import { Request, Response, NextFunction } from 'express';
import { FacultyLiveClassroomService } from '../services/faculty.live-classroom.service';
import { LiveClassroomCreateSchema } from '../validators/faculty.validator';
import { sendSuccess } from '../utils/response';

export class FacultyLiveClassroomController {
  static async getLiveClassroom(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as any)?.id;
      const data = await FacultyLiveClassroomService.getLiveClassroomData(userId);
      return sendSuccess(res, data, 'Live classroom sessions fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createLiveClassroom(req: Request, res: Response, next: NextFunction) {
    try {
      const body = LiveClassroomCreateSchema.parse(req.body);
      const userId = (req.user as any)?.id;
      const session = await FacultyLiveClassroomService.createLiveClassroomSession(userId, body);
      return res.status(201).json({
        success: true,
        data: session,
        message: 'Live classroom session created successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async startLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const result = await FacultyLiveClassroomService.startSession(id);
      return sendSuccess(res, result, 'Live classroom session started');
    } catch (error) {
      next(error);
    }
  }

  static async endLiveSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const result = await FacultyLiveClassroomService.endSession(id);
      return sendSuccess(res, result, 'Live classroom session ended');
    } catch (error) {
      next(error);
    }
  }
}
