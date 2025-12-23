import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { DeliveryService } from "./delivery.service.js";
const notificationsController = {
    sendNotification: async (req, res) => {
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
    listUserNotifications: async (req, res) => {
        const userId = req.params.userId;
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
    markRead: async (req, res) => {
        const id = req.params.id;
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
//# sourceMappingURL=notifications.controller.js.map