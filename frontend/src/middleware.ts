import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-at-least-32-chars'
);

// Role weights — must stay in sync with backend config/roles.ts
const ROLE_WEIGHTS: Record<string, number> = {
  ADMIN: 40,
  HOD: 30,
  FACULTY: 20,
  STUDENT: 10,
};

interface JwtPayload {
  sub: string;
  role: string;
  mustChangePassword: boolean;
  exp?: number;
}

/**
 * Verify a JWT using jose (Edge Runtime-compatible).
 * Returns the decoded payload or null.
 */
async function verifyJwt(token: string): Promise<JwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET, { algorithms: ['HS256'] });
    return payload as unknown as JwtPayload;
  } catch {
    return null;
  }
}

function hasAccess(userRole: string, requiredRole: string): boolean {
  return (ROLE_WEIGHTS[userRole] ?? 0) >= (ROLE_WEIGHTS[requiredRole] ?? 0);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Skip static assets and the auth endpoint itself ────────────
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/api/users/login') ||
    pathname.startsWith('/api/users/logout')
  ) {
    return NextResponse.next();
  }

  // ── 2. Public pages — allow unauthenticated access ─────────────────
  const publicPages = ['/signin', '/login', '/change-password'];
  // Allow /change-password only for authenticated users (handled below)
  const isSignInPage = pathname === '/signin' || pathname === '/login';
  if (isSignInPage) {
    return NextResponse.next();
  }

  // ── 3. Extract JWT from httpOnly cookie ────────────────────────────
  const token = request.cookies.get('token')?.value;

  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized: No token' },
        { status: 401 }
      );
    }
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // ── 4. Verify token ────────────────────────────────────────────────
  const payload = await verifyJwt(token);

  if (!payload || !payload.sub || !payload.role) {
    const response = pathname.startsWith('/api/')
      ? NextResponse.json({ success: false, message: 'Unauthorized: Invalid token' }, { status: 401 })
      : NextResponse.redirect(new URL('/signin', request.url));
    response.cookies.delete('token');
    return response;
  }

  // ── 5. Force password change if required ───────────────────────────
  const isChangePasswordPage = pathname === '/change-password';
  if (payload.mustChangePassword && !isChangePasswordPage) {
    // Allow the change-password API call through
    if (pathname === '/api/users/change-password') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/change-password', request.url));
  }

  // ── 6. Role-based access control ──────────────────────────────────
  const userRole = payload.role;

  if (pathname.startsWith('/admin') && !hasAccess(userRole, 'ADMIN')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if (pathname.startsWith('/hod') && !hasAccess(userRole, 'HOD')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if (pathname.startsWith('/faculty') && !hasAccess(userRole, 'FACULTY')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }
  if (pathname.startsWith('/student') && !hasAccess(userRole, 'STUDENT')) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // API role guards
  if (pathname.startsWith('/api/admin') && !hasAccess(userRole, 'ADMIN')) {
    return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
  }
  if (pathname.startsWith('/api/hod') && !hasAccess(userRole, 'HOD')) {
    return NextResponse.json({ success: false, message: 'Forbidden: HOD access required' }, { status: 403 });
  }

  // ── 7. Pass user identity downstream via headers ───────────────────
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', payload.sub);
  requestHeaders.set('x-user-role', payload.role);
  requestHeaders.set('x-user-must-change-password', String(payload.mustChangePassword));

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static, _next/image (Next.js internals)
     * - favicon.ico
     * - /signin and /login (public auth pages)
     */
    '/((?!_next/static|_next/image|favicon.ico|signin|login).*)',
  ],
};
