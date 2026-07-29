import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { SubjectService } from '@/modules/faculty/subjects/subject.service';
import { createSubjectSchema, subjectQuerySchema } from '@/modules/faculty/subjects/subject.validation';
import * as fs from 'fs';

/**
 * GET /api/faculty/subjects
 * Lists subjects assigned to the requesting faculty member with search, filter, and pagination.
 */
export async function GET(req: NextRequest) {
  try {
    const user = getAuthenticatedUser(req);

    const { searchParams } = new URL(req.url);
    const rawQuery = {
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      search: searchParams.get('search') || undefined,
      programId: searchParams.get('programId') || undefined,
      semester: searchParams.get('semester') || undefined,
      departmentId: searchParams.get('departmentId') || undefined,
    };

    const query = subjectQuerySchema.parse(rawQuery);
    const result = await SubjectService.listSubjects(user.id, query);

    return handleSuccess(result, 200, 'Subjects retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/faculty/subjects
 * Creates a new subject and assigns the faculty member to it.
 */
  export async function POST(req: NextRequest) {
    try {
      const user = getAuthenticatedUser(req);
      const body = await req.json();
      const data = createSubjectSchema.parse(body);
  
      const result = await SubjectService.createSubject(user.id, data);
  
      return handleSuccess(result, 201, 'Subject created successfully.');
    } catch (error: any) {
      fs.writeFileSync('/tmp/api_error.log', String(error?.stack || error));
      return handleError(error);
    }
  }
