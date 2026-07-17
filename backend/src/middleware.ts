import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role, ROLE_WEIGHTS } from '@/config/roles';

// Secret key must match process.env.JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production-at-least-32-chars';

/**
 * Edge-compatible base64url decoding
 */
function base64urlDecode(str: string): Uint8Array {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

interface EdgeTokenPayload {
  userId: string;
  email: string;
  role: string;
  exp?: number;
}

/**
 * Web Crypto API-based JWT verification that runs safely on Next.js Edge Runtime.
 */
async function verifyJwtEdge(token: string): Promise<EdgeTokenPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;

    // Verify signature
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const data = encoder.encode(`${header}.${payload}`);
    const sigBuf = base64urlDecode(signature);
    const isValid = await crypto.subtle.verify('HMAC', key, sigBuf as unknown as ArrayBuffer, data as unknown as ArrayBuffer);

    if (!isValid) return null;

    // Decode and parse payload
    const decodedPayload = JSON.parse(
      new TextDecoder().decode(base64urlDecode(payload))
    );

    // Check expiration
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
      console.warn('Token expired');
      return null;
    }

    return decodedPayload;
  } catch (error) {
    console.error('Edge JWT verification error:', error);
    return null;
  }
}

/**
 * Helper to check role authorization
 */
function hasAccess(userRole: Role, requiredRole: Role): boolean {
  return (ROLE_WEIGHTS[userRole] || 0) >= (ROLE_WEIGHTS[requiredRole] || 0);
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip middleware for static assets, public routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/api/auth') // Exclude auth endpoints (login, register)
  ) {
    return NextResponse.next();
  }

  // 2. Extract JWT token from cookie or Authorization header
  let token = request.cookies.get('token')?.value;

  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  // 3. Deny access if no token is found on API or portal routes
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Token missing' }, { status: 401 });
    }
    // Redirect web app routes to login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Verify token
  const payload = await verifyJwtEdge(token);
  if (!payload || !payload.userId || !payload.role) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ success: false, message: 'Unauthorized: Invalid or expired token' }, { status: 401 });
    }
    // Clear invalid token cookie and redirect
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('token');
    return response;
  }

  // 5. Enforce role-based access control
  const userRole = payload.role as Role;

  if (pathname.startsWith('/api/admin') && !hasAccess(userRole, Role.ADMIN)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Admin access required' }, { status: 403 });
  }

  if (pathname.startsWith('/api/hod') && !hasAccess(userRole, Role.HOD)) {
    return NextResponse.json({ success: false, message: 'Forbidden: HOD access required' }, { status: 403 });
  }

  if (pathname.startsWith('/api/faculty') && !hasAccess(userRole, Role.FACULTY)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Faculty access required' }, { status: 403 });
  }

  if (pathname.startsWith('/api/student') && !hasAccess(userRole, Role.STUDENT)) {
    return NextResponse.json({ success: false, message: 'Forbidden: Student access required' }, { status: 403 });
  }

  // 6. Access granted - pass user details downstream via headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', payload.userId);
  requestHeaders.set('x-user-email', payload.email);
  requestHeaders.set('x-user-role', payload.role);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// Configure routes to run the middleware against
export const config = {
  matcher: [
    '/api/admin/:path*',
    '/api/hod/:path*',
    '/api/faculty/:path*',
    '/api/student/:path*',
    '/api/analytics/:path*',
    '/portal/:path*', // Protected dashboard views
  ],
};
