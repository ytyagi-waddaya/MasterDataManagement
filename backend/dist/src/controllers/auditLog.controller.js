import auditLogService from "../services/auditLog.service.js";
import { sendResponse } from "../utils/response.js";
import { HTTPSTATUS } from "../config/http.config.js";
import { BadRequestException } from "../utils/appError.js";
const auditLogController = {
    getAll: async (req, res) => {
        const { skip, take } = req.query;
        const logs = await auditLogService.getAll({
            skip: Number(skip) || 0,
            take: Number(take) || 20,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            message: "Audit logs fetched successfully",
            data: logs,
        });
    },
    getByUserId: async (req, res) => {
        const { userId } = req.params;
        const { skip, take } = req.query;
        if (!userId) {
            throw new BadRequestException("User ID is required");
        }
        const logs = await auditLogService.getByUserId(userId, {
            skip: Number(skip) || 0,
            take: Number(take) || 20,
        });
        sendResponse({
            res,
            statusCode: HTTPSTATUS.OK,
            message: "Audit logs fetched successfully for user",
            data: logs,
        });
    },
};
export default auditLogController;
//# sourceMappingURL=auditLog.controller.js.map