import { prisma } from "../lib/prisma.js";

const refreshTokenRepository = {
  findValidToken: async (tokenHash: string) => {
    return prisma.refreshToken.findFirst({
      where: { tokenHash, isInvalidated: false },
      // include: { user: true },
      include: {
        user: {
          include: {
            department: {
              include: {
                department: true,
              },
            },
          },
        },
      }

    });
  },

  invalidateTokenById: async (id: string) => {
    return prisma.refreshToken.update({
      where: { id },
      data: { isInvalidated: true, revokedAt: new Date() },
    });
  },

  invalidateTokenByHash: async (tokenHash: string) => {
    return prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { isInvalidated: true, revokedAt: new Date() },
    });
  },

  invalidateAndReplaceToken: async (
    oldTokenId: string,
    newTokenData: {
      userId: string;
      tokenHash: string;
      deviceInfo?: string | null;
      ipAddress?: string | null;
      expiresAt: Date;
    }
  ) => {
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

  create: async (data: {
    userId: string;
    tokenHash: string;
    deviceInfo?: string | null;
    ipAddress?: string | null;
    expiresAt: Date;
  }) => {
    return prisma.refreshToken.create({ data });
  },

  deleteExpiredTokens: async () => {
    return prisma.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    });
  },
};

export default refreshTokenRepository;
