import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // Authorization header nahi hai
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization token required",
      });
    }

    // Bearer token check
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    // JWT verify
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    );

    // User information request ke andar store
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};