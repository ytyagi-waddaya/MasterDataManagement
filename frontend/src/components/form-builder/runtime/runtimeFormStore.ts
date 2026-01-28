// import { create } from "zustand";
// import { evaluateCalculation } from "./evaluateCalculation";
// import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";

// type RuntimeState = {
//   values: Record<string, any>;
//   setValue: (key: string, value: any, fields: CanonicalFieldConfig[]) => void;
// };

// export const useRuntimeFormStore = create<RuntimeState>((set, get) => ({
//   values: {},

//   setValue: (key, value, fields) => {
//     const next = { ...get().values, [key]: value };

//     let changed = true;
//     while (changed) {
//       changed = false;

//       for (const f of fields) {
//         if (!f.calculation) continue;

//         const depends = f.calculation.operands.some(
//           (dep) => dep === key || key.startsWith(`${dep}.`),
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
// }));

// import { create } from "zustand";
// import { evaluateCalculation } from "./evaluateCalculation";
// import { CanonicalFieldConfig } from "@/lib/masterObject/schema/masterObject.schema";

// type RuntimeState = {
//   values: Record<string, any>;
//   fields: CanonicalFieldConfig[];

//   setFieldConfigs: (fields: CanonicalFieldConfig[]) => void;
//   setValue: (key: string, value: any) => void;
//   reset: () => void;
// };

// export const useRuntimeFormStore = create<RuntimeState>((set, get) => ({
//   values: {},
//   fields: [],

//   setFieldConfigs: (fields) => set({ fields }),

//   setValue: (key, value) => {
//     const { fields } = get();
//     const next = { ...get().values, [key]: value };

//     let changed = true;
//     while (changed) {
//       changed = false;

//       for (const f of fields) {
//         if (!f.calculation) continue;

//         const depends = f.calculation.operands.some(
//           (dep) => dep === key || key.startsWith(`${dep}.`)
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

//   reset: () => set({ values: {} }),
// }));

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

  setFieldConfigs: (fields) => set({ fields }),

  setValue: (key, value) => {
    const { fields } = get();
    const next = { ...get().values, [key]: value };

    let changed = true;
    while (changed) {
      changed = false;
      for (const f of fields) {
        if (!f.calculation) continue;

        const depends = f.calculation.operands.some(
          (dep) => dep === key || key.startsWith(`${dep}.`)
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
