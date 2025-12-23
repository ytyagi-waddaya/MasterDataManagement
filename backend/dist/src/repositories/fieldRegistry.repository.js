import { prisma } from "../lib/prisma.js";
export class FieldRegistryRepository {
    async findManyByFields(fields, tenantId) {
        // optional tenant scoping
        const where = tenantId
            ? { field: { in: fields }, tenantId }
            : { field: { in: fields } };
        const rows = await prisma.conditionFieldRegistry.findMany({ where });
        return rows;
    }
    async getByField(field, tenantId) {
        const where = tenantId ? { field, tenantId } : { field };
        return prisma.conditionFieldRegistry.findUnique({ where });
    }
    // optional: all fields (for cache seeding)
    async getAll(tenantId) {
        const where = tenantId ? { tenantId } : {};
        return prisma.conditionFieldRegistry.findMany({});
    }
}
//# sourceMappingURL=fieldRegistry.repository.js.map