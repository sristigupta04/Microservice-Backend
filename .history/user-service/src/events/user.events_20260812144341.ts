// user-service/src/events/user.events.ts

import amqp, {
  Channel,
  ChannelModel,
} from "amqplib";

import { env } from "../config/env";

const EXCHANGE_NAME = "user.events";

let connection: ChannelModel;
let channel: Channel;

export const connectEventBus = async (): Promise<Channel> => {
  try {
    connection = await amqp.connect(
      env.RABBITMQ_URL
    );

    channel = await connection.createChannel();

    await channel.assertExchange(
      EXCHANGE_NAME,
      "topic",
      {
        durable: true,
      }
    );

    console.log("User event bus connected");

    return channel;
  } catch (error) {
    console.error(
      "Event bus connection failed:",
      error
    );

    throw error;
  }
};

export const publishUserCreated = async (
  userId: string,
  email: string,
  name: string
): Promise<void> => {
  if (!channel) {
    throw new Error(
      "Event bus is not connected"
    );
  }

  const event = {
    event: "USER_CREATED",
    data: {
      userId,
      email,
      name,
    },
  };

  channel.publish(
    EXCHANGE_NAME,
    "user.created",
    Buffer.from(JSON.stringify(event)),
    {
      persistent: true,
      contentType: "application/json",
    }
  );

  console.log(
    "USER_CREATED event published"
  );
};