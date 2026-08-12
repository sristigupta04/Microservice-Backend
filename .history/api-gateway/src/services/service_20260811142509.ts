import axios from "axios";
import { env } from "../config/env";

const USER_SERVICE_URL = env.USER_SERVICE_URL;

export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${USER_SERVICE_URL}/users`,
    userData
  );

  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(
    `${USER_SERVICE_URL}/login`,
    userData
  );

  return response.data;
};

export const getUserById = async (userId: string) => {
  const response = await axios.get(
    `${USER_SERVICE_URL}/users/${userId}`
  );

  return response.data;
};