// src/utils/jsonLogic.ts
import jsonLogic from "json-logic-js";
/**
 * Evaluate a json-logic condition safely.
 * Returns boolean (false on parse/eval errors).
 */
export function evaluateCondition(condition, context) {
    if (!condition)
        return true;
    try {
        return Boolean(jsonLogic.apply(condition, context ?? {}));
    }
    catch (e) {
        // In production: log the error properly
        console.error("json-logic error:", e);
        return false;
    }
}
//# sourceMappingURL=jsonLogic.js.map