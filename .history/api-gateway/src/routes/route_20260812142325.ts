// src/routes/route.ts

import { Router } from "express";

import { gatewayHealth } from "../controllers/gateway";
import { getUserController } from "../controllers/user";

import { authMiddleware } from "../middleware/auth";

const router = Router();

// Gateway health
router.get(
  "/health",
  gatewayHealth
);

// Get user
router.get(
  "/users/:id",
  authMiddleware,
  getUserController
);

export default router;