// export function normalizeValidation(field: any) {
//   if (!field.validation?.rules) return field;

import { normalizeRule } from "../normalizeMasterObject";


//   return {
//     ...field,
//     validation: {
//       rules: field.validation.rules.map((r: any) => ({
//         ...r,
//         params:
//           r.params && typeof r.params === "object"
//             ? Object.fromEntries(
//                 Object.entries(r.params).filter(
//                   ([_, v]) =>
//                     ["string", "number", "boolean", "Object"].includes(
//                       typeof v
//                     )
//                 )
//               )
//             : r.params,
//       })),
//     },
//   };
// }




export function normalizeValidation(field: any) {
  if (!field.validation?.rules) return field;

  return {
    ...field,
    validation: {
      rules: field.validation.rules.map(normalizeRule),
    },
  };
}
