import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '@/config/env';
import { Role } from '@prisma/client';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

/**
 * Hash a plain text password using bcryptjs.
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Compare a plain text password with a hashed password.
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a new JWT session token.
 */
export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
  });
}

/**
 * Verify a JWT session token and return the payload if valid.
 */
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, env.jwtSecret) as TokenPayload;
  } catch (error) {
    console.error('JWT Verification failed:', error);
    return null;
  }
}
