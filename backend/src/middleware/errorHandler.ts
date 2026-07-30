import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ success: false, error: err.message });
  }
  
  if (err instanceof ZodError) {
    return res.status(400).json({ success: false, error: (err as any).errors[0].message, details: (err as any).errors });
  }

  console.error(err);
  return res.status(500).json({ success: false, error: 'Internal Server Error' });
};
