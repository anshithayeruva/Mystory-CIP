import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import { SectionService } from '@/modules/admin/sections/section.service';

import {
  updateSectionSchema,
  UpdateSectionInput,
} from '@/modules/admin/sections/section.validation';

/**
 * GET /api/admin/sections/:id
 *
 * Retrieves a single section.
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

    // Get section ID
    const { id } = params;

    // Fetch section
    const section =
      await SectionService.getSectionById(id);

    // Return response
    return handleSuccess(
      section,
      200,
      'Section retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * PATCH /api/admin/sections/:id
 *
 * Updates an existing section.
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

    // Get section ID
    const { id } = params;

    // Parse request body
    const body = await request.json();

    // Validate request body
    const validatedData: UpdateSectionInput =
      updateSectionSchema.parse(body);

    // Update section
    const updatedSection =
      await SectionService.updateSection(
        id,
        validatedData
      );

    // Return response
    return handleSuccess(
      updatedSection,
      200,
      'Section updated successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * DELETE /api/admin/sections/:id
 *
 * Deletes an existing section.
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

    // Get section ID
    const { id } = params;

    // Delete section
    await SectionService.deleteSection(id);

    // Return response
    return handleSuccess(
      null,
      200,
      'Section deleted successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}