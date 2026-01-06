import { ConditionNode } from "./condition.contract";
import { Expression } from "./expression.contract";

/* ======================================================
   VISIBILITY RULE (DISCRIMINATED UNION)
====================================================== */

export type VisibilityRule =
  | {
      type: "CONDITION";
      condition: ConditionNode;
    }
  | {
      type: "EXPRESSION";
      expression: Expression;
    };
