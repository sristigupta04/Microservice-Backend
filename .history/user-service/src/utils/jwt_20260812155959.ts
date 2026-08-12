// user-service/src/utils/jwt.ts

import jwt from "jsonwebtoken";

import { env } from "../config/env";

export interface JwtPayload {
  userId: string;
  email: string;
}

export const generateToken = (
  payload: JwtPayload
): string => {
  console.log("SIGN SECRET:", env.JWT_SECRET);

  return jwt.sign(
    payload,
    env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    env.JWT_SECRET
  ) as JwtPayload;

};