// api-gateway/src/consumers/user.ts

import {
  ConsumeMessage,
} from "amqplib";

import { getChannel } from "../config/mq";

const QUEUE_NAME = "gateway.user";

export const startUserConsumer = async (): Promise<void> => {
  const channel = getChannel();

  await channel.assertQueue(QUEUE_NAME, {
    durable: true,
  });

  channel.consume(
    QUEUE_NAME,
    (message: ConsumeMessage | null) => {
      if (!message) {
        return;
      }

      try {
        const data = JSON.parse(
          message.content.toString()
        );

        console.log(
          "User event received:",
          data
        );

        channel.ack(message);
      } catch (error) {
        console.error(
          "Error processing user event:",
          error
        );

        channel.nack(
          message,
          false,
          false
        );
      }
    }
  );

  console.log(
    `Listening to queue: ${QUEUE_NAME}`
  );
};