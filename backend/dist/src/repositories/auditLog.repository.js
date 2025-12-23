import { prisma } from "../lib/prisma.js";
const auditLogRepository = {
    getAll: async (skip = 0, take = 20) => {
        return prisma.auditLog.findMany({
            skip,
            take,
            orderBy: { createdAt: "desc" },
            include: {
                user: { select: { id: true, name: true, email: true } },
            },
        });
    },
    /** Get audit logs by user ID */
    getByUserId: async (userId, skip = 0, take = 20) => {
        return prisma.auditLog.findMany({
            where: { userId },
            skip,
            take,
            orderBy: { createdAt: "desc" },
        });
    },
};
export default auditLogRepository;
//# sourceMappingURL=auditLog.repository.js.map