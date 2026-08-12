import type { Request, Response } from "express";

import {
  createUser,
  loginUser,
  getUserById,
} from "../services/service";

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to create user",
    });
  }
};

export const loginUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Login failed",
    });
  }
};

export const getUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = String(req.params.id);

    const user = await getUserById(userId);

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    return res.status(error.response?.status || 500).json({
      success: false,
      message:
        error.response?.data?.message ||
        "Failed to get user",
    });
  }
};