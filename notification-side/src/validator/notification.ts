// src/validator/notification.ts

import { Request, Response, NextFunction } from "express";

export const validateNotification = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, message, type } = req.body;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "userId is required",
    });
  }

  if (!message) {
    return res.status(400).json({
      success: false,
      message: "message is required",
    });
  }

  if (!type) {
    return res.status(400).json({
      success: false,
      message: "notification type is required",
    });
  }

  next();
};