"use strict";
// src/routes/route.ts
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gateway_1 = require("../controllers/gateway");
const user_1 = require("../controllers/user");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Gateway health
router.get("/health", gateway_1.gatewayHealth);
// Get user
router.get("/users/:id", auth_1.authMiddleware, user_1.getUserController);
exports.default = router;
//# sourceMappingURL=route.js.map