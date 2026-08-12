// src/routes/route.ts

import { Router } from "express";
import {
  createNotification,
} from "../controllers/controller";

const router = Router();

router.post(
  "/",
  createNotification
);

export default router;