import auditLogRepository from "../repositories/auditLog.repository.js";
const auditLogService = {
    getAll: async (params) => {
        const { skip = 0, take = 20 } = params;
        return auditLogRepository.getAll(skip, take);
    },
    getByUserId: async (userId, params) => {
        const { skip = 0, take = 20 } = params;
        return auditLogRepository.getByUserId(userId, skip, take);
    },
};
export default auditLogService;
//# sourceMappingURL=auditLog.service.js.map