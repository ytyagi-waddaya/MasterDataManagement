import auditLogRepository from "../repositories/auditLog.repository.js";

const auditLogService = {
  getAll: async (params: { skip?: number; take?: number }) => {
    const { skip = 0, take = 20 } = params;
    return auditLogRepository.getAll(skip, take);
  },

  getByUserId: async (userId: string, params: { skip?: number; take?: number }) => {
    const { skip = 0, take = 20 } = params;
    return auditLogRepository.getByUserId(userId, skip, take);
  },
};

export default auditLogService;
