// src/modules/department/department.repository.ts

import { Prisma } from "../../../prisma/generated/client.js";
import { prisma } from "../../lib/prisma.js";

const departmentRepository = {
    create: (data: Prisma.DepartmentCreateInput) => {
        return prisma.department.create({ data });
    },

    findMany: (where?: Prisma.DepartmentWhereInput) => {
        return prisma.department.findMany({
            ...(where ? { where } : {}),   // ✅ only pass if defined
            include: {
                parent: true,
                children: true,
                departmentRoles: {
                    include: { role: true },
                },
            },
            orderBy: { createdAt: "desc" },
        });
    },



    findById: (id: string) => {
        return prisma.department.findUnique({
            where: { id },
            include: {
                parent: true,
                children: true,
                departmentRoles: {
                    include: {
                        role: true,
                    },
                },
            },
        });
    },

    update: (id: string, data: Prisma.DepartmentUpdateInput) => {
        return prisma.department.update({
            where: { id },
            data,
        });
    },

    softDelete: (id: string) => {
        return prisma.department.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                status: "INACTIVE",
            },
        });
    },

    assignMultipleRoles: async (departmentId: string, roleIds: string[]) => {
        return prisma.departmentRole.createMany({
            data: roleIds.map((roleId) => ({
                departmentId,
                roleId,
            })),
            skipDuplicates: true,
        });
    },

    removeMultipleRoles: async (departmentId: string, roleIds: string[]) => {
        return prisma.departmentRole.deleteMany({
            where: {
                departmentId,
                roleId: { in: roleIds },
            },
        });
    },

};

export default departmentRepository;
