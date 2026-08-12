import rateLimit from "express-rate-limit";

export const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes

  max: 100, // maximum 100 requests

  message: {
    message: "Too many requests, please try again later",
  },

  standardHeaders: true,
  legacyHeaders: false,
});