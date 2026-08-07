import { Request, Response, NextFunction } from 'express';
import { FacultyStudentsService } from '../services/faculty.students.service';
import { sendSuccess } from '../utils/response';

export class FacultyStudentsController {
  static async getStudents(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as any)?.id;
      const data = await FacultyStudentsService.getStudents(userId, req.query);
      return sendSuccess(res, data, 'Student directory fetched successfully');
    } catch (error) {
      next(error);
    }
  }
}
