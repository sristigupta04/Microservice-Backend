// src/events/type.ts

export interface UserCreatedEvent {
  userId: string;
  email: string;
  name: string;
}

export interface UserUpdatedEvent {
  userId: string;
  email?: string;
  name?: string;
}

export interface NotificationEvent {
  userId: string;
  message: string;
  type: string;
}