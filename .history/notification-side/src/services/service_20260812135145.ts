// src/services/service.ts

import {
  createNotification,
  getNotificationsByUserId,
  deleteNotification,
} from "../repositories/repos";

export interface SendNotificationData {
  userId: string;
  message: string;
  type: string;
}

export const sendNotification = async (
  data: SendNotificationData
) => {
  const notification = await createNotification(data);

  return notification;
};

export const getUserNotifications = async (
  userId: string
) => {
  const notifications =
    await getNotificationsByUserId(userId);

  return notifications;
};

export const removeNotification = async (
  notificationId: string
) => {
  const notification =
    await deleteNotification(notificationId);

  return notification;
};