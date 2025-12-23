import { RuntimeField } from "./domain.js";
import { RuntimeContext } from "./types.js";
export declare class PermissionEvaluator {
    static canRead(field: RuntimeField, ctx: RuntimeContext, values: Record<string, any>): boolean;
    static canWrite(field: RuntimeField, ctx: RuntimeContext, values: Record<string, any>): boolean;
}
//# sourceMappingURL=PermissionEvaluator.d.ts.map