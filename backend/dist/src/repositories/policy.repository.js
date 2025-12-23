import { prisma } from "../lib/prisma.js";
const policyRepository = {
    create: (data) => {
        return prisma.policy.create({ data });
    },
    createMany: (policies) => {
        return prisma.policy.createMany({ data: policies });
    },
    findById: (id) => {
        return prisma.policy.findUnique({ where: { id: id.id } });
    },
    findMany: (filters) => {
        return prisma.policy.findMany({ where: { ...filters } });
    },
    update: ({ id }, data) => {
        return prisma.policy.update({ where: { id }, data });
    },
    softDelete: ({ id }) => {
        return prisma.policy.update({ where: { id }, data: { enabled: false } });
    },
    restore: ({ id }) => {
        return prisma.policy.update({ where: { id }, data: { enabled: true } });
    },
    softDeleteMany: (ids) => {
        return prisma.policy.updateMany({
            where: { id: { in: ids.id } },
            data: { enabled: false },
        });
    },
    restoreMany: (ids) => {
        return prisma.policy.updateMany({
            where: { id: { in: ids.id } },
            data: { enabled: true },
        });
    },
    delete: (id) => {
        return prisma.policy.delete({ where: { id: id.id } });
    },
    deleteMany: (ids) => {
        return prisma.policy.deleteMany({ where: { id: { in: ids.id } } });
    },
    //   findByTenant: (
    //     tenantId: string
    //   ): Promise<
    //     (Policy & {
    //       resource: { name: string } | null;
    //       action: { name: string } | null;
    //     })[]
    //   > => {
    //     return prisma.policy.findMany({
    //       where: { tenantId, enabled: true },
    //       include: { resource: true, action: true },
    //     });
    //   },
};
export default policyRepository;
//# sourceMappingURL=policy.repository.js.map