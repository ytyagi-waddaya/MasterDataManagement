// src/notifications/notifications.routes.ts
import { Router } from "express";
import { asyncHandler } from "../middlewares/asyncHandler.js";
import { validate } from "../middlewares/validate.js";
import { sendSchema, markReadSchema, listSchema } from "./notifications.schema.js";
import notificationsController from "./notifications.controller.js";

const router = Router();

router.post(
  "/send",
  validate(sendSchema, "body"),
  asyncHandler(notificationsController.sendNotification)
);

router.get(
  "/user/:userId",
  validate(listSchema, "params"),
  validate(listSchema, "query"),
  asyncHandler(notificationsController.listUserNotifications)
);

router.patch(
  "/:id/read",
  validate(markReadSchema, "params"),
  asyncHandler(notificationsController.markRead)
);

export default router;
