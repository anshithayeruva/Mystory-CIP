import { NextRequest } from 'next/server';
import { loginSchema } from '@/lib/validations';
import { AuthService } from '@/services/auth.service';
import { handleError, handleSuccess } from '@/lib/errors';

/**
 * POST /api/auth/login
 * Authenticates a user (Admin, HOD, Faculty, or Student) and issues a JWT session token.
 */
export async function POST(request: NextRequest) {
  try {
    // 1. Read request body
    const body = await request.json();

    // 2. Validate request body against Zod schema (throws ZodError on failure)
    const credentials = loginSchema.parse(body);

    // 3. Call AuthService to authenticate credentials and sign JWT
    const result = await AuthService.login(credentials.email, credentials.password);

    // 4. Build standard success response returning JWT token and user details
    const response = handleSuccess(
      {
        token: result.token,
        user: result.user,
      },
      200,
      'Login successful'
    );

    // 5. Securely set the JWT as an HttpOnly cookie for server-side auth checks (e.g. middleware)
    response.cookies.set({
      name: 'token',
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day matching JWT expiration
    });

    return response;
  } catch (error) {
    // Handles ZodError (400), UnauthorizedError (401), and internal crashes (500)
    return handleError(error);
  }
}
