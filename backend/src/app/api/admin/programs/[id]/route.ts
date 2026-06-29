import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import { ProgramService } from '@/modules/admin/programs/program.service';

import {
  updateProgramSchema,
  UpdateProgramInput,
} from '@/modules/admin/programs/program.validation';

/**
 * GET /api/admin/programs/:id
 *
 * Retrieves a single program.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get program ID from URL
    const { id } = params;

    // Fetch program
    const program =
      await ProgramService.getProgramById(id);

    // Return response
    return handleSuccess(
      program,
      200,
      'Program retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/admin/programs/:id
 *
 * Updates an existing program.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get program ID from URL
    const { id } = params;

    // Parse request body
    const body = await request.json();

    // Validate request body
    const validatedData: UpdateProgramInput =
      updateProgramSchema.parse(body);

    // Update program
    const updatedProgram =
      await ProgramService.updateProgram(
        id,
        validatedData
      );

    // Return updated program
    return handleSuccess(
      updatedProgram,
      200,
      'Program updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/admin/programs/:id
 *
 * Deletes an existing program.
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Get program ID from URL
    const { id } = params;

    // Delete program
    await ProgramService.deleteProgram(id);

    // Return success response
    return handleSuccess(
      null,
      200,
      'Program deleted successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}