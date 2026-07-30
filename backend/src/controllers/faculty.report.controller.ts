import { Request, Response } from 'express';
import { FacultyReportService } from '../services/faculty.report.service';

export class FacultyReportController {
  static async getReports(req: Request, res: Response) {
    try {
      const reports = await FacultyReportService.getReports(req.user?.id!);
      res.json(reports);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async generateReport(req: Request, res: Response) {
    try {
      const report = await FacultyReportService.generateReport(req.user?.id!, req.body);
      res.status(201).json(report);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
