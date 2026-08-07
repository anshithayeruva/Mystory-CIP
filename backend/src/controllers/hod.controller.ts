import { Request, Response } from 'express';
import { HodService } from '../services/hod.service';
import { sendSuccess, sendError } from '../utils/response';

export class HodController {
  // ==========================================
  // DASHBOARD
  // ==========================================
  static async getDashboard(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const data = await HodService.getDashboardData(userId);
      return sendSuccess(res, data, 'HOD Dashboard data retrieved successfully');
    } catch (error: any) {
      console.error('HOD Dashboard error:', error);
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch HOD dashboard');
    }
  }

  // ==========================================
  // FACULTY MANAGEMENT
  // ==========================================
  static async getFacultyList(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const result = await HodService.getFacultyList(userId, req.query);
      return sendSuccess(res, result, 'Faculty list retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch faculty list');
    }
  }

  static async getFacultyById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const faculty = await HodService.getFacultyById(id);
      return sendSuccess(res, faculty, 'Faculty details retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch faculty details');
    }
  }

  static async createFaculty(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const newFaculty = await HodService.createFaculty(userId, req.body);
      return sendSuccess(res, newFaculty, 'Faculty member added successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to add faculty member');
    }
  }

  static async updateFaculty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedFaculty = await HodService.updateFaculty(id, req.body);
      return sendSuccess(res, updatedFaculty, 'Faculty member updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update faculty member');
    }
  }

  static async deleteFaculty(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await HodService.deleteFaculty(id);
      return sendSuccess(res, result, 'Faculty member deleted successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to delete faculty member');
    }
  }

  // ==========================================
  // STUDENTS MANAGEMENT
  // ==========================================
  static async getStudentsList(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const result = await HodService.getStudentsList(userId, req.query);
      return sendSuccess(res, result, 'Students list retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch students list');
    }
  }

  static async getStudentById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const student = await HodService.getStudentById(id);
      return sendSuccess(res, student, 'Student details retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch student details');
    }
  }

  static async createStudent(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const newStudent = await HodService.createStudent(userId, req.body);
      return sendSuccess(res, newStudent, 'Student added successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to add student');
    }
  }

  static async updateStudent(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedStudent = await HodService.updateStudent(id, req.body);
      return sendSuccess(res, updatedStudent, 'Student updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update student');
    }
  }

  static async deleteStudent(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await HodService.deleteStudent(id);
      return sendSuccess(res, result, 'Student deleted successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to delete student');
    }
  }

  // ==========================================
  // SUBJECTS / COURSES MANAGEMENT
  // ==========================================
  static async getSubjectsList(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const result = await HodService.getSubjectsList(userId, req.query);
      return sendSuccess(res, result, 'Subjects list retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch subjects list');
    }
  }

  static async getSubjectById(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const subject = await HodService.getSubjectById(id);
      return sendSuccess(res, subject, 'Subject details retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch subject details');
    }
  }

  static async createSubject(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const newSubject = await HodService.createSubject(userId, req.body);
      return sendSuccess(res, newSubject, 'Subject created successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to create subject');
    }
  }

  static async updateSubject(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const updatedSubject = await HodService.updateSubject(id, req.body);
      return sendSuccess(res, updatedSubject, 'Subject updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update subject');
    }
  }

  static async deleteSubject(req: Request, res: Response) {
    try {
      const id = req.params.id as string;
      const result = await HodService.deleteSubject(id);
      return sendSuccess(res, result, 'Subject deleted successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to delete subject');
    }
  }

  // ==========================================
  // REPORTS & ANALYTICS
  // ==========================================
  static async getDepartmentReports(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const reports = await HodService.getDepartmentReports(userId);
      return sendSuccess(res, reports, 'Department reports retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch department reports');
    }
  }

  static async exportReport(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const result = await HodService.exportReport(userId, req.body);
      return sendSuccess(res, result, 'Report exported successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to export report');
    }
  }

  // ==========================================
  // SETTINGS & PROFILE
  // ==========================================
  static async getSettings(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const settings = await HodService.getSettings(userId);
      return sendSuccess(res, settings, 'Settings retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch settings');
    }
  }

  static async updateSettings(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const result = await HodService.updateSettings(userId, req.body);
      return sendSuccess(res, result, 'Settings updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update settings');
    }
  }

  // ==========================================
  // ACCOUNT PROFILE & SECURITY
  // ==========================================
  static async getAccountProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const account = await HodService.getAccountProfile(userId);
      return sendSuccess(res, account, 'Account profile retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch account profile');
    }
  }

  static async updateAccountProfile(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const result = await HodService.updateAccountProfile(userId, req.body);
      return sendSuccess(res, result, 'Account profile updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update account profile');
    }
  }

  static async updateAccountPassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const result = await HodService.updateAccountPassword(userId, req.body);
      return sendSuccess(res, result, 'Account password updated successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to update account password');
    }
  }

  // Cross-Module Flow: Reschedule & Swap Approvals
  static async getRescheduleRequests(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const result = await HodService.getRescheduleRequests(userId);
      return sendSuccess(res, result, 'Reschedule requests retrieved successfully');
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to fetch reschedule requests');
    }
  }

  static async approveRescheduleRequest(req: Request, res: Response) {
    try {
      const userId = req.user?.id || 'dev-user';
      const { requestId, status } = req.body;
      const result = await HodService.approveRescheduleRequest(userId, requestId, status);
      return sendSuccess(res, result, `Reschedule request ${status?.toLowerCase()} successfully`);
    } catch (error: any) {
      return sendError(res, error.statusCode || 500, error.message || 'Failed to process reschedule request');
    }
  }
}

