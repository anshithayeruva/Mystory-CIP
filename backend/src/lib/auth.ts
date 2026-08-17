import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { Role } from '@prisma/client';

export interface TokenPayload {
  sub: string;       // userId
  role: Role;
  mustChangePassword: boolean;
  // Legacy compatibility fields (kept so existing code that reads .id doesn't break)
  id?: string;
  email?: string;
}

/**
 * Hash a plain text password using bcryptjs (cost factor 10).
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

/**
 * Compare a plain text password with a hashed password.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT signed with { sub, role, mustChangePassword }, 7-day expiry.
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(
    {
      sub: payload.sub,
      role: payload.role,
      mustChangePassword: payload.mustChangePassword,
    },
    env.jwtSecret,
    { expiresIn: '7d' }
  );
}

/**
 * Verify a JWT and return the decoded payload, or null if invalid/expired.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, env.jwtSecret) as TokenPayload;
  } catch {
    return null;
  }
}
