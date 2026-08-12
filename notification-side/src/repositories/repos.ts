// src/repositories/repos.ts

import { prisma } from "../config/prisma";

export interface CreateNotificationData {
  userId: string;
  message: string;
  type: string;
}

export const createNotification = async (
  data: CreateNotificationData
) => {
  return await prisma.notification.create({
    data: {
      userId: data.userId,
      message: data.message,
      type: data.type,
    },
  });
};

export const getNotificationsByUserId = async (
  userId: string
) => {
  return await prisma.notification.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteNotification = async (
  notificationId: string
) => {
  return await prisma.notification.delete({
    where: {
      id: notificationId,
    },
  });
};