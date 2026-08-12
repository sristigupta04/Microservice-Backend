// src/routes/route.ts

import { Router } from "express";
import { validateNotification } from "../validator/notification";

import {
  createNotification,
  
} from "../controllers/controller";

const router = Router();



router.post(
  "/",
  validateNotification,
  createNotification
);
export default router;