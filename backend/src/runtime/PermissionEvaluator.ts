import { ConditionEvaluator } from "./ConditionEvaluator.js";
import { RuntimeField } from "./domain.js";
import { RuntimeContext } from "./types.js";

export class PermissionEvaluator {
  static canRead(
    field: RuntimeField,
    ctx: RuntimeContext,
    values: Record<string, any>
  ): boolean {
    // ✅ System fields are always readable
    if (field.isSystem) return true;

    // ✅ No permissions defined → allow
    if (!field.permissions || field.permissions.length === 0) {
      return true;
    }

    return field.permissions.some((p) => {
      if (!p.canRead) return false;

      if (p.userId && p.userId !== ctx.user.id) return false;
      if (p.roleId && !ctx.user.roles.includes(p.roleId)) return false;

      if (
        p.condition &&
        !ConditionEvaluator.evaluate(p.condition, ctx, values)
      ) {
        return false;
      }

      return true;
    });
  }

  static canWrite(
    field: RuntimeField,
    ctx: RuntimeContext,
    values: Record<string, any>
  ): boolean {
    // ❌ View mode → no writes
    if (ctx.mode === "VIEW") return false;

    // ❌ System / locked fields → no writes
    if (field.isSystem || field.isLocked) return false;

    // ✅ No permissions defined → allow
    if (!field.permissions || field.permissions.length === 0) {
      return true;
    }

    return field.permissions.some((p) => {
      if (!p.canWrite) return false;

      if (p.userId && p.userId !== ctx.user.id) return false;
      if (p.roleId && !ctx.user.roles.includes(p.roleId)) return false;

      if (
        p.condition &&
        !ConditionEvaluator.evaluate(p.condition, ctx, values)
      ) {
        return false;
      }

      return true;
    });
  }
}
