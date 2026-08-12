// user-service/src/config/env.ts

import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 3001,

  NODE_ENV:
    process.env.NODE_ENV || "development",

  DATABASE_URL:
    process.env.DATABASE_URL || "",

  JWT_SECRET:
    process.env.JWT_SECRET || "",

  RABBITMQ_URL:
    process.env.RABBITMQ_URL ||
    "amqp://localhost:5672",
};
console.log("USER SECRET LENGTH:", env.JWT_SECRET.length);