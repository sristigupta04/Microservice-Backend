// src/server.ts

import express from "express";

import { env } from "./config/env";
import { connectMQ } from "./config/mq";
import { connectPrisma } from "./config/prisma";

import { startUserConsumer } from "./consumers/user";
import router from "./routes/route";
import { errorMiddleware } from "./middleware/error";

const app = express();

app.use(express.json());

app.use("/notifications", router);

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectPrisma();

    await connectMQ();

    await startUserConsumer();

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