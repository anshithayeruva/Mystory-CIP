import { Request, Response } from 'express';
import { FacultyProfileService } from '../services/faculty.profile.service';

export class FacultyProfileController {
  static async getProfile(req: Request, res: Response) {
    try {
      const profile = await FacultyProfileService.getProfile(req.user?.id!);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateProfile(req: Request, res: Response) {
    try {
      const profile = await FacultyProfileService.updateProfile(req.user?.id!, req.body);
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
