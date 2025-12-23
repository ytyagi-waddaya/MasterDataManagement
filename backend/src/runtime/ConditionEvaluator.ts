import { Condition } from "./domain.js";
import { RuntimeContext } from "./types.js";

export class ConditionEvaluator {
  static evaluate(
    condition: Condition,
    ctx: RuntimeContext,
    values: Record<string, any>
  ): boolean {
    // AND
    if ("all" in condition) {
      return condition.all.every(c =>
        this.evaluate(c, ctx, values)
      );
    }

    // OR
    if ("any" in condition) {
      return condition.any.some(c =>
        this.evaluate(c, ctx, values)
      );
    }

    // NOT
    if ("not" in condition) {
      return !this.evaluate(condition.not, ctx, values);
    }

    // LEAF
    return this.evaluateLeaf(condition, ctx, values);
  }

  private static evaluateLeaf(
    cond: {
      field: string;
      operator: string;
      value: any;
    },
    ctx: RuntimeContext,
    values: Record<string, any>
  ): boolean {
    const left =
      cond.field === "currentStage"
        ? ctx.workflowStage?.code
        : values[cond.field];

    switch (cond.operator) {
      case "EQUALS":
        return left === cond.value;
      case "NOT_EQUALS":
        return left !== cond.value;
      case "IN":
        return Array.isArray(cond.value) && cond.value.includes(left);
      case "NOT_IN":
        return Array.isArray(cond.value) && !cond.value.includes(left);
      case "GREATER_THAN":
        return typeof left === "number" && left > cond.value;
      case "LESS_THAN":
        return typeof left === "number" && left < cond.value;
      default:
        return true;
    }
  }
}
