// user-service/src/routes/user.routes.ts

import { Router } from "express";

import {
  registerController,
  loginController,
  getUserController,
  getUsersController,
} from "../controllers/controller";

import {
  validateRegister,
  validateLogin,
} from "../validators/user.validator";

import {
  authMiddleware,
} from "../middleware/auth";

const router = Router();

// Register
router.post(
  "/register",
  validateRegister,
  registerController
);

// Login
router.post(
  "/login",
  validateLogin,
  loginController
);

// Get all users
router.get(
  "/",
  authMiddleware,
  getUsersController
);

// Get user by ID
router.get(
  "/:id",
  authMiddleware,
  getUserController
);

export default router;