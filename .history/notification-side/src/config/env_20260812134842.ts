import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT) || 4002,

  NODE_ENV: process.env.NODE_ENV || "development",

  RABBITMQ_URL:
    process.env.RABBITMQ_URL || "amqp://localhost:5672",

  DATABASE_URL:
    process.env.DATABASE_URL || "",

  USER_SERVICE_URL:
    process.env.USER_SERVICE_URL || "http://localhost:3001",
};