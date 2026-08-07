import { Request, Response, NextFunction } from 'express';
import { FacultyResourceService } from '../services/faculty.resource.service';
import { ResourceCreateSchema } from '../validators/faculty.validator';
import { sendSuccess } from '../utils/response';

export class FacultyResourceController {
  static async getResources(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req.user as any)?.id;
      const data = await FacultyResourceService.getResources(userId);
      return sendSuccess(res, data, 'Resources fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async uploadResource(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = {
        courseCode: req.body.courseCode || 'CSE 301',
        category: req.body.category || 'Lecture Notes',
        title: req.body.title || (req.file ? req.file.originalname : 'Untitled Resource'),
        format: req.body.format,
        visibleTo: req.body.visibleTo
      };

      const body = ResourceCreateSchema.parse(payload);
      const userId = (req.user as any)?.id;
      const file = req.file;

      const result = await FacultyResourceService.uploadResource(userId, body, file);
      return res.status(201).json({
        success: true,
        data: result,
        message: 'Resource uploaded successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteResource(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const userId = (req.user as any)?.id;
      const result = await FacultyResourceService.deleteResource(userId, id);
      return sendSuccess(res, result, 'Resource deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
