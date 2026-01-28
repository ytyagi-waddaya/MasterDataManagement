import {
  ConditionLeaf,
  ConditionGroup,
  ConditionNode,
  FieldKey,
} from "../contracts/condition.contract";
import { EditorFieldType } from "../contracts/fieldPalette.contract";
import { FieldDataType } from "./condition-ui.schema";

/* ======================================================
   ID GENERATOR (SINGLE SOURCE)
====================================================== */

let idCounter = 0;
export function generateId(prefix: "g" | "r") {
  idCounter += 1;
  return `${prefix}_${idCounter}`;
}

/* ======================================================
   RULE FACTORY (AUTHORITATIVE)
====================================================== */

export function createRuleForOperator(
  field: FieldKey,
  operator: ConditionLeaf["operator"]
): ConditionLeaf {
  switch (operator) {
    case "EXISTS":
      return {
        id: generateId("r"),
        kind: "RULE",
        field,
        operator,
      };

    case "IN":
    case "NOT_IN":
      return {
        id: generateId("r"),
        kind: "RULE",
        field,
        operator,
        value: [],
      };

    default:
      return {
        id: generateId("r"),
        kind: "RULE",
        field,
        operator,
        value: "",
      };
  }
}

/* ======================================================
   SAFE DEFAULT RULE
====================================================== */

export function createEmptyRule(field: FieldKey): ConditionLeaf {
  return createRuleForOperator(field, "EXISTS");
}

/* ======================================================
   GROUP FACTORY
====================================================== */

export function createEmptyGroup(field: FieldKey): ConditionGroup {
  return {
    id: generateId("g"),
    kind: "GROUP",
    combinator: "AND",
    children: [createEmptyRule(field)],
  };
}

/* ======================================================
   MUTATIONS
====================================================== */

export function updateChild(
  group: ConditionGroup,
  index: number,
  child: ConditionNode
): ConditionGroup {
  const next = [...group.children];
  next[index] = child;
  return { ...group, children: next };
}

/* ======================================================
   ADD RULE (CRITICAL FIX)
====================================================== */

export function addRule(
  group: ConditionGroup,
  fallbackField: FieldKey
): ConditionGroup {
  const firstRule = group.children.find(
    (c): c is ConditionLeaf => c.kind === "RULE"
  );

  const field = firstRule?.field ?? fallbackField;

  return {
    ...group,
    children: [
      ...group.children,
      createRuleForOperator(field, "EXISTS"), // ✅ ALWAYS VALID
    ],
  };
}

/* ======================================================
   ADD GROUP
====================================================== */

export function addGroup(
  group: ConditionGroup,
  fallbackField: FieldKey
): ConditionGroup {
  return {
    ...group,
    children: [
      ...group.children,
      createEmptyGroup(fallbackField),
    ],
  };
}

/* ======================================================
   REMOVE CHILD
====================================================== */

export function removeChild(
  group: ConditionGroup,
  index: number,
  fallbackField: FieldKey
): ConditionGroup {
  const next = group.children.filter((_, i) => i !== index);

  return {
    ...group,
    children:
      next.length > 0
        ? next
        : [createEmptyRule(fallbackField)],
  };
}

/* ======================================================
   CHANGE OPERATOR (SAFE)
====================================================== */

export function changeOperator(
  rule: ConditionLeaf,
  operator: ConditionLeaf["operator"]
): ConditionLeaf {
  if (rule.operator === operator) return rule;

  return createRuleForOperator(rule.field, operator);
}



export function getSampleValue(type: EditorFieldType) {
  switch (type) {
    case "number":
    case "currency":
    case "percentage":
      return 10;

    case "boolean":
      return true;

    case "date":
    case "datetime":
      return new Date().toISOString();

    case "select":
    case "radio":
      return "option_1";

    default:
      return "sample";
  }
}