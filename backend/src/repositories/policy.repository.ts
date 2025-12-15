import { prisma } from "../lib/prisma.js";
import {
  PolicyId,
  PolicyIds,
  CreatePolicyInput,
  UpdatePolicyInput,
} from "../types/policy.types.js";
import { Policy, Prisma } from "../../prisma/generated/client.js";

const policyRepository = {
  create: (data: CreatePolicyInput) => {
    return prisma.policy.create({ data });
  },

  createMany: (policies: CreatePolicyInput[]) => {
    return prisma.policy.createMany({ data: policies });
  },

  findById: (id: PolicyId) => {
    return prisma.policy.findUnique({ where: { id: id.id } });
  },

  findMany: (filters?: Prisma.PolicyWhereInput) => {
    return prisma.policy.findMany({ where: { ...filters } });
  },

  update: ({ id }: PolicyId, data: UpdatePolicyInput) => {
    return prisma.policy.update({ where: { id }, data });
  },

  softDelete: ({ id }: PolicyId) => {
    return prisma.policy.update({ where: { id }, data: { enabled: false } });
  },

  restore: ({ id }: PolicyId) => {
    return prisma.policy.update({ where: { id }, data: { enabled: true } });
  },

  softDeleteMany: (ids: PolicyIds) => {
    return prisma.policy.updateMany({
      where: { id: { in: ids.id } },
      data: { enabled: false },
    });
  },

  restoreMany: (ids: PolicyIds) => {
    return prisma.policy.updateMany({
      where: { id: { in: ids.id } },
      data: { enabled: true },
    });
  },

  delete: (id: PolicyId) => {
    return prisma.policy.delete({ where: { id: id.id } });
  },

  deleteMany: (ids: PolicyIds) => {
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

