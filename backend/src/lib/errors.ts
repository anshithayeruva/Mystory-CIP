import { Response } from 'express';
import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: unknown
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', errors?: unknown) {
    super(message, 400, errors);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource Not Found') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Conflict occurred') {
    super(message, 409);
  }
}

/**
 * Standardized error responder for API routes.
 */
export function handleError(error: unknown, res: Response) {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
      errors: error.errors || null,
    });
  }

  // Handle Prisma Database Errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaErr = error as { code: string; meta?: Record<string, unknown>; message?: string };
    switch (prismaErr.code) {
      case 'P2002': // Unique constraint violation
        return res.status(409).json({
          success: false,
          message: `A record with this field already exists (${prismaErr.meta?.target || 'unique constraint'})`,
        });
      case 'P2025': // Record not found
        return res.status(404).json({
          success: false,
          message: prismaErr.message || 'Record not found',
        });
      default:
        break;
    }
  }

  // Fallback for general unhandled errors
  return res.status(500).json({
    success: false,
    message: error instanceof Error ? error.message : 'Internal Server Error',
  });
}

/**
 * Standardized success responder for API routes.
 */
export function handleSuccess<T>(res: Response, data: T, status: number = 200, message?: string) {
  return res.status(status).json({
    success: true,
    message: message || 'Success',
    data,
  });
}
