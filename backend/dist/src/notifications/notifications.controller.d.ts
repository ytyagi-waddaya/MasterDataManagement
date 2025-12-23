import { Request, Response } from "express";
declare const notificationsController: {
    sendNotification: (req: Request, res: Response) => Promise<void>;
    listUserNotifications: (req: Request, res: Response) => Promise<void>;
    markRead: (req: Request, res: Response) => Promise<void>;
};
export default notificationsController;
//# sourceMappingURL=notifications.controller.d.ts.map