// src/server.ts

import express from "express";

import { env } from "./config/env";
import { connectMQ } from "./config/mq";
import { startUserConsumer } from "./consumers/user";
import router from "./routes/route";
import { errorMiddleware } from "./middleware/error";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/notifications", router);

// Error middleware
app.use(errorMiddleware);

// Start server
const startServer = async () => {
  try {
    // Connect RabbitMQ
    await connectMQ();

    // Start consumers
    await startUserConsumer();

    // Start Express
    app.listen(env.PORT, () => {
      console.log(
        `Notification Service running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error(
      "Notification Service failed to start:",
      error
    );

    process.exit(1);
  }
};

startServer();

export default app;