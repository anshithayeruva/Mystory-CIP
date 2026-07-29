import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { PulseService } from '../../modules/faculty/pulse/pulse.service';
import { createPulseSessionSchema, pulseSessionQuerySchema } from '../../modules/faculty/pulse/pulse.validation';

/**
 * GET /api/faculty/pulse-sessions
 * Lists classroom pulse sessions for the requesting faculty member with search, filter, and pagination.
 */
export async function GET(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;

    const searchParams = { get: (key: string) => req.query[key] as string | undefined };
    const rawQuery = {
      page: searchParams.get('page') || undefined,
      limit: searchParams.get('limit') || undefined,
      search: searchParams.get('search') || undefined,
      courseId: searchParams.get('courseId') || undefined,
      topicId: searchParams.get('topicId') || undefined,
      sessionType: searchParams.get('sessionType') || undefined,
      difficultyLevel: searchParams.get('difficultyLevel') || undefined,
      date: searchParams.get('date') || undefined,
      status: searchParams.get('status') || undefined,
    };

    const query = pulseSessionQuerySchema.parse(rawQuery);
    const result = await PulseService.listSessions(user.id, query);

    handleSuccess(res, result, 200, 'Pulse sessions retrieved successfully.');
  } catch (error) {
    handleError(error, res);
  }
}

/**
 * POST /api/faculty/pulse-sessions
 * Creates a new classroom pulse session for an assigned subject and topic.
 */
export async function POST(req: Request, res: Response) {
  try {
    const params = req.params as any;
    const user = req.user!;
    const body = req.body;
    const data = createPulseSessionSchema.parse(body);

    const result = await PulseService.createSession(user.id, data);

    handleSuccess(res, result, 201, 'Pulse session created successfully.');
  } catch (error) {
    handleError(error, res);
  }
}
