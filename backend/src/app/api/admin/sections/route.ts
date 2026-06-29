import { NextRequest } from 'next/server';
import { Role } from '@prisma/client';

import { getAuthenticatedUser } from '@/lib/request';
import {
  ForbiddenError,
  handleError,
  handleSuccess,
} from '@/lib/errors';

import {
  createSectionSchema,
  CreateSectionInput,
} from '@/modules/admin/sections/section.validation';

import { SectionService } from '@/modules/admin/sections/section.service';

/**
 * POST /api/admin/sections
 *
 * Creates a new section.
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Parse request body
    const body = await request.json();

    // Validate request body
    const validatedData: CreateSectionInput =
      createSectionSchema.parse(body);

    // Create section
    const section =
      await SectionService.createSection(
        validatedData
      );

    // Return response
    return handleSuccess(
      section,
      201,
      'Section created successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}

/**
 * GET /api/admin/sections
 *
 * Retrieves all sections.
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authenticatedUser = getAuthenticatedUser(request);

    // Allow only administrators
    if (authenticatedUser.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // Fetch sections
    const sections =
      await SectionService.getAllSections();

    // Return response
    return handleSuccess(
      sections,
      200,
      'Sections retrieved successfully'
    );
  } catch (error) {
    return handleError(error);
  }
}