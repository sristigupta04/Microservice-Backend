import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  USER_SERVICE_URL:
    process.env.USER_SERVICE_URL || "http://localhost:3001",

  JWT_SECRET: process.env.JWT_SECRET || "",
};