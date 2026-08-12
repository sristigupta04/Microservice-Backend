// api-gateway/src/services/user.ts

import axios from "axios";
import { env } from "../config/env";

export const getUserById = async (
  userId: string
) => {
  try {
    const response = await axios.get(
      `${env.USER_SERVICE_URL}/users/${userId}`
    );

    return response.data;
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      message:
        error.response?.data?.message ||
        "User service request failed",
    };
  }
};