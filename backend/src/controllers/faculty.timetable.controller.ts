import { Request, Response, NextFunction } from 'express';
import { FacultyTimetableService } from '../services/faculty.timetable.service';
import { 
  TimetableSlotUpdateSchema, 
  ExtraSessionCreateSchema, 
  TimetableRescheduleSchema 
} from '../validators/faculty.validator';
import { sendSuccess } from '../utils/response';

export class FacultyTimetableController {
  static async getTimetable(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as any)?.id;
      const data = await FacultyTimetableService.getTimetable(userId);
      return sendSuccess(res, data, 'Timetable fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async addExtraSession(req: Request, res: Response, next: NextFunction) {
    try {
      const body = ExtraSessionCreateSchema.parse(req.body);
      const userId = (req.user as any)?.id;
      const result = await FacultyTimetableService.addExtraSession(userId, body as any);
      return res.status(201).json({
        success: true,
        data: result,
        message: 'Extra session added successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateSlot(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const body = TimetableSlotUpdateSchema.parse(req.body);
      const result = await FacultyTimetableService.updateSlot(id, body);
      return sendSuccess(res, result, 'Timetable slot updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async requestSwap(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const body = TimetableRescheduleSchema.parse(req.body);
      const result = await FacultyTimetableService.requestSwap(id, body);
      return sendSuccess(res, result, 'Slot reschedule requested successfully');
    } catch (error) {
      next(error);
    }
  }
}
