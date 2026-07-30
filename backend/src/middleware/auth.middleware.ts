import { Request, Response, NextFunction } from 'express';
// import { sendError } from '../utils/response';
// import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * Middleware to protect routes for ADMIN role only.
 * Currently bypassing authentication as per requirements.
 * Structured to easily add JWT validation later.
 */
export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Add JWT verification and role checking here when authentication is enabled.
  
  // Example of future implementation:
  /*
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 401, 'Unauthorized');
  }
  
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    if (decoded.role !== 'ADMIN') {
      return sendError(res, 403, 'Forbidden');
    }
    req.user = decoded;
  } catch (err) {
    return sendError(res, 401, 'Unauthorized');
  }
  */

  // Bypass auth for now
  req.user = { id: 'dummy-admin-id', role: 'ADMIN' };
  next();
};
