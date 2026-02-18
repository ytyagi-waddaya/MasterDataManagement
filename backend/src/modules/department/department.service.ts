import {
    AuditAction,
    AuditEntity,
    PerformedByType,
    Prisma,
} from "../../../prisma/generated/client.js";

import departmentRepository from "./department.repository.js";
import { createAuditLog } from "../../utils/auditLog.js";
import { BadRequestException, NotFoundException } from "../../utils/appError.js";
import {
    createDepartmentSchema,
    updateDepartmentSchema,
    departmentIdSchema,
    departmentIdsSchema,
    CreateDepartmentInput,
    UpdateDepartmentInput,
    DepartmentId,
    DepartmentIds,
} from "./dto/department.dto.js";
import { prisma } from "../../lib/prisma.js";
import { ActorMeta } from "../../types/action.types.js";

const departmentService = {
    // CREATE
    createDepartment: async (
        data: CreateDepartmentInput,
        meta?: ActorMeta
    ) => {
        const validated = createDepartmentSchema.parse(data);

        const existing = await prisma.department.findUnique({
            where: { code: validated.code },
        });

        if (existing) {
            throw new BadRequestException("Department code already exists.");
        }

        const createData: Prisma.DepartmentCreateInput = {
            name: validated.name,
            code: validated.code,
            description: validated.description ?? null,
            status: "ACTIVE",
        };

        if (validated.parentId) {
            createData.parent = {
                connect: { id: validated.parentId },
            };
        }


        const created = await departmentRepository.create(createData);

        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.MODULE,
            action: AuditAction.CREATE,
            comment: "Department created",
            after: created,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });

        return created;
    },


    // GET ALL
    getDepartments: async (filters?: any) => {
        const where: Prisma.DepartmentWhereInput = {};

        if (filters?.status) {
            where.status = filters.status;
        }

        if (filters?.search) {
            where.OR = [
                { name: { contains: filters.search, mode: "insensitive" } },
                { code: { contains: filters.search, mode: "insensitive" } },
            ];
        }

        return departmentRepository.findMany(where);
    },


    // GET BY ID
    getDepartmentById: async ({ departmentId }: DepartmentId) => {
        const parsed = departmentIdSchema.parse({ departmentId });

        const department = await departmentRepository.findById(
            parsed.departmentId
        );

        if (!department) {
            throw new NotFoundException("Department not found.");
        }

        return department;
    },

    // UPDATE
    updateDepartment: async (
        id: DepartmentId,
        data: UpdateDepartmentInput,
        meta?: ActorMeta
    ) => {
        const parsed = departmentIdSchema.parse(id);
        const validated = updateDepartmentSchema.parse(data);

        const existing = await departmentRepository.findById(
            parsed.departmentId
        );
        if (!existing) throw new NotFoundException("Department not found.");

        const updateData: Prisma.DepartmentUpdateInput = {};

        if (validated.name !== undefined) {
            updateData.name = validated.name;
        }

        if (validated.description !== undefined) {
            updateData.description = validated.description ?? null;
        }

        if (validated.status !== undefined) {
            updateData.status = validated.status;
        }

        if (validated.parentId !== undefined) {
            updateData.parent =
                validated.parentId === null
                    ? { disconnect: true }
                    : { connect: { id: validated.parentId } };
        }

        const updated = await prisma.$transaction(async (tx) => {
            const dept = await tx.department.update({
                where: { id: parsed.departmentId },
                data: updateData,
            });

            await tx.auditLog.create({
                data: {
                    userId: meta?.actorId ?? null,
                    entity: AuditEntity.MODULE,
                    action: AuditAction.UPDATE,
                    comment: "Department updated",
                    before: existing,
                    after: dept,
                },
            });

            return dept;
        });

        return updated;
    },

    // ARCHIVE
    archiveDepartment: async (
        { departmentId }: DepartmentId,
        meta?: ActorMeta
    ) => {
        const parsed = departmentIdSchema.parse({ departmentId });

        const existing = await departmentRepository.findById(
            parsed.departmentId
        );
        if (!existing) throw new NotFoundException("Department not found.");

        const archived = await departmentRepository.softDelete(
            parsed.departmentId
        );

        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.MODULE,
            action: AuditAction.ARCHIVE,
            comment: "Department archived",
            before: existing,
            after: archived,
        });

        return archived;
    },

    // BULK ARCHIVE
    archiveDepartments: async (
        ids: DepartmentIds,
        meta?: ActorMeta
    ) => {
        const { departmentIds } = departmentIdsSchema.parse(ids);

        const result = await prisma.$transaction(async (tx) => {
            const updated = await Promise.all(
                departmentIds.map((id) =>
                    tx.department.update({
                        where: { id },
                        data: {
                            status: "INACTIVE",
                            deletedAt: new Date(),
                        },
                    })
                )
            );

            return {
                count: updated.length,
                archived: updated.map((d) => d.id),
            };
        });

        return result;
    },

    // ASSIGN MULTIPLE ROLES
    assignRoles: async (departmentId: string, roleIds: string[]) => {
        return departmentRepository.assignMultipleRoles(
            departmentId,
            roleIds
        );
    },

    removeRoles: async (departmentId: string, roleIds: string[]) => {
        return departmentRepository.removeMultipleRoles(
            departmentId,
            roleIds
        );
    },
    // SINGLE RESTORE
    restoreDepartment: async (
        { departmentId }: DepartmentId,
        meta?: ActorMeta
    ) => {
        const parsed = departmentIdSchema.parse({ departmentId });

        const existing = await departmentRepository.findById(parsed.departmentId);
        if (!existing) throw new NotFoundException("Department not found.");

        const restored = await prisma.department.update({
            where: { id: parsed.departmentId },
            data: {
                status: "ACTIVE",
                deletedAt: null,
            },
        });

        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.MODULE,
            action: AuditAction.RESTORE,
            comment: "Department restored",
            before: existing,
            after: restored,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });

        return restored;
    },
    // BULK RESTORE
    restoreDepartments: async (
        ids: DepartmentIds,
        meta?: ActorMeta
    ) => {
        const { departmentIds } = departmentIdsSchema.parse(ids);

        const existingDepartments = await prisma.department.findMany({
            where: { id: { in: departmentIds } },
        });

        if (!existingDepartments.length) {
            throw new NotFoundException("No departments found.");
        }

        const result = await prisma.$transaction(async (tx) => {
            const restored = await Promise.all(
                departmentIds.map((id) =>
                    tx.department.update({
                        where: { id },
                        data: {
                            status: "ACTIVE",
                            deletedAt: null,
                        },
                    })
                )
            );

            // Audit logs
            await Promise.all(
                restored.map((dept) => {
                    const beforeData = existingDepartments.find(
                        (d) => d.id === dept.id
                    );

                    return tx.auditLog.create({
                        data: {
                            userId: meta?.actorId ?? null,
                            entity: AuditEntity.MODULE,
                            action: AuditAction.RESTORE,
                            comment: "Department restored (bulk)",

                            before: beforeData
                                ? JSON.parse(JSON.stringify(beforeData))
                                : null,

                            after: JSON.parse(JSON.stringify(dept)),

                            performedBy: meta?.performedBy ?? PerformedByType.USER,
                        },
                    });
                })
            );


            return {
                count: restored.length,
                restored: restored.map((d) => d.id),
            };
        });

        return result;
    },
    // SINGLE HARD DELETE
    deleteDepartment: async (
        { departmentId }: DepartmentId,
        meta?: ActorMeta
    ) => {

        const existing = await prisma.department.findUnique({
            where: { id: departmentId },
        });

        if (!existing)
            throw new NotFoundException("Department not found.");

        await prisma.department.delete({
            where: { id: departmentId },
        });

        await createAuditLog({
            userId: meta?.actorId ?? null,
            entity: AuditEntity.MODULE,
            action: AuditAction.DELETE,
            comment: "Department permanently deleted",
            before: existing,
            performedBy: meta?.performedBy ?? PerformedByType.USER,
        });

        return { deletedId: departmentId };
    },

    // BULK HARD DELETE
    deleteDepartments: async (
        ids: DepartmentIds,
        meta?: ActorMeta
    ) => {

        const { departmentIds } = departmentIdsSchema.parse(ids);

        const existingDepartments = await prisma.department.findMany({
            where: { id: { in: departmentIds } },
        });

        const deleted = await prisma.$transaction(
            departmentIds.map((id) =>
                prisma.department.delete({
                    where: { id },
                })
            )
        );

        await Promise.all(
            deleted.map((dept) =>
                prisma.auditLog.create({
                    data: {
                        userId: meta?.actorId ?? null,
                        entity: AuditEntity.MODULE,
                        action: AuditAction.DELETE,
                        comment: "Department permanently deleted (bulk)",
                        before: JSON.parse(
                            JSON.stringify(
                                existingDepartments.find((d) => d.id === dept.id) ?? null
                            )
                        ),
                        performedBy: meta?.performedBy ?? PerformedByType.USER,
                    },
                })
            )
        );



        return {
            count: deleted.length,
            deleted: deleted.map((d) => d.id),
        };
    },
  getRolesByDepartment: async (departmentId: string) => {

  const department = await prisma.department.findUnique({
    where: { id: departmentId }
  });

  if (!department) {
    throw new NotFoundException("Department not found.");
  }

  const roles = await prisma.role.findMany({
    where: {
      departmentRoles: {
        some: {
          departmentId: departmentId,
        },
      },
    },
  });

  return roles;
},


};

export default departmentService;