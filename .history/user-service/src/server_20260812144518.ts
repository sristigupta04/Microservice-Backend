// user-service/src/server.ts

import express from "express";

import { env } from "./config/env";
import { connectPrisma } from "./config/prisma";

import {
  connectEventBus,
} from "./events/user.events";

import userRoutes from "./routes/user.routes";

import {
  errorMiddleware,
} from "./middleware/error";

const app = express();

// JSON body parser
app.use(express.json());

// User routes
app.use("/users", userRoutes);

// Error middleware
app.use(errorMiddleware);

const startServer = async () => {
  try {
    // PostgreSQL / Prisma
    await connectPrisma();

    // RabbitMQ
    await connectEventBus();

    // Express server
    app.listen(env.PORT, () => {
      console.log(
        `User Service running on port ${env.PORT}`
      );
    });
  } catch (error) {
    console.error(
      "User Service failed to start:",
      error
    );

    process.exit(1);
  }
};

startServer();

export default app;