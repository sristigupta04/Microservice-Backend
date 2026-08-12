// user-service/src/services/user.ts

import {
  createUser,
  findUserByEmail,
  findUserById,
  findAllUsers,
} from "../repositories/repo";

import {
  hashPassword,
  comparePassword,
} from "../utils/password";

import { generateToken } from "../utils/jwt";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser =
    await findUserByEmail(email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword =
    await hashPassword(password);

  const user = await createUser({
    name,
    email,
    password: hashedPassword,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user =
    await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid =
    await comparePassword(
      password,
      user.password
    );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken({
    userId: user.id,
    email: user.email,
  });

  return {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
  };
};

export const getUserById = async (
  userId: string
) => {
  const user =
    await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const getUsers = async () => {
  const users = await findAllUsers();

  return users.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
  }));
};