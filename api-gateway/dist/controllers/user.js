"use strict";
// src/controllers/user.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserController = void 0;
const service_1 = require("../services/service");
const getUserController = async (req, res, next) => {
    try {
        const userId = String(req.params.id);
        const user = await (0, service_1.getUserById)(userId);
        return res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserController = getUserController;
//# sourceMappingURL=user.js.map