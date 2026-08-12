// src/controllers/user.ts

import { Request, Response, NextFunction } from "express";
import { getUserById } from "../services/user";

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = String(req.params.id);

    const user = await getUserById(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    next(error);
  }
};