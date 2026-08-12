"use strict";
// api-gateway/src/consumers/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.startUserConsumer = void 0;
const mq_1 = require("../config/mq");
const QUEUE_NAME = "gateway.user";
const startUserConsumer = async () => {
    const channel = (0, mq_1.getChannel)();
    await channel.assertQueue(QUEUE_NAME, {
        durable: true,
    });
    channel.consume(QUEUE_NAME, (message) => {
        if (!message) {
            return;
        }
        try {
            const data = JSON.parse(message.content.toString());
            console.log("User event received:", data);
            channel.ack(message);
        }
        catch (error) {
            console.error("Error processing user event:", error);
            channel.nack(message, false, false);
        }
    });
    console.log(`Listening to queue: ${QUEUE_NAME}`);
};
exports.startUserConsumer = startUserConsumer;
//# sourceMappingURL=user.js.map