import { prisma } from "../../lib/prisma.js";
import {
  BadRequestException,
  NotFoundException,
} from "../../utils/appError.js";
import rolePermissionRepository from "./rolePermission.repository.js";
import {
  ConditionsSchema,
  UpdateAccessLevelInput,
} from "./dto/rolePermission.dto.js";
import {
  AuditAction,
  AuditEntity,
  PerformedByType,
} from "../../../prisma/generated/enums.js";
import { validateExpression } from "../../utils/expressionValidator.js";
import { Prisma } from "../../../prisma/generated/client.js";
import { ActorMeta } from "../../types/action.types.js";
import { validateConditionGroupAsync } from "../../services/conditionValidator.js";

const rolePermissionService = {
  /** Update a single permission using FULL, NONE, CONDITIONAL */
  // updateAccessLevel: async ({
  //   roleId,
  //   permissionId,
  //   input,
  //   meta,
  // }: {
  //   roleId: string;
  //   permissionId: string;
  //   input: UpdateAccessLevelInput;
  //   meta?: ActorMeta;
  // }) => {
  //   // Validate CONDITIONAL rules & expression
  //   if (input.accessLevel === "CONDITIONAL") {
  //     try {
  //       ConditionsSchema.parse(input.conditions);
  //     } catch (err: any) {
  //       throw new BadRequestException(
  //         `Invalid conditions: ${err?.message ?? "invalid"}`
  //       );
  //     }

  //     if (input.expression) {
  //       const res = validateExpression(input.expression, {
  //         allowedFieldPattern: /^[A-Za-z_][A-Za-z0-9_\.]*$/,
  //       });

  //       if (!res.valid) {
  //         throw new BadRequestException(`Invalid expression: ${res.error}`);
  //       }
  //     }
  //   }

  //   return prisma.$transaction(async (tx) => {
  //     // Validate role
  //     const role = await tx.role.findUnique({ where: { id: roleId } });
  //     if (!role) throw new NotFoundException("Role not found");

  //     // Validate permission
  //     const permission = await tx.permission.findUnique({
  //       where: { id: permissionId },
  //     });
  //     if (!permission) throw new NotFoundException("Permission not found");

  //     // Take before snapshot for audit
  //     const before = await tx.rolePermission.findUnique({
  //       where: { roleId_permissionId: { roleId, permissionId } },
  //     });

  //     let after: any = null;

  //     /* ---------------------------------------------------------------------- */
  //     /*                                 NONE                                   */
  //     /* ---------------------------------------------------------------------- */
  //     if (input.accessLevel === "NONE") {
  //       await tx.rolePermission.deleteMany({
  //         where: { roleId, permissionId },
  //       });

  //       after = null;
  //     } else if (input.accessLevel === "FULL") {
  //       /* ---------------------------------------------------------------------- */
  //       /*                                 FULL                                   */
  //       /* ---------------------------------------------------------------------- */
  //       const up = await tx.rolePermission.upsert({
  //         where: { roleId_permissionId: { roleId, permissionId } },
  //         update: {
  //           accessLevel: "FULL",
  //           conditions: Prisma.JsonNull, // JSON column
  //           expression: null, // String? column → must be null
  //         },
  //         create: {
  //           roleId,
  //           permissionId,
  //           accessLevel: "FULL",
  //           conditions: Prisma.JsonNull,
  //           expression: null,
  //         },
  //       });

  //       after = up;
  //     } else if (input.accessLevel === "CONDITIONAL") {
  //       /* ---------------------------------------------------------------------- */
  //       /*                             CONDITIONAL                                */
  //       /* ---------------------------------------------------------------------- */
  //       const up = await tx.rolePermission.upsert({
  //         where: { roleId_permissionId: { roleId, permissionId } },
  //         update: {
  //           accessLevel: "CONDITIONAL",
  //           conditions:
  //             input.conditions === undefined || input.conditions === null
  //               ? Prisma.JsonNull
  //               : input.conditions,
  //           expression:
  //             input.expression === undefined || input.expression === null
  //               ? null // STRING? → MUST use null
  //               : input.expression,
  //         },
  //         create: {
  //           roleId,
  //           permissionId,
  //           accessLevel: "CONDITIONAL",
  //           conditions:
  //             input.conditions === undefined || input.conditions === null
  //               ? Prisma.JsonNull
  //               : input.conditions,
  //           expression:
  //             input.expression === undefined || input.expression === null
  //               ? null
  //               : input.expression,
  //         },
  //       });

  //       after = up;
  //     }

  //     /* ---------------------------------------------------------------------- */
  //     /*                            AUDIT LOGGING                               */
  //     /* ---------------------------------------------------------------------- */
  //     await tx.auditLog.create({
  //       data: {
  //         userId: meta?.actorId ?? null,
  //         entity: AuditEntity.ROLE_PERMISSION,
  //         action:
  //           input.accessLevel === "NONE"
  //             ? AuditAction.DELETE
  //             : input.accessLevel === "FULL"
  //             ? AuditAction.GRANT
  //             : AuditAction.UPDATE,
  //         comment: `Updated role-permission accessLevel to ${input.accessLevel}`,
  //         after,
  //         ipAddress: meta?.ipAddress ?? null,
  //         userAgent: meta?.userAgent ?? null,
  //         performedBy: meta?.performedBy ?? PerformedByType.USER,
  //       },
  //     });

  //     return { before, after };
  //   });
  // },

  updateAccessLevel: async ({
    roleId,
    permissionId,
    input,
    meta,
  }: {
    roleId: string;
    permissionId: string;
    input: UpdateAccessLevelInput;
    meta?: ActorMeta;
  }) => {
    /* ------------------------------
     * 1️⃣ VALIDATE CONDITIONAL INPUT
     * ------------------------------ */
    if (input.accessLevel === "CONDITIONAL") {
      // Validate JSON condition group
      try {
        await validateConditionGroupAsync(input.conditions);
      } catch (err: any) {
        throw new BadRequestException(
          `Invalid conditions: ${err?.message ?? "invalid"}`
        );
      }

      // Validate expression if given
      if (input.expression) {
        const res = validateExpression(input.expression, {
          allowedFieldPattern: /^[A-Za-z_][A-Za-z0-9_\.]*$/,
        });

        if (!res.valid) {
          throw new BadRequestException(`Invalid expression`);
        }
      }
    }

    /* ------------------------------
     * 2️⃣ TRANSACTION
     * ------------------------------ */
    const result = await prisma.$transaction(async (tx) => {
      const role = await tx.role.findUnique({ where: { id: roleId } });
      if (!role) throw new NotFoundException("Role not found");

      const permission = await tx.permission.findUnique({
        where: { id: permissionId },
      });
      if (!permission) throw new NotFoundException("Permission not found");

      const before = await tx.rolePermission.findUnique({
        where: { roleId_permissionId: { roleId, permissionId } },
      });

      let after: any = null;

      /* ------------------------------
       * NONE → remove permission link
       * ------------------------------ */
      if (input.accessLevel === "NONE") {
        await tx.rolePermission.deleteMany({
          where: { roleId, permissionId },
        });
        after = null;
      } else if (input.accessLevel === "FULL") {

      /* ------------------------------
       * FULL → grant permission without conditions
       * ------------------------------ */
        after = await tx.rolePermission.upsert({
          where: { roleId_permissionId: { roleId, permissionId } },
          update: {
            accessLevel: "FULL",
            conditions: Prisma.DbNull,
            expression: null,
          },
          create: {
            roleId,
            permissionId,
            accessLevel: "FULL",
            conditions: Prisma.DbNull,
            expression: null,
          },
        });
      } else if (input.accessLevel === "CONDITIONAL") {

      /* ------------------------------
       * CONDITIONAL → ABAC rules
       * ------------------------------ */
        after = await tx.rolePermission.upsert({
          where: { roleId_permissionId: { roleId, permissionId } },
          update: {
            accessLevel: "CONDITIONAL",
            conditions: input.conditions ?? null,
            expression: input.expression ?? null,
          },
          create: {
            roleId,
            permissionId,
            accessLevel: "CONDITIONAL",
            conditions: input.conditions ?? null,
            expression: input.expression ?? null,
          },
        });
      }

      /* ------------------------------
       * AUDIT LOG
       * ------------------------------ */
      await tx.auditLog.create({
        data: {
          userId: meta?.actorId ?? null,
          entity: AuditEntity.ROLE_PERMISSION,
          action:
            input.accessLevel === "NONE"
              ? AuditAction.DELETE
              : input.accessLevel === "FULL"
              ? AuditAction.GRANT
              : AuditAction.UPDATE,
          comment: `Updated role-permission accessLevel to ${input.accessLevel}`,
          before: before ?? Prisma.DbNull,
          after: after ?? Prisma.DbNull,
          ipAddress: meta?.ipAddress ?? null,
          userAgent: meta?.userAgent ?? null,
          performedBy: meta?.performedBy ?? PerformedByType.USER,
        },
      });

      return { before, after };
    });

    return result;
  },

  /** Grant all permissions of a module */
  grantAllModulePermissions: async ({
    roleId,
    moduleId,
  }: {
    roleId: string;
    moduleId: string;
  }) => {
    // Ensure role exists
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new NotFoundException("Role not found");

    // Get all permission IDs under this module
    const permissionIds = await rolePermissionRepository.getModulePermissionIds(
      moduleId
    );

    if (permissionIds.length === 0)
      throw new NotFoundException("No permissions found for this module");

    return prisma.$transaction(async (tx) => {
      const assignments = await Promise.all(
        permissionIds.map((pid) =>
          tx.rolePermission.upsert({
            where: { roleId_permissionId: { roleId, permissionId: pid } },
            update: { accessLevel: "FULL" },
            create: { roleId, permissionId: pid, accessLevel: "FULL" },
          })
        )
      );

      return {
        count: assignments.length,
      };
    });
  },

  /** Revoke all permissions of a module */
  revokeAllModulePermissions: async ({
    roleId,
    moduleId,
  }: {
    roleId: string;
    moduleId: string;
  }) => {
    // Ensure role exists
    const role = await prisma.role.findUnique({ where: { id: roleId } });
    if (!role) throw new NotFoundException("Role not found");

    // Get permissions under module
    const permissionIds = await rolePermissionRepository.getModulePermissionIds(
      moduleId
    );

    if (permissionIds.length === 0)
      throw new NotFoundException("No permissions found for this module");

    const deleted = await prisma.rolePermission.deleteMany({
      where: {
        roleId,
        permissionId: { in: permissionIds },
      },
    });

    return {
      revoked: deleted.count,
    };
  },
};

export default rolePermissionService;
