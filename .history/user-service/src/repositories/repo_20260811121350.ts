import { prisma } from "../config/prisma";

export const createUser = async (
  name: string,
  email: string,
  password: string
) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return user;
};

export const findById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  return user;
};

export const findByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  return user;
};