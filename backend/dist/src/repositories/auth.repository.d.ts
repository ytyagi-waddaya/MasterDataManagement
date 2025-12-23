declare const refreshTokenRepository: {
    findValidToken: (tokenHash: string) => Promise<({
        user: {
            email: string;
            type: import("../../prisma/generated/enums.js").UserType;
            password: string;
            id: string;
            createdAt: Date;
            name: string;
            department: string | null;
            location: string | null;
            status: import("../../prisma/generated/enums.js").UserStatus;
            updatedAt: Date;
            attributes: import("@prisma/client/runtime/client").JsonValue | null;
            deletedAt: Date | null;
        };
    } & {
        userId: string;
        ipAddress: string | null;
        id: string;
        createdAt: Date;
        tokenHash: string;
        deviceInfo: string | null;
        isInvalidated: boolean;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
        expiresAt: Date;
    }) | null>;
    invalidateTokenById: (id: string) => Promise<{
        userId: string;
        ipAddress: string | null;
        id: string;
        createdAt: Date;
        tokenHash: string;
        deviceInfo: string | null;
        isInvalidated: boolean;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
        expiresAt: Date;
    }>;
    invalidateTokenByHash: (tokenHash: string) => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
    invalidateAndReplaceToken: (oldTokenId: string, newTokenData: {
        userId: string;
        tokenHash: string;
        deviceInfo?: string | null;
        ipAddress?: string | null;
        expiresAt: Date;
    }) => Promise<[{
        userId: string;
        ipAddress: string | null;
        id: string;
        createdAt: Date;
        tokenHash: string;
        deviceInfo: string | null;
        isInvalidated: boolean;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
        expiresAt: Date;
    }, {
        userId: string;
        ipAddress: string | null;
        id: string;
        createdAt: Date;
        tokenHash: string;
        deviceInfo: string | null;
        isInvalidated: boolean;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
        expiresAt: Date;
    }]>;
    create: (data: {
        userId: string;
        tokenHash: string;
        deviceInfo?: string | null;
        ipAddress?: string | null;
        expiresAt: Date;
    }) => Promise<{
        userId: string;
        ipAddress: string | null;
        id: string;
        createdAt: Date;
        tokenHash: string;
        deviceInfo: string | null;
        isInvalidated: boolean;
        revokedAt: Date | null;
        lastUsedAt: Date | null;
        expiresAt: Date;
    }>;
    deleteExpiredTokens: () => Promise<import("../../prisma/generated/internal/prismaNamespace.js").BatchPayload>;
};
export default refreshTokenRepository;
//# sourceMappingURL=auth.repository.d.ts.map