import express from "express";
import cors from "cors";
import { env } from "./config/env";
import userRoutes from "./routes/user.routes";
import { errorHandler } from "./middleware/error";