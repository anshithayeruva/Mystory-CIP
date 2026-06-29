import { NextRequest } from 'next/server';
import db from '@/lib/db';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess, NotFoundError, ForbiddenError } from '@/lib/errors';
import { Role } from '@prisma/client';

/**
 * GET /api/admin/profile
 * Retrieves profile information for the authenticated administrator.
 * Protected by Edge Middleware.
 */
export async function GET(request: NextRequest) {
  try {
    // 1. Retrieve the authenticated user context from request headers
    const userContext = getAuthenticatedUser(request);

    // 2. Extra safety check to verify admin clearance level
    if (userContext.role !== Role.ADMIN) {
      throw new ForbiddenError('Admin access required');
    }

    // 3. Fetch Admin user data using the Prisma client
    const adminUser = await db.user.findUnique({
      where: { id: userContext.id },
      select: {
        id: true,
        email: true,
        role: true,
        firstName: true,
        lastName: true,
      },
    });

    if (!adminUser) {
      throw new NotFoundError('Administrator user not found');
    }

    // 4. Return success response containing profile details
    return handleSuccess(adminUser);
  } catch (error) {
    // Standard error responder formats standard HTTP status responses
    return handleError(error);
  }
}
