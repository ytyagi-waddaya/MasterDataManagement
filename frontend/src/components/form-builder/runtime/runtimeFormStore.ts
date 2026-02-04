

// import { create } from "zustand";
// import { evaluateCalculation } from "./evaluateCalculation";
// import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";

// type FormMode = "PREVIEW" | "CREATE" | "VIEW" | "EDIT";

// type RuntimeState = {
//   mode: FormMode;
//   values: Record<string, any>;
//   fields: CanonicalFieldConfig[];

//   setMode: (mode: FormMode) => void;
//   setFieldConfigs: (fields: CanonicalFieldConfig[]) => void;

//   setValue: (key: string, value: any) => void;
//   hydrate: (values: Record<string, any>) => void;
//   reset: () => void;
// };

// export const useRuntimeFormStore = create<RuntimeState>((set, get) => ({
//   mode: "CREATE",
//   values: {},
//   fields: [],

//   setMode: (mode) => set({ mode }),

//   setFieldConfigs: (fields) =>
//     set({
//       // ✅ normalize old schemas
//       fields: fields.map((f) => {
//         if (f.calculation && "operator" in (f.calculation as any)) {
//           return {
//             ...f,
//             calculation: {
//               expression: "",
//               dependencies: [],
//             },
//           };
//         }
//         return f;
//       }),
//     }),

//   setValue: (key, value) => {
//     const { fields } = get();

//     const next = { ...get().values, [key]: value };

//     let changed = true;
//     let safety = 0;

//     // ✅ reactive recalculation loop (safe)
//     while (changed && safety < 50) {
//       changed = false;
//       safety++;

//       for (const f of fields) {
//         if (!f.calculation) continue;

//         const deps = f.calculation.dependencies.filter(
//           (d) => d in next
//         );

//         const depends = deps.some(
//           (dep) =>
//             dep === key ||
//             key.startsWith(`${dep}.`) ||
//             dep.startsWith(`${key}.`)
//         );

//         if (!depends) continue;

//         const result = evaluateCalculation(f.calculation, next);

//         if (next[f.meta.key] !== result) {
//           next[f.meta.key] = result;
//           changed = true;
//         }
//       }
//     }

//     set({ values: next });
//   },

//   hydrate: (values) => set({ values }),

//   reset: () => set({ values: {} }),
// }));

////////////////////////////////
////////////////////////////////
////////////////////////////////
/////////////////////////////////


import { create } from "zustand";
import { evaluateCalculation } from "./evaluateCalculation";
import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";

type FormMode = "PREVIEW" | "CREATE" | "VIEW" | "EDIT";

type RuntimeState = {
  mode: FormMode;
  values: Record<string, any>;
  fields: CanonicalFieldConfig[];

  setMode: (mode: FormMode) => void;
  setFieldConfigs: (fields: CanonicalFieldConfig[]) => void;

  setValue: (key: string, value: any) => void;
  hydrate: (values: Record<string, any>) => void;
  reset: () => void;
};

export const useRuntimeFormStore = create<RuntimeState>((set, get) => ({
  mode: "CREATE",
  values: {},
  fields: [],

  setMode: (mode) => set({ mode }),

  // ✅ FIX: normalize calculation + denormalize visibility for PREVIEW
  setFieldConfigs: (fields) =>
    set({
      fields: fields.map((f) => {
        let next = f;

        // ---- backward compatibility (old calculation schema)
        if (f.calculation && "operator" in (f.calculation as any)) {
          next = {
            ...next,
            calculation: {
              expression: "",
              dependencies: [],
            },
          };
        }

        // ---- 🔑 visibility denormalization for runtime
        if (next.visibility) {
          next = {
            ...next,
            visibility: denormalizeVisibilityForPreview(next.visibility),
          };
        }

        return next;
      }),
    }),

  setValue: (key, value) => {
    const { fields } = get();
    const next = { ...get().values, [key]: value };

    let changed = true;
    let safety = 0;

    while (changed && safety < 50) {
      changed = false;
      safety++;

      for (const f of fields) {
        if (!f.calculation) continue;

        const depends = f.calculation.dependencies.some(
          (dep) =>
            dep === key ||
            key.startsWith(`${dep}.`) ||
            dep.startsWith(`${key}.`)
        );

        if (!depends) continue;

        const result = evaluateCalculation(f.calculation, next);

        if (next[f.meta.key] !== result) {
          next[f.meta.key] = result;
          changed = true;
        }
      }
    }

    set({ values: next });
  },

  hydrate: (values) => set({ values }),

  reset: () => set({ values: {} }),
}));

// runtime/denormalizeVisibility.ts
export function denormalizeVisibilityForPreview(visibility: any) {
  if (!visibility || visibility.type !== "group") return undefined;

  return visibility.conditions.map((c: any) => ({
    fieldKey: c.field,
    operator: denormalizeOperator(c.operator),
    value: c.value,
  }));
}

function denormalizeOperator(op: string) {
  switch (op) {
    case "EQUAL":
      return "EQUALS";
    case "NOT_EQUAL":
      return "NOT_EQUALS";
    case "GREATER_THAN":
      return ">";
    case "LESS_THAN":
      return "<";
    case "GREATER_THAN_EQUAL":
      return ">=";
    case "LESS_THAN_EQUAL":
      return "<=";
    case "IN":
      return "IN";
    case "NOT_IN":
      return "NOT_IN";
    default:
      return op;
  }
}
