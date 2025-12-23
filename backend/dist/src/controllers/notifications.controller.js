// src/controllers/notificationsController.ts (express)
import { BadRequestException, NotFoundException } from "../utils/appError.js";
import { prisma } from "../lib/prisma.js";
import usersRepository from "../modules/user/user.repository.js";
export async function fetchNotifications(req, res) {
    const userId = req.user?.id;
    if (!userId)
        throw new BadRequestException("User ID is required.");
    const user = await usersRepository.readOne({ userId: userId });
    if (!user)
        throw new NotFoundException("User not found.");
    const page = Number(req.query.page ?? 1);
    const pageSize = Math.min(Number(req.query.pageSize ?? 25), 100);
    const skip = (page - 1) * pageSize;
    const [items, total, unreadCount] = await Promise.all([
        prisma.notificationDelivery.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            skip,
            take: pageSize,
        }),
        prisma.notificationDelivery.count({ where: { userId } }),
        prisma.notificationDelivery.count({ where: { userId, read: false } }),
    ]);
    res.json({ items, total, page, pageSize, unreadCount });
}
export async function markAsRead(req, res) {
    const userId = req.user?.id;
    if (!userId)
        throw new BadRequestException("User ID is required.");
    const user = await usersRepository.readOne({ userId: userId });
    if (!user)
        throw new NotFoundException("User not found.");
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ error: "Missing notification id" });
    try {
        const updated = await prisma.notificationDelivery.update({
            where: { id }, // primary key update
            data: { read: true, readAt: new Date() },
        });
        // Security: ensure this notification belongs to the user (prevent cross-user updates)
        if (updated.userId !== userId) {
            // revert or deny
            return res.status(403).json({ error: "Forbidden" });
        }
        return res.json({ ok: true, updated: 1 });
    }
    catch (err) {
        // Prisma throws if record not found
        if (err?.code === "P2025") {
            return res.status(404).json({ error: "Notification not found" });
        }
        throw err;
    }
}
//# sourceMappingURL=notifications.controller.js.map