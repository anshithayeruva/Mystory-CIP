import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { ExecutionService } from '@/modules/faculty/pulse-execution/execution.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/faculty/pulse-sessions/[id]/qr-code
 * Retrieves the generated QR code for a pulse session.
 */
export async function GET(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await ExecutionService.getQrCode(user.id, id);
    return handleSuccess(result, 200, 'QR code retrieved successfully.');
  } catch (error) {
    return handleError(error);
  }
}

/**
 * POST /api/faculty/pulse-sessions/[id]/qr-code
 * Generates or regenerates a QR code for a pulse session.
 */
export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;

    const result = await ExecutionService.generateQrCode(user.id, id);
    return handleSuccess(result, 200, 'QR code generated successfully.');
  } catch (error) {
    return handleError(error);
  }
}
