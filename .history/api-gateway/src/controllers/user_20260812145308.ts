// api-gateway/src/controllers/user.ts

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  registerUser,
  getUserById,
} from "../services/user";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    const result = await registerUser(
      name,
      email,
      password
    );

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = String(req.params.id);

    const result = await getUserById(userId);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};