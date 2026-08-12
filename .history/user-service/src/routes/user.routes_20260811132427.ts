import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/user.controller";
import { auth } from "../middleware/auth";

const router = Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged-in user
router.get("/me", auth, getUser);

export default router;