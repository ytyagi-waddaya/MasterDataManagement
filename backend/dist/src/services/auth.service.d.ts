import { LoginInput } from "../types/auth.types.js";
import { ActorMeta } from "../types/action.types.js";
import { Response } from "express";
export declare const COOKIE_OPTIONS: {
    httpOnly: boolean;
    secure: boolean;
    sameSite: "lax";
    path: string;
};
declare const authService: {
    /** USER LOGIN */
    login: (data: LoginInput, res: Response, meta?: ActorMeta) => Promise<{
        user: Omit<{
            roles: ({
                role: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    updatedAt: Date;
                    deletedAt: Date | null;
                    isActive: boolean;
                    description: string | null;
                    key: string;
                    isSystem: boolean;
                };
            } & {
                userId: string;
                id: string;
                assignedAt: Date;
                roleId: string;
            })[];
        } & {
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
        }, "email" | "type" | "password" | "id" | "createdAt" | "name" | "department" | "location" | "status" | "updatedAt" | "attributes" | "deletedAt" | "roles">;
        accessToken: string;
        refreshToken: string;
    }>;
    /** REFRESH TOKEN */
    refreshAccessToken: (refreshToken: string, res: Response, userAgent?: string, ipAddress?: string) => Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
    logout: (refreshToken: string, res: Response, meta?: ActorMeta) => Promise<{
        message: string;
    }>;
};
export default authService;
//# sourceMappingURL=auth.service.d.ts.map