import bcrypt from "bcrypt";
import { BadRequestException } from "../utils/appError.js";
import { sanitize } from "../utils/sanitize.js";
import { createAuditLog } from "../utils/auditLog.js";
import { AuditAction, AuditEntity, PerformedByType, } from "../../prisma/generated/client.js";
import { generateJwtToken, generateRefreshTokenData, hashToken, } from "../utils/jwt.js";
import refreshTokenRepository from "../repositories/auth.repository.js";
import usersRepository from "../modules/user/user.repository.js";
export const COOKIE_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
};
const authService = {
    /** USER LOGIN */
    login: async (data, res, meta) => {
        const { email, password } = data;
        if (!email || !password)
            throw new BadRequestException("All fields are required");
        const user = await usersRepository.findByOnlyEmail({ email });
        if (!user)
            throw new BadRequestException("User not found");
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            throw new BadRequestException("Invalid credentials");
        // 1️⃣ Generate tokens
        const accessToken = generateJwtToken({
            id: user.id,
            email: user.email,
            type: user.type,
            status: user.status,
            department: user.department,
            location: user.location,
            attributes: user.attributes,
        });
        const { token: refreshToken, tokenHash, expiresAt, } = generateRefreshTokenData();
        // 2️⃣ Save refresh token in DB
        await refreshTokenRepository.create({
            userId: user.id,
            tokenHash,
            deviceInfo: meta?.userAgent ?? null,
            ipAddress: meta?.ipAddress ?? null,
            expiresAt,
        });
        res.cookie("accessToken", accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000 * 60 * 60, // 1 hour
        });
        res.cookie("refreshToken", refreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
        });
        // 3️⃣ Create login audit log
        await createAuditLog({
            userId: meta?.actorId ?? user.id,
            entity: AuditEntity.USER,
            action: AuditAction.LOGIN,
            comment: "User logged in",
            after: sanitize(user, ["password"]),
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        // 4️⃣ Return sanitized user + tokens
        const sanitizedUser = sanitize(user, ["password"]);
        return { user: sanitizedUser, accessToken, refreshToken };
    },
    /** REFRESH TOKEN */
    refreshAccessToken: async (refreshToken, res, userAgent, ipAddress) => {
        const tokenHash = hashToken(refreshToken);
        // Step 1: Find token
        const existingToken = await refreshTokenRepository.findValidToken(tokenHash);
        if (!existingToken) {
            throw new BadRequestException("Invalid refresh token");
        }
        // Step 2: Check expiry
        if (existingToken.expiresAt < new Date()) {
            await refreshTokenRepository.invalidateTokenById(existingToken.id);
            throw new Error("Refresh token expired");
        }
        // Step 3: Generate new tokens
        const accessToken = generateJwtToken({
            id: existingToken.userId,
            email: existingToken.user.email,
            type: existingToken.user.type,
            status: existingToken.user.status,
            department: existingToken.user.department,
            location: existingToken.user.location,
            attributes: existingToken.user.attributes,
        });
        const { token: newRefreshToken, tokenHash: newTokenHash, expiresAt, } = generateRefreshTokenData();
        // Step 4: Invalidate old one & create new
        await refreshTokenRepository.invalidateAndReplaceToken(existingToken.id, {
            userId: existingToken.userId,
            tokenHash: newTokenHash,
            deviceInfo: userAgent ?? null,
            ipAddress: ipAddress ?? null,
            expiresAt,
        });
        res.cookie("accessToken", accessToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000 * 60 * 60,
        });
        res.cookie("refreshToken", newRefreshToken, {
            ...COOKIE_OPTIONS,
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });
        return { accessToken, refreshToken: newRefreshToken };
    },
    logout: async (refreshToken, res, meta) => {
        const tokenHash = hashToken(refreshToken);
        // Step 1: Invalidate token
        await refreshTokenRepository.invalidateTokenByHash(tokenHash);
        // res.clearCookie("accessToken", COOKIE_OPTIONS);
        // res.clearCookie("refreshToken", COOKIE_OPTIONS);
        // Step 2: Optional - Audit Log
        if (meta?.actorId) {
            await createAuditLog({
                userId: meta.actorId,
                entity: AuditEntity.USER,
                action: AuditAction.LOGOUT,
                comment: "User logged out",
                ipAddress: meta?.ipAddress ?? null,
                userAgent: meta?.userAgent ?? null,
                performedBy: meta?.performedBy ?? PerformedByType.USER,
            });
        }
        return { message: "Logged out successfully" };
    },
};
export default authService;
//# sourceMappingURL=auth.service.js.map