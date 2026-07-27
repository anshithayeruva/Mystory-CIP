import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ProfileService } from '@/modules/faculty/profile/profile.service';
import { assignedSubjectsQuerySchema } from '@/modules/faculty/profile/profile.validation';

/**
 * GET /api/faculty/profile/subjects
 * Retrieves assigned subjects for the authenticated faculty member with Classroom Pulse statistics, search, filtering, and pagination.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);
    const { searchParams } = new URL(req.url);

    const rawQuery = {
      search: searchParams.get('search') || undefined,
      programId: searchParams.get('programId') || undefined,
      semester: searchParams.get('semester') || undefined,
      departmentId: searchParams.get('departmentId') || undefined,
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
    };

    const query = assignedSubjectsQuerySchema.parse(rawQuery);
    const result = await ProfileService.getAssignedSubjects(user.id, query);

    return handleSuccess(result, 200, 'Assigned subjects retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}
