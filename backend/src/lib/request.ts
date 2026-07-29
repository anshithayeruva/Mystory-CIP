import { Role } from '@prisma/client';
import { UnauthorizedError } from '@/lib/errors';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: Role;
}

/**
 * Extracts and returns the authenticated user's details injected by the middleware.
 * Throws an UnauthorizedError if details are missing.
 */
export function getAuthenticatedUser(req: Request): AuthenticatedUser {
  const id = req.headers.get('x-user-id');
  const email = req.headers.get('x-user-email');
  const role = req.headers.get('x-user-role') as Role | null;

  if (!id || !email || !role) {
    throw new UnauthorizedError('Authentication credentials not found in request headers');
  }

  return {
    id,
    email,
    role,
  };
}
