"use strict";
// src/config/mq.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChannel = exports.connectMQ = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const env_1 = require("./env");
let connection;
let channel;
const connectMQ = async () => {
    try {
        connection = await amqplib_1.default.connect(env_1.env.RABBITMQ_URL);
        channel = await connection.createChannel();
        console.log("RabbitMQ connected");
        return channel;
    }
    catch (error) {
        console.error("RabbitMQ connection failed:", error);
        throw error;
    }
};
exports.connectMQ = connectMQ;
const getChannel = () => {
    if (!channel) {
        throw new Error("RabbitMQ channel is not initialized");
    }
    return channel;
};
exports.getChannel = getChannel;
//# sourceMappingURL=mq.js.map