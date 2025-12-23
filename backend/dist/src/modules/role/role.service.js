import { AuditAction, AuditEntity, PerformedByType, Prisma, } from "../../../prisma/generated/client.js";
import roleRepository from "./role.repository.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { BadRequestException, NotFoundException } from "../../utils/appError.js";
import { createRoleSchema, updateRoleSchema, roleIdSchema, roleIdsSchema, roleFilterSchema, } from "./dto/role.dto.js";
import { generateKey } from "../../common/utils/generate-key.js";
import { OutboxService } from "../../outbox/outbox.service.js";
import { prisma } from "../../lib/prisma.js";
import { safe } from "../../common/utils/sanitize.js";
const roleService = {
    createRole: async (data, meta) => {
        const validatedData = createRoleSchema.parse(data);
        const key = generateKey(validatedData.name);
        const existing = await roleRepository.findByNameAndTenant(validatedData.name);
        if (existing) {
            throw new BadRequestException(`Role "${validatedData.name}" already exists.`);
        }
        const toCreate = {
            name: validatedData.name,
            key,
            description: validatedData.description ?? null,
            isActive: validatedData.isActive ?? true,
            isSystem: validatedData.isSystem ?? false,
        };
        try {
            const resource = await roleRepository.create(toCreate);
            await createAuditLog({
                userId: meta?.actorId ?? null,
                entity: AuditEntity.ROLE,
                action: AuditAction.CREATE,
                comment: "Role created",
                after: resource,
                ipAddress: meta?.ipAddress ?? null,
                userAgent: meta?.userAgent ?? null,
                performedBy: meta?.performedBy ?? PerformedByType.USER,
            });
            return resource;
        }
        catch (err) {
            if (err?.code === "P2002") {
                const target = err.meta?.target ?? [];
                if (target.includes("key")) {
                    throw new BadRequestException(`Module key "${key}" already exists.`);
                }
                if (target.includes("name")) {
                    throw new BadRequestException(`Module name already exists.`);
                }
            }
            throw err;
        }
    },
    getRoles: async (options) => {
        const filters = roleFilterSchema.parse(options || {});
        return await roleRepository.read(filters);
    },
    getRoleById: async ({ roleId }) => {
        const parsedRoleId = roleIdSchema.parse({ roleId });
        const role = await roleRepository.roleById(parsedRoleId);
        if (!role)
            throw new NotFoundException("Role not found.");
        return role;
    },
    updateRoleById: async (id, data, meta) => {
        const parsedId = roleIdSchema.parse(id);
        const validatedData = updateRoleSchema.parse(data);
        const existing = await roleRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("Role not found.");
        if (validatedData.name && validatedData.name !== existing.name) {
            const duplicate = await roleRepository.isDuplicateName(validatedData.name, parsedId.roleId);
            if (duplicate)
                throw new BadRequestException("role name already exists.");
        }
        let dataToUpdate = {};
        if (validatedData.name !== undefined) {
            dataToUpdate.name = { set: validatedData.name };
        }
        if (validatedData.description !== undefined) {
            dataToUpdate.description = { set: validatedData.description };
        }
        if (validatedData.isActive !== undefined) {
            dataToUpdate.isActive = { set: validatedData.isActive };
        }
        if (validatedData.name && validatedData.name !== existing.name) {
            const newKey = generateKey(validatedData.name);
            dataToUpdate.key = { set: newKey };
        }
        const updated = await prisma.$transaction(async (tx) => {
            const mod = await tx.role.update({
                where: { id: parsedId.roleId },
                data: dataToUpdate,
            });
            await tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.ROLE,
                    action: AuditAction.UPDATE,
                    comment: "Role updated",
                    before: existing,
                    after: mod,
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                },
            });
            await OutboxService.createOutboxEvent(tx, {
                entity: "role",
                action: "updated",
                payload: {
                    moduleId: mod.id,
                    name: mod.name,
                },
            });
            return mod;
        });
        return updated;
    },
    archiveRole: async ({ roleId }, meta) => {
        const parsedId = roleIdSchema.parse({ roleId });
        const existing = await roleRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("Role not found.");
        if (existing.isSystem) {
            throw new BadRequestException("System roles cannot be archived.");
        }
        const archived = await roleRepository.archive(parsedId);
        if (!archived)
            throw new NotFoundException("Role not found.");
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.ROLE,
            action: AuditAction.ARCHIVE,
            comment: "Role archived",
            before: existing,
            after: archived,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return archived;
    },
    restoreRole: async ({ roleId }, meta) => {
        const parsedId = roleIdSchema.parse({ roleId });
        const existing = await roleRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("Role not found.");
        if (existing.isSystem) {
            throw new BadRequestException("System roles cannot be archived.");
        }
        const restored = await roleRepository.restore(parsedId);
        if (!restored)
            throw new NotFoundException("Role not found.");
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.ROLE,
            action: AuditAction.RESTORE,
            comment: "Role restored",
            before: existing,
            after: restored,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return restored;
    },
    deleteRole: async ({ roleId }, meta) => {
        const parsedId = roleIdSchema.parse({ roleId });
        const existing = await roleRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("Role not found.");
        if (existing.isSystem) {
            throw new BadRequestException("System roles cannot be deleted.");
        }
        const deleted = await roleRepository.delete(parsedId);
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.ROLE,
            action: AuditAction.DELETE,
            comment: "Role permanently deleted",
            before: existing,
            after: null,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return deleted;
    },
    archiveRoles: async (ids, meta) => {
        const { roleIds } = roleIdsSchema.parse(ids);
        const existingRoles = await roleRepository.findManyByIds(roleIds);
        const activeRoles = existingRoles.filter((r) => !r.deletedAt);
        if (activeRoles.length === 0)
            throw new BadRequestException("No active roles found for the provided IDs.");
        const nonSystemActive = activeRoles.filter((r) => !r.isSystem);
        if (nonSystemActive.length === 0) {
            throw new BadRequestException("All selected roles are system roles and cannot be archived.");
        }
        const idsToArchive = nonSystemActive.map((r) => r.id);
        const result = await prisma.$transaction(async (tx) => {
            const updatedRecords = await Promise.all(idsToArchive.map(async (id) => {
                const updated = await tx.role.update({
                    where: { id },
                    data: {
                        isActive: false,
                        deletedAt: new Date(),
                    },
                });
                return updated;
            }));
            const timestamp = new Date();
            await Promise.all(updatedRecords.map((updated) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.ROLE,
                    action: AuditAction.ARCHIVE,
                    comment: "Role archived",
                    before: safe(existingRoles.find((r) => r.id === updated.id)),
                    after: safe({ ...updated }),
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                },
            })));
            return {
                count: updatedRecords.length,
                archived: updatedRecords.map((r) => r.id),
            };
        });
        return result;
    },
    restoreRoles: async (ids, meta) => {
        const { roleIds } = roleIdsSchema.parse(ids);
        const existingRoles = await roleRepository.findManyByIds(roleIds);
        const inactiveRoles = existingRoles.filter((r) => r.deletedAt);
        if (inactiveRoles.length === 0) {
            throw new BadRequestException("No archived roles found for the provided IDs.");
        }
        const idsToRestore = inactiveRoles.map((r) => r.id);
        const result = await prisma.$transaction(async (tx) => {
            const updatedRecords = await Promise.all(idsToRestore.map(async (id) => {
                const updated = await tx.role.update({
                    where: { id },
                    data: {
                        isActive: true,
                        deletedAt: null,
                    },
                });
                return updated;
            }));
            await Promise.all(updatedRecords.map((updated) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.ROLE,
                    action: AuditAction.RESTORE,
                    comment: "Resource restored",
                    before: safe(existingRoles.find((r) => r.id === updated.id)),
                    after: safe({ ...updated }),
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                },
            })));
            return {
                count: updatedRecords.length,
                restored: updatedRecords.map((r) => r.id),
            };
        });
        return result;
    },
    deleteRoles: async (ids, meta) => {
        const { roleIds } = roleIdsSchema.parse(ids);
        const existingRoles = await roleRepository.findManyByIds(roleIds);
        if (!existingRoles.length)
            throw new BadRequestException("No roles found for provided IDs.");
        const deletable = existingRoles.filter((r) => !r.isSystem);
        const systemRoles = existingRoles.filter((r) => r.isSystem);
        if (deletable.length === 0) {
            throw new BadRequestException("All selected roles are system roles and cannot be deleted.");
        }
        const idsToDelete = deletable.map((r) => r.id);
        const result = await prisma.$transaction(async (tx) => {
            const deletedRecords = await Promise.all(idsToDelete.map(async (id) => {
                const deleted = await tx.role.delete({ where: { id } });
                return deleted;
            }));
            await Promise.all(deletedRecords.map((d) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.ROLE,
                    action: AuditAction.DELETE,
                    comment: "Module permanently deleted",
                    before: safe(existingRoles.find((r) => r.id === d.id)),
                    after: Prisma.JsonNull,
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                },
            })));
            return {
                count: deletedRecords.length,
                deleted: deletedRecords.map((r) => r.id),
                skippedSystemRoles: systemRoles.map((r) => r.name),
            };
        });
        return result;
    },
};
export default roleService;
//# sourceMappingURL=role.service.js.map