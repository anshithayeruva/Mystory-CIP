import { NextResponse } from 'next/server';

import { ZodError } from 'zod';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public errors?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', errors?: any) {
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
export function handleError(error: unknown) {
  console.error('API Error:', error);

  if (error instanceof ZodError) {
    const formattedErrors = error.issues.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    
    return NextResponse.json(
      {
        success: false,
        message: 'Validation failed',
        errors: formattedErrors,
      },
      { status: 400 }
    );
  }

  if (error instanceof AppError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errors: error.errors || null,
      },
      { status: error.statusCode }
    );
  }

  // Handle Prisma Database Errors
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const prismaErr = error as { code: string; meta?: any; message?: string };
    switch (prismaErr.code) {
      case 'P2002': // Unique constraint violation
        return NextResponse.json(
          {
            success: false,
            message: `A record with this field already exists (${prismaErr.meta?.target || 'unique constraint'})`,
          },
          { status: 409 }
        );
      case 'P2025': // Record not found
        return NextResponse.json(
          {
            success: false,
            message: prismaErr.message || 'Record not found',
          },
          { status: 404 }
        );
      default:
        break;
    }
  }

  // Fallback for general unhandled errors
  return NextResponse.json(
    {
      success: false,
      message: error instanceof Error ? error.message : 'Internal Server Error',
    },
    { status: 500 }
  );
}

/**
 * Standardized success responder for API routes.
 */
export function handleSuccess<T>(data: T, status: number = 200, message?: string) {
  return NextResponse.json(
    {
      success: true,
      message: message || 'Success',
      data,
    },
    { status }
  );
}
