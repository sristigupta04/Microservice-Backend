"use strict";
// src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const mq_1 = require("./config/mq");
const user_1 = require("./consumers/user");
const route_1 = __importDefault(require("./routes/route"));
const error_1 = require("./middleware/error");
const rateLimit_1 = require("./middleware/rateLimit");
const app = (0, express_1.default)();
// Body parser
app.use(express_1.default.json());
// Rate limiter
app.use(rateLimit_1.rateLimiter);
// Routes
app.use("/", route_1.default);
// Error middleware
app.use(error_1.errorMiddleware);
const startServer = async () => {
    try {
        // Connect RabbitMQ
        await (0, mq_1.connectMQ)();
        // Start RabbitMQ consumer
        await (0, user_1.startUserConsumer)();
        // Start API Gateway
        app.listen(env_1.env.PORT, () => {
            console.log(`API Gateway running on port ${env_1.env.PORT}`);
        });
    }
    catch (error) {
        console.error("API Gateway failed to start:", error);
        process.exit(1);
    }
};
startServer();
exports.default = app;
//# sourceMappingURL=server.js.map