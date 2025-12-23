// src/notifications/notifications.schema.ts
import { z } from "zod";
import { NotificationChannel } from "../../prisma/generated/enums.js";

export const sendSchema = z.object({
  userId: z.string(),
  title: z.string(),
  message: z.string(),
  data: z.any().optional(),
  scheduledAt: z.string().optional(),
  channels: z
    .array(z.nativeEnum(NotificationChannel))
    .optional()
    .default([NotificationChannel.WEB]),
});

export const markReadSchema = z.object({
  id: z.string(),
});

export const listSchema = z.object({
  userId: z.uuid(),
  take: z.string().optional(),
  skip: z.string().optional(),
});
