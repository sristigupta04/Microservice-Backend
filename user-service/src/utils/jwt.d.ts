import { UserPayload } from "./interfaces";
/**
 * Generate JWT token
 */
export declare function generateToken(payload: Omit<UserPayload, "iat" | "exp">): string;
/**
 * Verify JWT token
 */
export declare function verifyToken(token: string): UserPayload;
//# sourceMappingURL=jwt.d.ts.map