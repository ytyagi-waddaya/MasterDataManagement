// src/notifications/notifications.controller.ts
import { Request, Response } from "express";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { DeliveryService } from "./delivery.service.js";

const notificationsController = {
  sendNotification: async (req: Request, res: Response) => {
    const data = req.body;

    const deliveryId = await DeliveryService.createAndDispatch({
      userId: data.userId,
      title: data.title,
      message: data.message,
      data: data.data,
      channels: data.channels,
      scheduledAt: data.scheduledAt ? new Date(data.scheduledAt) : null,
    });

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.CREATED,
      success: true,
      message: "Notification sent successfully",
      data: { deliveryId },
    });
  },

  listUserNotifications: async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const take = Number(req.query.take ?? 20);
    const skip = Number(req.query.skip ?? 0);

    const data = await DeliveryService.listForUser(userId, take, skip);

    console.log("DATA:", data);
    
    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Notifications fetched successfully",
      data: {
        data,
      },
    });
  },

  markRead: async (req: Request, res: Response) => {
    const id = req.params.id as string;

    await DeliveryService.markRead(id);

    return sendResponse({
      res,
      statusCode: HTTPSTATUS.OK,
      success: true,
      message: "Notification marked as read",
      data: { id },
    });
  },
};

export default notificationsController;
