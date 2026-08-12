// user-service/src/repositories/repo.ts

import { prisma } from "../config/prisma";

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export const createUser = async (
  data: CreateUserData
) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
};

export const findUserByEmail = async (
  email: string
) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findUserById = async (
  userId: string
) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const findAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};