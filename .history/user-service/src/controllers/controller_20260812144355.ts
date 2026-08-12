// user-service/src/controllers/controller.ts

import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  registerUser,
  loginUser,
  getUserById,
  getUsers,
} from "../services/user";

import {
  publishUserCreated,
} from "../events/user.events";

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

    const user = await registerUser(
      name,
      email,
      password
    );

    await publishUserCreated(
      user.id,
      user.email,
      user.name
    );

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
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

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
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
    const userId = String(
      req.params.id
    );

    const user = await getUserById(
      userId
    );

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await getUsers();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};