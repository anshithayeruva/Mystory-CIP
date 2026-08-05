import { Request, Response } from 'express';
import { studentService } from '../services/student.service';
import { getStudentDashboardParams, exportReportBody, updateProfileBody, updateAcademicBody, updateNotificationsBody, updateSecurityBody } from '../validators/student.validator';

export class StudentController {
  
  public getDashboardInfo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getStudentInfo(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getTodayClasses = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getTodayClasses(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getCourses = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getStudentCourses(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getAssignments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getStudentAssignments(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getInsights = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getLearningInsights(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getAttendanceReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const semester = req.query.semester as string || 'all';
      const data = await studentService.getAttendanceAnalytics(studentId, semester);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getUnderstandingReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const semester = req.query.semester as string || 'all';
      const data = await studentService.getConceptUnderstanding(studentId, semester);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public exportReport = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const { title, type } = exportReportBody.parse(req.body);
      const data = await studentService.generateAndSaveReport(studentId, title, type);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
  public getSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getSettings(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public updateProfileSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = updateProfileBody.parse(req.body);
      const result = await studentService.updateProfile(studentId, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public updateAcademicSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = updateAcademicBody.parse(req.body);
      const result = await studentService.updateAcademic(studentId, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public updateNotificationSettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = updateNotificationsBody.parse(req.body);
      const result = await studentService.updateNotifications(studentId, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public updateSecuritySettings = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = updateSecurityBody.parse(req.body);
      const result = await studentService.updateSecurity(studentId, data);
      res.json(result);
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  public getDocuments = async (req: Request, res: Response): Promise<void> => {
    try {
      const { studentId } = getStudentDashboardParams.parse(req.params);
      const data = await studentService.getDocuments(studentId);
      res.json({ success: true, data });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
}

export const studentController = new StudentController();
