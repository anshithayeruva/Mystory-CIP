import { Request, Response } from 'express';
import { AdminReportsService } from '../services/admin.reports.service';

export class AdminReportsController {
  static async getOverviewMetrics(req: Request, res: Response) {
    try {
      const metrics = await AdminReportsService.getOverviewMetrics();
      res.status(200).json({ success: true, data: metrics });
    } catch (error: any) {
      console.error('Error fetching overview metrics:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch overview metrics', error: error.message });
    }
  }

  static async getMasteryDistribution(req: Request, res: Response) {
    try {
      const mastery = await AdminReportsService.getMasteryDistribution();
      res.status(200).json({ success: true, data: mastery });
    } catch (error: any) {
      console.error('Error fetching mastery distribution:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch mastery distribution', error: error.message });
    }
  }

  static async getUnderstandingTrend(req: Request, res: Response) {
    try {
      const trend = await AdminReportsService.getUnderstandingTrend();
      res.status(200).json({ success: true, data: trend });
    } catch (error: any) {
      console.error('Error fetching understanding trend:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch understanding trend', error: error.message });
    }
  }

  static async getDepartmentPerformance(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 5;
      
      const departments = await AdminReportsService.getDepartmentPerformance(page, limit);
      res.status(200).json({ success: true, data: departments });
    } catch (error: any) {
      console.error('Error fetching department performance:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch department performance', error: error.message });
    }
  }

  static async getAvailableReports(req: Request, res: Response) {
    try {
      const reports = await AdminReportsService.getAvailableReports();
      res.status(200).json({ success: true, data: reports });
    } catch (error: any) {
      console.error('Error fetching available reports:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch available reports', error: error.message });
    }
  }

  static async downloadReport(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { format } = req.query; // format can be pdf, excel, csv

      if (!format || (format !== 'pdf' && format !== 'excel' && format !== 'csv')) {
        return res.status(400).json({ success: false, message: 'Invalid or missing format parameter (pdf, excel, csv)' });
      }

      const reportData = await AdminReportsService.generateReport(id, format as string);

      res.setHeader('Content-Type', reportData.contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${reportData.fileName}"`);
      
      res.send(reportData.buffer);
    } catch (error: any) {
      console.error('Error downloading report:', error);
      res.status(500).json({ success: false, message: 'Failed to download report', error: error.message });
    }
  }
}
