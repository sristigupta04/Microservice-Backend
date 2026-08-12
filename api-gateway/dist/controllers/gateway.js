"use strict";
// src/controllers/gateway.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.gatewayHealth = void 0;
const gatewayHealth = (req, res) => {
    return res.status(200).json({
        success: true,
        message: "API Gateway is running",
        service: "api-gateway",
    });
};
exports.gatewayHealth = gatewayHealth;
//# sourceMappingURL=gateway.js.map