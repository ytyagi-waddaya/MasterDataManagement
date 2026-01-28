// import { buildBackendLayoutSchema } from "../editor/layout-compiler";
// // import { buildBackendSchema } from "./backend-schema.builder";
// import { buildRuntimeSchema } from "../runtime/runtime-schema.builder";
// import { BackendFormSection } from "../../contracts/backend-layout.contract";
// import { FieldConfig, IMMUTABLE_AFTER_PUBLISH } from "../../contracts/field-config.contract";
// import { FormSection } from "../../contracts/editor.contract";

// /* ======================================================
//    PUBLISHED SCHEMA CONTRACT
// ====================================================== */

// export type PublishedSchema = {
//   version: number;
//   layout: {
//     sections: BackendFormSection[];
//   };
//   fields: FieldConfig[];
//   publishedAt: string;
// };

// /* ======================================================
//    PUBLISH BUILDER
// ====================================================== */

// export function publishSchema(input: {
//   sections: FormSection[];
//   previous?: PublishedSchema;
//   version?: number;
// }): PublishedSchema {
//   const runtime = buildRuntimeSchema(input.sections);
//   // const fields = buildBackendSchema(runtime);
//   const layout = buildBackendLayoutSchema(input.sections);

//   // 🔒 immutability enforcement
//   if (input.previous) {
//     // assertImmutableFields(input.previous.fields, fields);
//   }

//   // return {
//   //   version: input.version ?? (input.previous?.version ?? 0) + 1,
//   //   layout: {
//   //     sections: layout,
//   //   },
//   //   // fields,
//   //   publishedAt: new Date().toISOString(),
//   // };
// }

// /* ======================================================
//    IMMUTABILITY CHECK
// ====================================================== */

// function assertImmutableFields(
//   oldFields: FieldConfig[],
//   newFields: FieldConfig[],
// ) {
//   const oldMap = new Map(oldFields.map((f) => [f.meta.key, f]));
//   const newMap = new Map(newFields.map((f) => [f.meta.key, f]));

//   for (const [key, oldField] of oldMap.entries()) {
//     const next = newMap.get(key);
//     if (!next) continue;

//     for (const path of IMMUTABLE_AFTER_PUBLISH) {
//       if (getByPath(oldField, path) !== getByPath(next, path)) {
//         throw new Error(
//           `Immutable field changed after publish: ${key}.${path}`,
//         );
//       }
//     }
//   }
// }

// /* ======================================================
//    SAFE PATH ACCESS
// ====================================================== */

// function getByPath(obj: any, path: string) {
//   return path.split(".").reduce((acc, key) => acc?.[key], obj);
// }
