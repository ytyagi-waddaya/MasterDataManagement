/* ======================================================
   EXPRESSION CONTRACT
====================================================== */

import { FieldKey } from "./condition.contract";

export interface Expression {
  expression: string;
   language?: "js" | "expr"; // future-proof
  dependencies?: FieldKey[]; // optimization + safety
}
