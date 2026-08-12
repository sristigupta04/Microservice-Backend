import amqp, { Channel, Connection } from "amqplib";
import { env } from "./env";

let connection: Connection;
let channel: Channel;

export const connectMQ = async (): Promise<Channel> => {
  try {
    connection = await amqp.connect(env.RABBITMQ_URL);

    channel = await connection.createChannel();

    console.log("RabbitMQ connected");

    return channel;
  } catch (error) {
    console.error("RabbitMQ connection failed:", error);
    throw error;
  }
};

export const getChannel = (): Channel => {
  if (!channel) {
    throw new Error("RabbitMQ channel is not initialized");
  }

  return channel;
};