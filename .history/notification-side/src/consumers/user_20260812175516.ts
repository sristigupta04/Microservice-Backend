import {
  Channel,
  ConsumeMessage,
} from "amqplib";

import { getChannel } from "../config/mq";

const EXCHANGE_NAME = "user.events";
const QUEUE_NAME = "notification.user";

export const startUserConsumer = async (): Promise<void> => {
  const channel: Channel = getChannel();

  await channel.assertExchange(
    EXCHANGE_NAME,
    "topic",
    { durable: true }
  );

  await channel.assertQueue(
    QUEUE_NAME,
    { durable: true }
  );

  await channel.bindQueue(
    QUEUE_NAME,
    EXCHANGE_NAME,
    "user.created"
  );

  await channel.consume(
    QUEUE_NAME,
    (message: ConsumeMessage | null) => {
      if (!message) return;

      try {
        const data = JSON.parse(
          message.content.toString()
        );

        console.log("User event received:", data);

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