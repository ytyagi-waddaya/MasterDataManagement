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

function normalizeVisibility(visibility: any) {
  if (!visibility) return undefined;

  // ❌ array from editor → convert
  if (Array.isArray(visibility)) {
    if (visibility.length === 0) return undefined;

    return {
      type: "group",
      logic: "AND",
      conditions: visibility,
    };
  }

  // already object
  if (typeof visibility === "object") return visibility;

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

export function compileForm({
  schema,
  fieldConfigs,
  publish,
}: {
  schema: any;
  fieldConfigs: any[];
  publish?: boolean;
}) {
  const compiledFields = fieldConfigs.map((field) => {
    /* ===============================
       GUARD 1: options vs dataSource
    =============================== */
    if (field.ui?.options && field.integration?.dataSource) {
      throw new Error(
        `Field "${field.meta?.key}": options and dataSource cannot coexist`,
      );
    }

    /* ===============================
       GUARD 2: CALCULATED fields
    =============================== */
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

      // 🔑 FIX: normalize before sending to backend
      visibility: normalizeVisibility(field.visibility),
      permissions: normalizePermissions(field.permissions),
    });
  });

  return {
    schema,
    fieldConfig: compiledFields,
    ...(publish ? { publish: true } : {}),
  };
}
