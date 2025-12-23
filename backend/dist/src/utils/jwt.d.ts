import { UserJwtPayload } from "../types/auth.js";
export declare const generateJwtToken: (payload: UserJwtPayload) => string;
export declare const createRefreshToken: () => string;
export declare const hashToken: (token: string) => string;
export declare const verifyJwtToken: (token: string) => UserJwtPayload | null;
export declare const generateRefreshTokenData: () => {
    token: string;
    tokenHash: string;
    expiresAt: Date;
};
//# sourceMappingURL=jwt.d.ts.map