import { Request, Response, NextFunction } from 'express';
import { FacultySubjectService } from '../services/faculty.subject.service';
import { sendSuccess } from '../utils/response';
import { SubjectQuerySchema, SubjectCreateSchema, SubjectUpdateSchema } from '../validators/faculty.validator';

export class FacultySubjectController {
  static async getSubjects(req: Request, res: Response, next: NextFunction) {
    try {
      const query = SubjectQuerySchema.parse(req.query);
      const subjects = await FacultySubjectService.getSubjects((req.user as any)?.id, query);
      return sendSuccess(res, subjects, 'Subjects fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async getSubjectById(req: Request, res: Response, next: NextFunction) {
    try {
      const subject = await FacultySubjectService.getSubjectById((req.params as { id: string }).id);
      return sendSuccess(res, subject, 'Subject fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = SubjectCreateSchema.parse(req.body);
      const subject = await FacultySubjectService.createSubject((req.user as any)?.id, data);
      return res.status(201).json({ success: true, data: subject, message: 'Subject created successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async updateSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const data = SubjectUpdateSchema.parse(req.body);
      const subject = await FacultySubjectService.updateSubject((req.params as { id: string }).id, data);
      return sendSuccess(res, subject, 'Subject updated successfully');
    } catch (error) {
      next(error);
    }
  }

  static async deleteSubject(req: Request, res: Response, next: NextFunction) {
    try {
      await FacultySubjectService.deleteSubject((req.params as { id: string }).id);
      return sendSuccess(res, null, 'Subject deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
