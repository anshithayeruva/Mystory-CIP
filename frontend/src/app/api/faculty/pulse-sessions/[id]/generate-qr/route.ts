import { NextRequest } from 'next/server';
import { getAuthenticatedUser } from '@/lib/request';
import { handleError, handleSuccess } from '@/lib/errors';
import { PulseService } from '@/modules/faculty/pulse/pulse.service';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const user = getAuthenticatedUser(req);
    const { id } = await params;
    const result = await PulseService.generateQrCode(user.id, id);
    return handleSuccess(result, 200, 'QR Code generated successfully.');
  } catch (error) {
    return handleError(error);
  }
}
