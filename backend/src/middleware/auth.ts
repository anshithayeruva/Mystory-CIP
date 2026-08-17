import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../lib/auth';
import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
        mustChangePassword: boolean;
      };
    }
  }
}

/**
 * Requires a valid JWT in the `token` httpOnly cookie.
 * Populates req.user with { id, role, mustChangePassword }.
 * Returns 401 if missing or invalid — no dev bypass.
 */
export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  // 1. Read from httpOnly cookie first (primary), then Bearer header (fallback)
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

  req.user = {
    id: payload.sub,
    role: payload.role,
    mustChangePassword: payload.mustChangePassword ?? false,
  };

  next();
};

/**
 * Middleware to restrict routes to specific roles.
 */
export const requireRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ success: false, message: `Forbidden: requires one of [${allowedRoles.join(', ')}]` });
      return;
    }
    next();
  };
};
