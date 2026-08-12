// api-gateway/src/controllers/user.ts

import {
  Request,
  Response,
  NextFunction,
} from "express";
import { AuthRequest } from "../middleware/auth";

import {
  registerUser,
  loginUser,
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

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    const result = await loginUser(
      email,
      password
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = String(req.params.id);

    const authHeader = req.headers.authorization!;
    const token = authHeader.split(" ")[1];

    const result = await getUserById(
      userId,
      token
    );

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }