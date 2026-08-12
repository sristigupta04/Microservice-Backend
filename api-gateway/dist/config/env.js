"use strict";
// src/config/env.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.env = {
    PORT: Number(process.env.PORT) || 3000,
    NODE_ENV: process.env.NODE_ENV || "development",
    USER_SERVICE_URL: process.env.USER_SERVICE_URL ||
        "http://localhost:3001",
    RABBITMQ_URL: process.env.RABBITMQ_URL ||
        "amqp://localhost:5672",
    JWT_SECRET: process.env.JWT_SECRET || "",
};
//# sourceMappingURL=env.js.map