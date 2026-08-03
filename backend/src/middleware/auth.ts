import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../lib/auth';
import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check Authorization header first
    const authHeader = req.headers.authorization;
    let token = '';
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1] || '';
    } else if (req.cookies && req.cookies.session) {
      // Fallback to cookie if present
      token = req.cookies.session;
    }

    if (token) {
      const payload = verifyToken(token);
      if (payload) {
        req.user = payload;
        return next();
      }
    }

    // Default development fallback user (no token required)
    req.user = { id: 'dev-user-id', role: 'HOD' };
    next();
  } catch (error) {
    req.user = { id: 'dev-user-id', role: 'HOD' };
    next();
  }
};

export const requireRole = (allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    next();
  };
};


