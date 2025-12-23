import { prisma } from "../lib/prisma.js";
const refreshTokenRepository = {
    findValidToken: async (tokenHash) => {
        return prisma.refreshToken.findFirst({
            where: { tokenHash, isInvalidated: false },
            include: { user: true },
        });
    },
    invalidateTokenById: async (id) => {
        return prisma.refreshToken.update({
            where: { id },
            data: { isInvalidated: true, revokedAt: new Date() },
        });
    },
    invalidateTokenByHash: async (tokenHash) => {
        return prisma.refreshToken.updateMany({
            where: { tokenHash },
            data: { isInvalidated: true, revokedAt: new Date() },
        });
    },
    invalidateAndReplaceToken: async (oldTokenId, newTokenData) => {
        return prisma.$transaction([
            prisma.refreshToken.update({
                where: { id: oldTokenId },
                data: {
                    isInvalidated: true,
                    revokedAt: new Date(),
                },
            }),
            prisma.refreshToken.create({
                data: newTokenData,
            }),
        ]);
    },
    create: async (data) => {
        return prisma.refreshToken.create({ data });
    },
    deleteExpiredTokens: async () => {
        return prisma.refreshToken.deleteMany({
            where: { expiresAt: { lt: new Date() } },
        });
    },
};
export default refreshTokenRepository;
//# sourceMappingURL=auth.repository.js.map