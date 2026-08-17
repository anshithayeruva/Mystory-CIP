import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../lib/auth';
import { Role } from '@prisma/client';

/**
 * Middleware to protect routes for ADMIN role only.
 * Reads the JWT from the httpOnly `token` cookie (or Bearer header).
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  let token = req.cookies?.token as string | undefined;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Unauthorized: No token provided' });
    return;
  }

  const payload = verifyToken(token);
  if (!payload || !payload.sub) {
    res.status(401).json({ success: false, message: 'Unauthorized: Invalid or expired token' });
    return;
  }

  if (payload.role !== Role.ADMIN) {
    res.status(403).json({ success: false, message: 'Forbidden: Admin access required' });
    return;
  }

  req.user = {
    id: payload.sub,
    role: payload.role,
    mustChangePassword: payload.mustChangePassword ?? false,
  };

  next();
};
