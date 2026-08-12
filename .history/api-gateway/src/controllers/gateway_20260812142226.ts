// src/controllers/gateway.ts

import { Request, Response } from "express";

export const gatewayHealth = (
  req: Request,
  res: Response
) => {
  return res.status(200).json({
    success: true,
    message: "API Gateway is running",
    service: "api-gateway",
  });
};