import { Request, Response, NextFunction } from "express";
import { sendNotification } from "../services/service";

export const createNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, message, type } = req.body;

    const notification = await sendNotification({
      userId,
      message,
      type,
    });

    return res.status(201).json({
      success: true,
      data: notification,
    });
  } catch (error) {
    next(error);
  }
};