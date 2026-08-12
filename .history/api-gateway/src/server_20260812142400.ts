// src/server.ts

import express from "express";

import { env } from "./config/env";
import { connectMQ } from "./config/mq";

import { startUserConsumer } from "./consumers/user";

import router from "./routes/route";

import { errorMiddleware } from "./middleware/error";
import { rateLimiter } from "./middleware/rateLimit";

const app = express();

// Body parser
app.use(express.json());

// Rate limiter
app.use(rateLimiter);

// Routes
app.use("/", router);

// Error middleware
app.use(errorMiddleware);

const startServer = async () => {
  try {
    // Connect RabbitMQ
    await connectMQ();

    // Start RabbitMQ consumer
    await startUserConsumer();

    // Start API Gateway
    app.listen(env.PORT, () => {
      console.log(
        `API Gateway running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error(
      "API Gateway failed to start:",
      error
    );

    process.exit(1);
  }
};

startServer();

export default app;