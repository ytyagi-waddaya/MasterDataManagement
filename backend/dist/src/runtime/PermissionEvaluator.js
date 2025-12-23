import { ConditionEvaluator } from "./ConditionEvaluator.js";
export class PermissionEvaluator {
    static canRead(field, ctx, values) {
        // ✅ System fields are always readable
        if (field.isSystem)
            return true;
        // ✅ No permissions defined → allow
        if (!field.permissions || field.permissions.length === 0) {
            return true;
        }
        return field.permissions.some((p) => {
            if (!p.canRead)
                return false;
            if (p.userId && p.userId !== ctx.user.id)
                return false;
            if (p.roleId && !ctx.user.roles.includes(p.roleId))
                return false;
            if (p.condition &&
                !ConditionEvaluator.evaluate(p.condition, ctx, values)) {
                return false;
            }
            return true;
        });
    }
    static canWrite(field, ctx, values) {
        // ❌ View mode → no writes
        if (ctx.mode === "VIEW")
            return false;
        // ❌ System / locked fields → no writes
        if (field.isSystem || field.isLocked)
            return false;
        // ✅ No permissions defined → allow
        if (!field.permissions || field.permissions.length === 0) {
            return true;
        }
        return field.permissions.some((p) => {
            if (!p.canWrite)
                return false;
            if (p.userId && p.userId !== ctx.user.id)
                return false;
            if (p.roleId && !ctx.user.roles.includes(p.roleId))
                return false;
            if (p.condition &&
                !ConditionEvaluator.evaluate(p.condition, ctx, values)) {
                return false;
            }
            return true;
        });
    }
}
//# sourceMappingURL=PermissionEvaluator.js.map