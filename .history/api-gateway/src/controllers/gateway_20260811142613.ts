import { Request, Response } from "express";
import {
  getUserById
} from "../services/service";

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await getUserById(userId);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get user",
    });
  }
};