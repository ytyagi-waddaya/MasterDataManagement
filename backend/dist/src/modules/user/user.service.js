import usersRepository from "./user.repository.js";
import { createUserSchema, updateUserSchema, userEmailOnlySchema, userFilterSchema, userIdSchema, userIdsSchema, } from "./dto/user.dto.js";
import { BadRequestException, NotFoundException } from "../../utils/appError.js";
import bcrypt from "bcrypt";
import { sanitize, sanitizeArrayShallow } from "../../utils/sanitize.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { AuditAction, AuditEntity, PerformedByType, Prisma, } from "../../../prisma/generated/client.js";
import { safe } from "../../common/utils/sanitize.js";
import { prisma } from "../../lib/prisma.js";
import { OutboxService } from "../../outbox/outbox.service.js";
const usersService = {
    createUser: async (data, meta) => {
        const validatedData = createUserSchema.parse(data);
        const parsedEmail = userEmailOnlySchema.parse({
            email: validatedData.email,
        });
        const existing = await usersRepository.findByEmail(parsedEmail);
        if (existing) {
            throw new BadRequestException("User already exists");
        }
        const hashPassword = await bcrypt.hash(validatedData.password, 10);
        const user = await usersRepository.create({
            ...validatedData,
            password: hashPassword,
        });
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER,
            action: AuditAction.CREATE,
            comment: "User created",
            after: user,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return sanitize(user);
    },
    createUsers: async (data, meta) => {
        if (!data.length) {
            throw new BadRequestException("No user data provided for bulk creation");
        }
        const validatedData = data.map((d) => createUserSchema.parse(d));
        const emails = validatedData.map((u) => u.email);
        const existingUsers = await usersRepository.findByEmails(emails);
        const existingEmails = existingUsers.map((u) => u.email);
        if (existingEmails.length > 0) {
            throw new BadRequestException(`Users already exist: ${existingEmails.join(", ")}`);
        }
        const usersToCreate = await Promise.all(validatedData.map(async (user) => ({
            ...user,
            password: await bcrypt.hash(user.password, 10),
        })));
        const createdUsers = await usersRepository.createMany(usersToCreate);
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER,
            action: AuditAction.CREATE,
            comment: `Bulk created ${Array.isArray(createdUsers) ? createdUsers.length : "N"} users`,
            after: Array.isArray(createdUsers) ? createdUsers : undefined,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return createdUsers;
    },
    getUserStats: async () => {
        const [stats, signupStats, activeUsers] = await Promise.all([
            usersRepository.getStats(),
            usersRepository.getSignupStats(30),
            usersRepository.findActiveUsers(0, 5),
        ]);
        return {
            summary: stats,
            signups: signupStats,
            recentActiveUsers: sanitizeArrayShallow(activeUsers),
        };
    },
    getUsers: async (options) => {
        const filters = userFilterSchema.parse(options || {});
        let users;
        users = await usersRepository.read(filters);
        if (Array.isArray(users?.data)) {
            users.data = sanitizeArrayShallow(users.data, ["password"]);
        }
        return users;
    },
    getUser: async ({ userId }) => {
        const parsedUserId = userIdSchema.parse({ userId });
        const user = await usersRepository.readOne(parsedUserId);
        if (!user)
            throw new NotFoundException("User not found.");
        return sanitize(user);
    },
    updateUser: async (id, data, meta) => {
        const parsedId = userIdSchema.parse(id);
        const validatedData = updateUserSchema.parse(data);
        const existing = await usersRepository.readOne(parsedId);
        if (!existing)
            throw new NotFoundException("User not found.");
        // OPTIONAL: Prevent editing service/system accounts
        if (existing.type === "SERVICE") {
            throw new BadRequestException("Service accounts cannot be modified.");
        }
        // Hash password if provided
        if (validatedData.password) {
            validatedData.password = await bcrypt.hash(validatedData.password, 10);
        }
        // Build Prisma update input
        let dataToUpdate = {};
        if (validatedData.name !== undefined) {
            dataToUpdate.name = { set: validatedData.name };
        }
        if (validatedData.password !== undefined) {
            dataToUpdate.password = { set: validatedData.password };
        }
        if (validatedData.department !== undefined) {
            dataToUpdate.department = { set: validatedData.department };
        }
        if (validatedData.location !== undefined) {
            dataToUpdate.location = { set: validatedData.location };
        }
        // Update type (INTERNAL / EXTERNAL / SERVICE)
        if (validatedData.type !== undefined) {
            dataToUpdate.type = { set: validatedData.type };
        }
        // Update status (ACTIVE / INACTIVE / SUSPENDED / LOCKED)
        if (validatedData.status !== undefined) {
            dataToUpdate.status = { set: validatedData.status };
        }
        //   // Flexible ABAC attributes (JSON)
        //   if (validatedData.attributes !== undefined) {
        //     dataToUpdate.attributes = { set: validatedData.attributes };
        //   }
        // Execute in transaction (same as role update)
        const updated = await prisma.$transaction(async (tx) => {
            const mod = await tx.user.update({
                where: { id: parsedId.userId },
                data: dataToUpdate,
            });
            // Audit Log
            await tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.USER,
                    action: AuditAction.UPDATE,
                    comment: "User updated",
                    before: safe(existing),
                    after: safe(mod),
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                },
            });
            // OPTIONAL: Outbox event (if you need similar to role)
            await OutboxService.createOutboxEvent(tx, {
                entity: "user",
                action: "updated",
                payload: {
                    userId: mod.id,
                    name: mod.name,
                    type: mod.type,
                    status: mod.status,
                },
            });
            return mod;
        });
        return sanitize(updated);
    },
    archiveUser: async ({ userId }, meta) => {
        const parsedUserId = userIdSchema.parse({ userId });
        const existing = await usersRepository.readOne(parsedUserId);
        if (!existing)
            throw new NotFoundException("User not found");
        const archived = await usersRepository.archive(parsedUserId);
        if (!archived)
            throw new NotFoundException("User not found.");
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER,
            action: AuditAction.SOFT_DELETE,
            comment: "User soft-deleted",
            before: existing,
            after: archived,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return sanitize(archived);
    },
    restoreUser: async ({ userId }, meta) => {
        const parsedUserId = userIdSchema.parse({ userId });
        const existing = await usersRepository.readOne(parsedUserId);
        if (!existing)
            throw new NotFoundException("User not found.");
        const restored = await usersRepository.activate(parsedUserId);
        if (!restored)
            throw new NotFoundException("User not found.");
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER,
            action: AuditAction.RESTORE,
            comment: "User restored from soft delete",
            before: existing,
            after: restored,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return sanitize(restored);
    },
    deleteUser: async ({ userId }, meta) => {
        const parsedUserId = userIdSchema.parse({ userId });
        if (!parsedUserId)
            throw new BadRequestException("User ID is required.");
        const existing = await usersRepository.readOne(parsedUserId);
        if (!existing)
            throw new NotFoundException("User not found.");
        const deleted = await usersRepository.delete(parsedUserId);
        if (!deleted)
            throw new NotFoundException("User not found.");
        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.USER,
            action: AuditAction.DELETE,
            comment: "User permanently deleted",
            before: existing,
            after: null,
            ipAddress: meta?.ipAddress ?? null,
            userAgent: meta?.userAgent ?? null,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });
        return sanitize(deleted);
    },
    archiveUsers: async (ids, meta) => {
        const { userIds } = userIdsSchema.parse(ids);
        const existingUsers = await usersRepository.findManyByIds(userIds);
        // Active = not soft-deleted
        const activeUsers = existingUsers.filter((u) => !u.deletedAt);
        if (activeUsers.length === 0)
            throw new BadRequestException("No active users found for the provided IDs.");
        // Exclude system/service users (optional rule)
        const nonSystem = activeUsers.filter((u) => u.type !== "SERVICE");
        if (nonSystem.length === 0)
            throw new BadRequestException("All selected users are system/service accounts and cannot be archived.");
        const idsToArchive = nonSystem.map((u) => u.id);
        const result = await prisma.$transaction(async (tx) => {
            // 1. Update users
            const archived = await Promise.all(idsToArchive.map((id) => tx.user.update({
                where: { id },
                data: {
                    status: "INACTIVE",
                    deletedAt: new Date(),
                },
            })));
            // 2. Audit logs
            await Promise.all(archived.map((updated) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.USER,
                    action: AuditAction.SOFT_DELETE,
                    comment: "User archived",
                    before: safe(existingUsers.find((u) => u.id === updated.id)),
                    after: safe(updated),
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                },
            })));
            return {
                count: archived.length,
                archived: archived.map((u) => u.id),
            };
        });
        return result;
    },
    restoreUsers: async (ids, meta) => {
        const { userIds } = userIdsSchema.parse(ids);
        const existingUsers = await usersRepository.findManyByIds(userIds);
        const archivedUsers = existingUsers.filter((u) => u.deletedAt);
        if (archivedUsers.length === 0)
            throw new BadRequestException("No archived users found for the provided IDs.");
        const idsToRestore = archivedUsers.map((u) => u.id);
        const result = await prisma.$transaction(async (tx) => {
            const restored = await Promise.all(idsToRestore.map((id) => tx.user.update({
                where: { id },
                data: {
                    deletedAt: null,
                    status: "ACTIVE",
                },
            })));
            await Promise.all(restored.map((updated) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.USER,
                    action: AuditAction.RESTORE,
                    comment: "User restored",
                    before: safe(existingUsers.find((u) => u.id === updated.id)),
                    after: safe(updated),
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                },
            })));
            return {
                count: restored.length,
                restored: restored.map((u) => u.id),
            };
        });
        return result;
    },
    deleteUsers: async (ids, meta) => {
        const { userIds } = userIdsSchema.parse(ids);
        const existingUsers = await usersRepository.findManyByIds(userIds);
        if (!existingUsers.length)
            throw new BadRequestException("No users found for provided IDs.");
        // Block deleting system/service accounts
        const deletable = existingUsers.filter((u) => u.type !== "SERVICE");
        const systemUsers = existingUsers.filter((u) => u.type === "SERVICE");
        if (deletable.length === 0)
            throw new BadRequestException("All selected users are system/service accounts and cannot be deleted.");
        const idsToDelete = deletable.map((u) => u.id);
        const result = await prisma.$transaction(async (tx) => {
            const deletedRecords = await Promise.all(idsToDelete.map((id) => tx.user.delete({ where: { id } })));
            await Promise.all(deletedRecords.map((u) => tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.USER,
                    action: AuditAction.DELETE,
                    comment: "User permanently deleted",
                    before: safe(existingUsers.find((x) => x.id === u.id)),
                    after: Prisma.JsonNull,
                    performedBy: meta?.performedBy ?? PerformedByType.USER,
                    ipAddress: meta?.ipAddress ?? null,
                    userAgent: meta?.userAgent ?? null,
                },
            })));
            return {
                count: deletedRecords.length,
                deleted: deletedRecords.map((u) => u.id),
                skippedSystemUsers: systemUsers.map((u) => u.email),
            };
        });
        return result;
    },
    me: async ({ userId }) => {
        const parsedUserId = userIdSchema.parse({ userId });
        const user = await usersRepository.me(parsedUserId);
        if (!user)
            throw new Error("User not found");
        /* ------------------------------------------
         Extract Roles (Flattened)
      ------------------------------------------- */
        const roles = user.roles.map((r) => ({
            id: r.role.id,
            name: r.role.name,
            key: r.role.key,
            description: r.role.description,
            isSystem: r.role.isSystem,
            isActive: r.role.isActive,
        }));
        /* ------------------------------------------
         Extract Permissions (Flattened)
         User → UserRole → Role → RolePermission
      ------------------------------------------- */
        const permissions = [];
        for (const ur of user.roles) {
            for (const rp of ur.role.permissions) {
                permissions.push({
                    roleId: ur.roleId,
                    permissionId: rp.permissionId,
                    accessLevel: rp.accessLevel,
                    conditions: rp.conditions,
                    expression: rp.expression,
                    permission: {
                        id: rp.permission.id,
                        key: rp.permission.key,
                        name: rp.permission.name,
                        description: rp.permission.description,
                        resource: rp.permission.resource
                            ? {
                                id: rp.permission.resource.id,
                                key: rp.permission.resource.key,
                                name: rp.permission.resource.name,
                            }
                            : null,
                        action: rp.permission.action
                            ? {
                                id: rp.permission.action.id,
                                key: rp.permission.action.key, // e.g. READ, UPDATE, APPROVE
                                name: rp.permission.action.name,
                            }
                            : null,
                    },
                });
            }
        }
        /* ------------------------------------------
         Final Output — Clean Shape for Frontend
      ------------------------------------------- */
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                department: user.department,
                location: user.location,
                attributes: user.attributes,
                status: user.status,
                type: user.type,
            },
            roles,
            permissions,
        };
    },
};
export default usersService;
//# sourceMappingURL=user.service.js.map