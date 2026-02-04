// import { normalizeValidation } from "./normalizeValidation";

// export function compileForm({
//   schema,
//   fieldConfigs,
//   publish,
// }: any) {
//   return {
//     schema,
//     fieldConfig: fieldConfigs.map(normalizeValidation),
//     publish,
//   };
// }

// import { normalizeValidation } from "./normalizeValidation";

// export function compileForm({
//   schema,
//   fieldConfigs,
//   publish,
// }: {
//   schema: any;
//   fieldConfigs: any[];
//   publish?: boolean;
// }) {
//   const compiledFields = fieldConfigs.map((field) => {
//     /* ===============================
//        GUARD 1: options vs dataSource
//     =============================== */
//     if (field.ui?.options && field.integration?.dataSource) {
//       throw new Error(
//         `Field "${field.meta?.key}": options and dataSource cannot coexist`
//       );
//     }

//     /* ===============================
//        GUARD 2: CALCULATED fields
//     =============================== */
//     if (
//       field.meta?.category === "CALCULATED" &&
//       !field.calculation &&
//       !field.behavior?.formula
//     ) {
//       throw new Error(
//         `Calculated field "${field.meta?.key}" must define calculation or formula`
//       );
//     }

//     return normalizeValidation(field);
//   });

//   return {
//     schema,
//     fieldConfig: compiledFields,
//     ...(publish ? { publish: true } : {}),
//   };
// }

import { normalizeValidation } from "./normalizeValidation";

/* ======================================================
   NORMALIZERS
====================================================== */

// function normalizeVisibility(visibility: any) {
//   if (!visibility) return undefined;

//   // ❌ array from editor → convert
//   if (Array.isArray(visibility)) {
//     if (visibility.length === 0) return undefined;

//     return {
//       type: "group",
//       logic: "AND",
//       conditions: visibility,
//     };
//   }

//   // already object
//   if (typeof visibility === "object") return visibility;

//   return undefined;
// }

function normalizeVisibility(
  visibility: any,
  validFieldKeys: string[],
) {
  if (!visibility) return undefined;

  const normalizeCondition = (c: any) => {
    const field = c.field ?? c.fieldKey;
    if (!field || !validFieldKeys.includes(field)) return null;
    if (c.value === undefined) return null;

    return {
      field,
      operator: normalizeVisibilityOperator(c.operator),
      value: c.value,
    };
  };

  // editor array → group
  if (Array.isArray(visibility)) {
    const conditions = visibility.map(normalizeCondition).filter(Boolean);
    if (!conditions.length) return undefined;

    return {
      type: "group",
      logic: "AND",
      conditions,
    };
  }

  // editor group → backend group
  if (visibility?.type === "group") {
    const conditions = (visibility.conditions ?? [])
      .map(normalizeCondition)
      .filter(Boolean);

    if (!conditions.length) return undefined;

    return {
      type: "group",
      logic: visibility.logic ?? "AND",
      conditions,
    };
  }

  return undefined;
}

function normalizePermissions(perms: any) {
  if (!perms) return undefined;

  // ❌ array from editor
  if (Array.isArray(perms)) {
    if (perms.length === 0) return undefined;

    const obj: any = {};
    for (const p of perms) {
      obj[p.mode] = {
        roles: p.roles,
        users: p.users,
        conditions: p.conditions,
      };
    }
    return obj;
  }

  // already object
  if (typeof perms === "object") return perms;

  return undefined;
}

/* ======================================================
   COMPILE FORM
====================================================== */

// export function compileForm({
//   schema,
//   fieldConfigs,
//   publish,
// }: {
//   schema: any;
//   fieldConfigs: any[];
//   publish?: boolean;
// }) {
//   const compiledFields = fieldConfigs.map((field) => {
//     /* ===============================
//        GUARD 1: options vs dataSource
//     =============================== */
//     if (field.ui?.options && field.integration?.dataSource) {
//       throw new Error(
//         `Field "${field.meta?.key}": options and dataSource cannot coexist`,
//       );
//     }

//     /* ===============================
//        GUARD 2: CALCULATED fields
//     =============================== */
//     if (
//       field.meta?.category === "CALCULATED" &&
//       !field.calculation &&
//       !field.behavior?.formula
//     ) {
//       throw new Error(
//         `Calculated field "${field.meta?.key}" must define calculation or formula`,
//       );
//     }

//     return normalizeValidation({
//       ...field,

//       // 🔑 FIX: normalize before sending to backend
//       visibility: normalizeVisibility(field.visibility),
//       permissions: normalizePermissions(field.permissions),
//     });
//   });

//   return {
//     schema,
//     fieldConfig: compiledFields,
//     ...(publish ? { publish: true } : {}),
//   };
// }

export function compileForm({
  schema,
  fieldConfigs,
  publish,
}: {
  schema: any;
  fieldConfigs: any[];
  publish?: boolean;
}) {
  const validFieldKeys = fieldConfigs.map((f) => f.meta.key);

  const compiledFields = fieldConfigs.map((field) => {
    if (field.ui?.options && field.integration?.dataSource) {
      throw new Error(
        `Field "${field.meta?.key}": options and dataSource cannot coexist`,
      );
    }

    if (
      field.meta?.category === "CALCULATED" &&
      !field.calculation &&
      !field.behavior?.formula
    ) {
      throw new Error(
        `Calculated field "${field.meta?.key}" must define calculation or formula`,
      );
    }

    return normalizeValidation({
      ...field,
      visibility: normalizeVisibility(field.visibility, validFieldKeys),
      permissions: normalizePermissions(field.permissions),
    });
  });

  return {
    schema,
    fieldConfig: compiledFields,
    ...(publish ? { publish: true } : {}),
  };
}


// const VISIBILITY_OPERATOR_MAP: Record<string, string> = {
//   ">": "GREATER_THAN",
//   "<": "LESS_THAN",
//   ">=": "GREATER_THAN_EQUAL",
//   "<=": "LESS_THAN_EQUAL",

//   "=": "EQUAL",
//   "==": "EQUAL",
//   "EQUALS": "EQUAL",

//   "!=": "NOT_EQUAL",
//   "≠": "NOT_EQUAL",
//   "NOT_EQUALS": "NOT_EQUAL",

//   "in": "IN",
//   "IN": "IN",

//   "not in": "NOT_IN",
//   "NOT IN": "NOT_IN",
//   "NOT_IN": "NOT_IN",
// };

const VISIBILITY_OPERATOR_MAP: Record<string, string> = {
  // ---------- editor symbols ----------
  ">": "GREATER_THAN",
  "<": "LESS_THAN",
  ">=": "GREATER_THAN_EQUAL",
  "<=": "LESS_THAN_EQUAL",
  "=": "EQUAL",
  "==": "EQUAL",
  "!=": "NOT_EQUAL",
  "≠": "NOT_EQUAL",

  // ---------- editor words ----------
  EQUALS: "EQUAL",
  NOT_EQUALS: "NOT_EQUAL",

  // ---------- canonical (PASS THROUGH) ----------
  EQUAL: "EQUAL",
  NOT_EQUAL: "NOT_EQUAL",
  GREATER_THAN: "GREATER_THAN",
  LESS_THAN: "LESS_THAN",
  GREATER_THAN_EQUAL: "GREATER_THAN_EQUAL",
  LESS_THAN_EQUAL: "LESS_THAN_EQUAL",
  IN: "IN",
  NOT_IN: "NOT_IN",
};


function normalizeVisibilityOperator(op: string) {
  const normalized = VISIBILITY_OPERATOR_MAP[String(op).trim()];
  if (!normalized) {
    throw new Error(`Unsupported visibility operator: ${op}`);
  }
  return normalized;
}
