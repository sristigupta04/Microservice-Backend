// src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3000,

  NODE_ENV:
    process.env.NODE_ENV || "development",

  USER_SERVICE_URL:
    process.env.USER_SERVICE_URL ||
    "http://localhost:3001",

  RABBITMQ_URL:
    process.env.RABBITMQ_URL ||
    "amqp://localhost:5672",

  JWT_SECRET:
    process.env.JWT_SECRET || "",
};