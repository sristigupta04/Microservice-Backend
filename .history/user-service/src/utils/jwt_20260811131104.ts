import jwt from 'jsonwebtoken';
import { UserPayload } from './interfaces'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret_key';

/**
 * Generates a signed JWT token
 */
export function generateToken(payload: Omit<UserPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h', // Token lifetime
  });
}

/**
 * Verifies a JWT token and returns the typed payload
 */
export function verifyToken(token: string): UserPayload {
  try {
    // Cast the verified object back to your strict custom payload type
    return jwt.verify(token, JWT_SECRET) as UserPayload;
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
}
