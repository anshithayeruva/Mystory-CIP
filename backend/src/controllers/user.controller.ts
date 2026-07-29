import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { createUserSchema } from '../validators/user.validator';
import { Role } from '@prisma/client';

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const roleStr = req.query.role as string;
      
      let role: Role | undefined;
      if (roleStr === 'STUDENT') role = Role.STUDENT;
      if (roleStr === 'FACULTY') role = Role.FACULTY;
      if (roleStr === 'HOD') role = Role.HOD;

      const result = await UserService.getUsers(page, limit, role);
      res.json(result);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users', details: error.message });
    }
  }

  static async createUser(req: Request, res: Response) {
    try {
      const validatedData = createUserSchema.parse(req.body);
      const result = await UserService.createUser(validatedData);
      res.status(201).json({ message: 'User created successfully', data: result });
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error.name === 'ZodError') {
        res.status(400).json({ error: 'Validation error', details: error.errors });
      } else {
        res.status(400).json({ error: error.message });
      }
    }
  }
}
