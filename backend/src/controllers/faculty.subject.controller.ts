import { Request, Response } from 'express';
import { FacultySubjectService } from '../services/faculty.subject.service';

export class FacultySubjectController {
  static async getSubjects(req: Request, res: Response) {
    try {
      const subjects = await FacultySubjectService.getSubjects((req.user as any)?.id as string);
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getSubjectById(req: Request, res: Response) {
    try {
      const subject = await FacultySubjectService.getSubjectById((req.params as { id: string }).id);
      res.json(subject);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
