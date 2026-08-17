import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { Role } from '@prisma/client';

const COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
};

export class UserController {
  // ─────────────────────────────────────────────
  // Auth
  // ─────────────────────────────────────────────

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ success: false, message: 'Email and password are required' });
        return;
      }

      const result = await UserService.login(email, password);

      // Set httpOnly cookie
      res.cookie('token', result.token, COOKIE_OPTIONS);

      res.json({
        success: true,
        mustChangePassword: result.mustChangePassword,
        user: result.user,
      });
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message || 'Login failed' });
    }
  }

  static async changePassword(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      if (!userId) {
        res.status(401).json({ success: false, message: 'Unauthorized' });
        return;
      }

      const { currentPassword, newPassword, confirmPassword } = req.body;

      if (!currentPassword || !newPassword) {
        res.status(400).json({ success: false, message: 'currentPassword and newPassword are required' });
        return;
      }

      if (newPassword !== confirmPassword) {
        res.status(400).json({ success: false, message: 'Passwords do not match' });
        return;
      }

      const result = await UserService.changePassword(userId, currentPassword, newPassword);

      // Refresh cookie with new token (mustChangePassword: false)
      res.cookie('token', result.token, COOKIE_OPTIONS);

      res.json({ success: true, message: 'Password changed successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async logout(req: Request, res: Response) {
    res.clearCookie('token', { path: '/' });
    res.json({ success: true, message: 'Logged out' });
  }

  // ─────────────────────────────────────────────
  // User Listing (Admin)
  // ─────────────────────────────────────────────

  static async getUsers(req: Request, res: Response) {
    try {
      const page = parseInt(req.query['page'] as string) || 1;
      const limit = parseInt(req.query['limit'] as string) || 10;
      const roleStr = req.query['role'] as string;

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
}
