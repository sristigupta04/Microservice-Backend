// user-service/src/services/user.ts

import { prisma } from "../config/prisma";

export const getUserById = async (
  userId: string
) => {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};