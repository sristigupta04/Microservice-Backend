// api-gateway/src/services/user.ts

import axios from "axios";
import { env } from "../config/env";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${env.USER_SERVICE_URL}/users/register`,
      {
        name,
        email,
        password,
      }
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

export const loginUser = async (
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${env.USER_SERVICE_URL}/users/login`,
      {
        email,
        password,
      }
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

export const getUserById = async (
  userId: string,
  token: string
) => {
  try {
    const response = await axios.get(
      `${env.USER_SERVICE_URL}/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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