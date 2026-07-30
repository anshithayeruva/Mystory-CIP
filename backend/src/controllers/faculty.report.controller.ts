import { Request, Response, NextFunction } from 'express';
import { FacultyReportService } from '../services/faculty.report.service';
import { sendSuccess } from '../utils/response';
import { ReportExportSchema } from '../validators/faculty.validator';

export class FacultyReportController {
  static async getReports(req: Request, res: Response, next: NextFunction) {
    try {
      const reports = await FacultyReportService.getReports((req.user as any)?.id);
      return sendSuccess(res, reports, 'Reports fetched successfully');
    } catch (error) {
      next(error);
    }
  }

  static async exportReport(req: Request, res: Response, next: NextFunction) {
    try {
      const data = ReportExportSchema.parse(req.body);
      const report = await FacultyReportService.exportReport((req.user as any)?.id, data);
      return sendSuccess(res, report, 'Report exported successfully');
    } catch (error) {
      next(error);
    }
  }
}
