import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import authService, { COOKIE_OPTIONS } from "../services/auth.service.js";
import { PerformedByType } from "../../prisma/generated/client.js";
import { BadRequestException } from "../utils/appError.js";
const authController = {
    login: async (req, res) => {
        const data = req.body;
        const user = await authService.login(data, res, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            success: true,
            message: "User logged in successfully",
            data: { user },
        });
    },
    refreshToken: async (req, res) => {
        // const { refreshToken } = req.body;
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return sendResponse({
                res,
                statusCode: HTTPSTATUS.BAD_REQUEST,
                message: "Refresh token is required",
            });
        }
        const { accessToken, refreshToken: newRefreshToken } = await authService.refreshAccessToken(refreshToken, res, req.get("user-agent") ?? undefined, req.ip);
        return sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            message: "Token refreshed successfully",
            data: { accessToken, refreshToken: newRefreshToken },
        });
    },
    logout: async (req, res) => {
        // const { refreshToken } = req.body;
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new BadRequestException("Refresh token is required");
        }
        await authService.logout(refreshToken, res, {
            actorId: req.user?.id ?? null,
            ipAddress: req.ip,
            userAgent: req.get("user-agent") ?? null,
            performedBy: PerformedByType.USER,
        });
        res.clearCookie("accessToken", COOKIE_OPTIONS);
        res.clearCookie("refreshToken", COOKIE_OPTIONS);
        return sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            message: "User logged out successfully",
            success: true,
        });
    },
};
export default authController;
//# sourceMappingURL=auth.controller.js.map