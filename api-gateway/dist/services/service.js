"use strict";
// src/services/user.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("../config/env");
const getUserById = async (userId) => {
    try {
        const response = await axios_1.default.get(`${env_1.env.USER_SERVICE_URL}/users/${userId}`);
        return response.data;
    }
    catch (error) {
        throw {
            status: error.response?.status || 500,
            message: error.response?.data?.message ||
                "User service request failed",
        };
    }
};
exports.getUserById = getUserById;
//# sourceMappingURL=service.js.map