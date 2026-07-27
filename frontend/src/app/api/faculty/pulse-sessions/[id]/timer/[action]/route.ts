import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ExecutionService } from '@/modules/faculty/pulse-execution/execution.service';
import { StartTimerSchema, TimerActionParamSchema } from '@/modules/faculty/pulse-execution/execution.validation';

interface RouteContext {
  params: Promise<{ id: string; action: string }>;
}

/**
 * POST /api/faculty/pulse-sessions/[id]/timer/[action]
 * Executes a timer action: start, pause, resume, or end.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const resolvedParams = await params;
    const { action } = TimerActionParamSchema.parse(resolvedParams);
    const { id } = resolvedParams;

    let result;
    switch (action) {
      case 'start': {
        let body = {};
        try {
          body = await req.json();
        } catch {
          // Empty body is acceptable
        }
        const data = StartTimerSchema.parse(body);
        result = await ExecutionService.startTimer(user.id, id, data.durationMinutes);
        break;
      }
      case 'pause': {
        result = await ExecutionService.pauseTimer(user.id, id);
        break;
      }
      case 'resume': {
        result = await ExecutionService.resumeTimer(user.id, id);
        break;
      }
      case 'end': {
        result = await ExecutionService.endTimer(user.id, id);
        break;
      }
    }

    return handleSuccess(result, 200, `Timer ${action} executed successfully.`);
  } catch (error) {
    return handleError(error);
  }
}
