import policyRepository from "../repositories/policy.repository.js";
import {
  CreatePolicyInput,
  UpdatePolicyInput,
  PolicyId,
  PolicyIds,
  BulkCreatePolicyInput,
  EvaluatePolicyInput,
} from "../types/policy.types.js";
import { ActorMeta } from "../types/action.types.js";
import { createAuditLog } from "../utils/auditLog.js";
import { AuditEntity, AuditAction, PerformedByType } from "../../prisma/generated/client.js";

const policyService = {
  createPolicy: async (data: CreatePolicyInput, meta?: ActorMeta) => {
    const policy = await policyRepository.create(data);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.CREATE,
      comment: `Policy created`,
      after: policy,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policy;
  },

  createPoliciesBulk: async (data: BulkCreatePolicyInput, meta?: ActorMeta) => {
    const policies = await policyRepository.createMany(data.policies);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.CREATE,
      comment: `Bulk policies created`,
      after: data,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policies;
  },

  getPolicyById: async (id: PolicyId) => {
    return policyRepository.findById(id);
  },

  getPolicies: async (filters?: any) => {
    return policyRepository.findMany(filters);
  },

  updatePolicyById: async ({id}: PolicyId, data: UpdatePolicyInput, meta?: ActorMeta) => {
    const updated = await policyRepository.update({id}, data);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.UPDATE,
      comment: `Policy updated`,
      after: updated,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return updated;
  },

  softDeletePolicy: async ({id}: PolicyId, meta?: ActorMeta) => {
    const policy = await policyRepository.softDelete({id});

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.UPDATE,
      comment: `Policy soft deleted`,
      after: policy,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policy;
  },

  restorePolicy: async ({id}: PolicyId, meta?: ActorMeta) => {
    const policy = await policyRepository.restore({id});

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.UPDATE,
      comment: `Policy restored`,
      after: policy,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policy;
  },

  softDeleteManyPolicies: async (ids: PolicyIds, meta?: ActorMeta) => {
    const policies = await policyRepository.softDeleteMany(ids);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.UPDATE,
      comment: `Bulk policies soft deleted`,
      after: ids,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policies;
  },

  restoreManyPolicies: async (ids: PolicyIds, meta?: ActorMeta) => {
    const policies = await policyRepository.restoreMany(ids);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.UPDATE,
      comment: `Bulk policies restored`,
      after: ids,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policies;
  },

  deletePolicy: async (id: PolicyId, meta?: ActorMeta) => {
    const policy = await policyRepository.delete(id);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.DELETE,
      comment: `Policy deleted`,
      after: policy,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policy;
  },

  deleteManyPolicies: async (ids: PolicyIds, meta?: ActorMeta) => {
    const policies = await policyRepository.deleteMany(ids);

    await createAuditLog({
      userId: meta?.actorId ?? null,
      entity: AuditEntity.POLICY,
      action: AuditAction.DELETE,
      comment: `Bulk policies deleted`,
      after: ids,
      performedBy: meta?.performedBy ?? PerformedByType.USER,
    });

    return policies;
  },

// evaluate: async ({ userId, resource, action, context }: EvaluatePolicyInput) => {
//   const policies = await policyRepository.findByTenant(tenantId);

//   // Filter policies matching resource/action
//   const applicable = policies.filter(
//     (p) => (!p.resource || p.resource.name === resource) &&
//            (!p.action || p.action.name === action)
//   );

//   // Sort by priority (lower number = higher priority)
//   applicable.sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100));

//   // Evaluate conditions (simplified example)
//   for (const policy of applicable) {
//     // TODO: Replace with real ABAC/JSONLogic evaluation
//     const allowed = policy.effect === "ALLOW";
//     return { allowed, policyId: policy.id };
//   }

//   return { allowed: false };
// },

};

export default policyService;
