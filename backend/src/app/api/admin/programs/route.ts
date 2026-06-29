import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import {
  createProgramSchema,
  CreateProgramInput,
} from '@/modules/admin/programs/program.validation';

import { ProgramService } from '@/modules/admin/programs/program.service';

/**
 * POST /api/admin/programs
 * Creates a new program.
 */
export async function POST(request: NextRequest) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const body = await request.json();

    const validatedData: CreateProgramInput =
      createProgramSchema.parse(body);

    const program =
      await ProgramService.createProgram(validatedData);

    return handleSuccess(
      program,
      201,
      'Program created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/admin/programs
 * Returns all programs.
 */
export async function GET(request: NextRequest) {
  try {
    const authenticatedUser = getAuthenticatedUser(request);

    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    const programs =
      await ProgramService.getAllPrograms();

    return handleSuccess(
      programs,
      200,
      'Programs retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}