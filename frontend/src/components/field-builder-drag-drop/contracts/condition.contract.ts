/* ======================================================
   CONDITION CONTRACT (AUTHORITATIVE)
====================================================== */
export type FieldKey = string & { __brand: "FieldKey" };


export type ConditionOperator =
  | "EXISTS"
  | "EQUALS"
  | "NOT_EQUALS"
  | "GT"
  | "GTE"
  | "LT"
  | "LTE"
  | "IN"
  | "NOT_IN";

/* ---------------- RULE ---------------- */

export type ConditionLeaf =
  | {
      id: string;
      kind: "RULE";
      field: FieldKey;
      operator: "EXISTS";
    }
  | {
      id: string;
      kind: "RULE";
      field: FieldKey;
      operator: Exclude<ConditionOperator, "EXISTS" | "IN" | "NOT_IN">;
      value: string | number | boolean;
    }
  | {
      id: string;
      kind: "RULE";
      field: FieldKey;
      operator: "IN" | "NOT_IN";
      value: Array<string | number>;
    };

export interface ConditionGroup {
  id: string;
  kind: "GROUP";
  combinator: "AND" | "OR";
  children: ConditionNode[];
}

/* ---------------- UNION ---------------- */

export type ConditionNode = ConditionLeaf | ConditionGroup;
