import { Request, Response } from "express";

import { handleError, handleSuccess } from '../../lib/errors';
import { ExecutionService } from '../../modules/faculty/pulse-execution/execution.service';
import { StatusActionParamSchema } from '../../modules/faculty/pulse-execution/execution.validation';

interface RouteContext {
  params: Promise<{ id: string; action: string }>;
}

/**
 * POST /api/faculty/pulse-sessions/[id]/status/[action]
 * Executes a lifecycle status transition: publish, start, pause, resume, end, close, or archive.
 */
export async function POST(req: Request, { params }: RouteContext) {
  try {
    const user = req.user!;
    const resolvedParams = await params;
    const { action } = StatusActionParamSchema.parse(resolvedParams);
    const { id } = resolvedParams;

    let result;
    switch (action) {
      case 'publish': {
        result = await ExecutionService.publishSession(user.id, id);
        break;
      }
      case 'start': {
        result = await ExecutionService.startSession(user.id, id);
        break;
      }
      case 'pause': {
        result = await ExecutionService.pauseSession(user.id, id);
        break;
      }
      case 'resume': {
        result = await ExecutionService.resumeSession(user.id, id);
        break;
      }
      case 'end': {
        result = await ExecutionService.endSession(user.id, id);
        break;
      }
      case 'close': {
        result = await ExecutionService.closeSession(user.id, id);
        break;
      }
      case 'archive': {
        result = await ExecutionService.archiveSession(user.id, id);
        break;
      }
    }

    handleSuccess(res, result, 200, `Session status transitioned to ${action} successfully.`);
  } catch (error) {
    handleError(error, res);
  }
}
