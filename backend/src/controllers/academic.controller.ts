import { Request, Response, NextFunction } from 'express';
import { AcademicService } from '../services/academic.service';
import { createDepartmentSchema, createProgramSchema } from '../validators/academic.validator';

export class AcademicController {
  
  static async getDepartments(req: Request, res: Response, next: NextFunction) {
    try {
      const departments = await AcademicService.getDepartments();
      res.status(200).json({ success: true, data: departments });
    } catch (error) {
      next(error);
    }
  }

  static async createDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createDepartmentSchema.parse(req.body);
      const department = await AcademicService.createDepartment(validatedData);
      res.status(201).json({ success: true, data: department });
    } catch (error) {
      next(error);
    }
  }

  static async getPrograms(req: Request, res: Response, next: NextFunction) {
    try {
      const programs = await AcademicService.getPrograms();
      res.status(200).json({ success: true, data: programs });
    } catch (error) {
      next(error);
    }
  }

  static async createProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const validatedData = createProgramSchema.parse(req.body);
      const program = await AcademicService.createProgram(validatedData);
      res.status(201).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }

  static async getProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const program = await AcademicService.getProgramById(id);
      res.status(200).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }
  static async updateDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const department = await AcademicService.updateDepartment(id, req.body);
      res.status(200).json({ success: true, data: department });
    } catch (error) {
      next(error);
    }
  }

  static async deleteDepartment(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await AcademicService.deleteDepartment(id);
      res.status(200).json({ success: true, message: 'Department deleted successfully' });
    } catch (error) {
      next(error);
    }
  }

  static async updateProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const program = await AcademicService.updateProgram(id, req.body);
      res.status(200).json({ success: true, data: program });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProgram(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await AcademicService.deleteProgram(id);
      res.status(200).json({ success: true, message: 'Program deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}
