// api-gateway/src/routes/route.ts

import { Router } from "express";

import { gatewayHealth } from "../controllers/gateway";

import {
  registerController,
  loginController,
  getUserController,
} from "../controllers/user";

import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get(
  "/health",
  gatewayHealth
);

router.post(
  "/users/register",
  registerController
);

router.post(
  "/users/login",
  loginController
);

router.get(
  "/users/:id",
  authMiddleware,
  getUserController
);

export default router;