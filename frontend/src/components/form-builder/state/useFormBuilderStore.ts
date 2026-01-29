import { create } from "zustand";
import {
  CanonicalFieldConfig,
  PersistedFormSchema,
} from "@/lib/masterObject/schema/masterObject.schema";
import {
  DividerLayoutNode,
  GenericLayoutNode,
  HeadingLayoutNode,
  Node,
  RepeaterLayoutNode,
  Slot,
  SpacerLayoutNode,
} from "../node.types";
import { evaluateCalculation } from "../runtime/evaluateCalculation";

/* ======================================================
   TYPES
====================================================== */

export type NodePath = {
  sectionId: string;
  nodeId: string;
  slotId?: string;
};

type BuilderMode = "EDIT" | "PREVIEW" | "SPLIT";

type NodeTarget =
  | { kind: "SECTION"; sectionId: string }
  | { kind: "NODE_CHILDREN"; sectionId: string; nodeId: string }
  | { kind: "SLOT"; sectionId: string; nodeId: string; slotId: string };

/* ======================================================
   HELPERS
====================================================== */

function cloneNode(node: Node): Node {
  if (node.kind === "FIELD") {
    return { ...node, id: crypto.randomUUID() };
  }

  switch (node.type) {
    case "repeater":
      return {
        ...node,
        id: crypto.randomUUID(),
        children: node.children.map(cloneNode),
      };

    case "columns":
    case "tabs":
      return {
        ...node,
        id: crypto.randomUUID(),
        slots: node.slots.map((s) => ({
          ...s,
          id: crypto.randomUUID(),
          children: s.children.map(cloneNode),
        })),
      };

    case "heading":
    case "divider":
    case "spacer":
      return {
        ...node,
        id: crypto.randomUUID(),
      };

    default: {
      const _exhaustive: never = node;
      return _exhaustive;
    }
  }
}

function updateSchemaWithHistory(
  s: BuilderState,
  updater: (schema: PersistedFormSchema) => PersistedFormSchema,
) {
  const next = updater(structuredClone(s.schema));

  return {
    schema: next,
    history: [...s.history.slice(-49), structuredClone(s.schema)],
    future: [],
  };
}

export type DraftPayload = {
  draftSchemaId: string; // ✅ REQUIRED
  schema: PersistedFormSchema;
  fieldConfig: CanonicalFieldConfig[];
};

/* ======================================================
   STATE TYPE
====================================================== */

type BuilderState = {
  schemaId?: string;
  schema: PersistedFormSchema;
  fieldConfigs: CanonicalFieldConfig[];
  published: boolean;

  selectedFieldKey?: string;
  selectedSectionId?: string;
  selectedNodePath?: NodePath;

  history: PersistedFormSchema[];
  future: PersistedFormSchema[];

  /* FIELD */
  addField: (field: CanonicalFieldConfig) => void;
  updateField: (key: string, patch: Partial<CanonicalFieldConfig>) => void;
  removeField: (key: string) => void;

  /* SECTION */
  addSection: () => void;
  removeSection: (id: string) => void;
  updateSection: (
    id: string,
    patch: Partial<{ title: string; collapsed: boolean }>,
  ) => void;
  duplicateSection: (id: string) => void;
  /* SECTION NAVIGATION & SELECTION */
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  selectSection: (id?: string) => void;

  /* NODE */
  /* SELECTION */
  selectNode: (path?: NodePath) => void;
  selectField: (key?: string) => void;

  addNodeToTarget: (node: Node, target: NodeTarget) => void;
  duplicateNode: (path: NodePath) => void;
  moveNode: (
    from: NodePath,
    to: { sectionId: string; slotId?: string; nodeId?: string },
  ) => void;
  /* NODE */
  deleteNode: (path: NodePath) => void;

  /* UNDO */
  undo: () => void;
  redo: () => void;

  /* REPEATER */
  addRepeaterRow: (repeaterId: string) => void;
  removeRepeaterRow: (repeaterId: string, rowId: string) => void;
  updateLayoutNode: (
    path: NodePath,
    updater: (node: GenericLayoutNode | RepeaterLayoutNode) => void,
  ) => void;
  updatePresentationNode: (
    path: NodePath,
    updater: (
      node: HeadingLayoutNode | SpacerLayoutNode | DividerLayoutNode,
    ) => void,
  ) => void;

  formValues: Record<string, any>;
  setFieldValue: (key: string, value: any) => void;
  previewValues: Record<string, any>;
  setPreviewValue: (key: string, value: any) => void;
  resetPreview: () => void;

  mode: BuilderMode;
  setMode: (mode: BuilderMode) => void;
  submitErrors: Record<string, string>;
  setSubmitErrors: (errors: Record<string, string>) => void;
  clearSubmitErrors: () => void;
  hydrateFromBackend: (
    schemaId: string,
    schema: PersistedFormSchema,
    fieldConfigs: CanonicalFieldConfig[],
    published: boolean,
  ) => void;

  resetBuilder: () => void;

  lastSavedDraftPayload: DraftPayload | null;

  setLastSavedDraft: (payload: DraftPayload) => void;
};

/* ======================================================
   STORE
====================================================== */

export const useFormBuilderStore = create<BuilderState>((set) => ({
  schema: { version: 1, layout: { sections: [] } },
  fieldConfigs: [],
  published: false,
  lastSavedDraftPayload: null,
  history: [],
  future: [],
  formValues: {},
  previewValues: {},
  mode: "EDIT",

  setMode: (mode) => set({ mode }),

  /* ---------------- FIELD ---------------- */

  addField: (field) =>
    set((s) => ({ fieldConfigs: [...s.fieldConfigs, field] })),

  // updateField: (key, patch) =>
  //   set((s) => ({
  //     fieldConfigs: s.fieldConfigs.map((f) =>
  //       f.meta.key === key
  //         ? {
  //             ...f,
  //             ...patch,
  //             ui: patch.ui ? { ...f.ui, ...patch.ui } : f.ui,
  //             validation: patch.validation
  //               ? { ...f.validation, ...patch.validation }
  //               : f.validation,
  //           }
  //         : f,
  //     ),
  //   })),

  // removeField: (key) =>
  //   set((s) =>
  //     updateSchemaWithHistory(
  //       {
  //         ...s,
  //         fieldConfigs: s.fieldConfigs.filter((f) => f.meta.key !== key),
  //       },
  //       (schema) => {
  //         schema.layout.sections.forEach((sec) => {
  //           sec.nodes = sec.nodes.filter(
  //             (n: any) => !(n.kind === "FIELD" && n.field.key === key),
  //           );
  //         });
  //         return schema;
  //       },
  //     ),
  //   ),

  // updateField: (key, patch) =>
  //   set((s) => ({
  //     fieldConfigs: s.fieldConfigs.map((f) =>
  //       f.meta.key === key
  //         ? {
  //             ...f,
  //             ...patch,
  //             ui: patch.ui ? { ...f.ui, ...patch.ui } : f.ui,
  //             validation: patch.validation
  //               ? { ...f.validation, ...patch.validation }
  //               : f.validation,
  //             calculation: patch.calculation
  //               ? { ...f.calculation, ...patch.calculation }
  //               : f.calculation,
  //           }
  //         : f,
  //     ),
  //   })),
updateField: (key, patch) =>
  set((s) => ({
    fieldConfigs: s.fieldConfigs.map((f) =>
      f.meta.key === key
        ? {
            ...f,
            ...patch,
            meta: patch.meta ? { ...f.meta, ...patch.meta } : f.meta,
            ui: patch.ui ? { ...f.ui, ...patch.ui } : f.ui,
            validation: patch.validation
              ? { ...f.validation, ...patch.validation }
              : f.validation,
            calculation: patch.calculation
              ? { ...f.calculation, ...patch.calculation }
              : f.calculation,
            integration: patch.integration
              ? { ...f.integration, ...patch.integration }
              : f.integration,
          }
        : f,
    ),
  })),


  removeField: (key) =>
    set((s) =>
      updateSchemaWithHistory(
        {
          ...s,
          fieldConfigs: s.fieldConfigs.filter((f) => f.meta.key !== key),
          formValues: Object.fromEntries(
            Object.entries(s.formValues).filter(([k]) => k !== key),
          ),
          previewValues: Object.fromEntries(
            Object.entries(s.previewValues).filter(([k]) => k !== key),
          ),
          submitErrors: Object.fromEntries(
            Object.entries(s.submitErrors).filter(([k]) => k !== key),
          ),
          selectedFieldKey:
            s.selectedFieldKey === key ? undefined : s.selectedFieldKey,
        },
        (schema) => {
          schema.layout.sections.forEach((sec) => {
            sec.nodes = sec.nodes.filter(
              (n: any) => !(n.kind === "FIELD" && n.field.key === key),
            );
          });
          return schema;
        },
      ),
    ),

  /* ---------------- SECTION ---------------- */

  addSection: () =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        schema.layout.sections.push({
          id: crypto.randomUUID(),
          title: "New Section",
          collapsed: false,
          nodes: [],
        });
        return schema;
      }),
    ),

  removeSection: (id) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        schema.layout.sections = schema.layout.sections.filter(
          (sec) => sec.id !== id,
        );
        return schema;
      }),
    ),

  updateSection: (id, patch) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        schema.layout.sections = schema.layout.sections.map((sec) =>
          sec.id === id ? { ...sec, ...patch } : sec,
        );
        return schema;
      }),
    ),

  duplicateSection: (id) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        const sec = schema.layout.sections.find((x) => x.id === id);
        if (!sec) return schema;

        schema.layout.sections.push({
          ...sec,
          id: crypto.randomUUID(),
          title: sec.title + " (Copy)",
          nodes: sec.nodes.map(cloneNode),
        });
        return schema;
      }),
    ),

  moveSectionUp: (id) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        const sections = [...schema.layout.sections];
        const index = sections.findIndex((sec) => sec.id === id);
        if (index <= 0) return schema;

        [sections[index - 1], sections[index]] = [
          sections[index],
          sections[index - 1],
        ];

        return {
          ...schema,
          layout: { sections },
        };
      }),
    ),

  moveSectionDown: (id) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        const sections = [...schema.layout.sections];
        const index = sections.findIndex((sec) => sec.id === id);
        if (index < 0 || index === sections.length - 1) return schema;

        [sections[index], sections[index + 1]] = [
          sections[index + 1],
          sections[index],
        ];

        return {
          ...schema,
          layout: { sections },
        };
      }),
    ),

  selectSection: (id) =>
    set(() => ({
      selectedSectionId: id,
      selectedNodePath: undefined,
      selectedFieldKey: undefined,
    })),

  /* ---------------- NODE ---------------- */
  addNodeToTarget: (node, target) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        const section = schema.layout.sections.find(
          (sec) => sec.id === target.sectionId,
        );
        if (!section) return schema;

        const cloned = cloneNode(node);

        if (target.kind === "SECTION") {
          section.nodes.push(cloned);
        }

        if (target.kind === "NODE_CHILDREN") {
          const parent = section.nodes.find((n) => n.id === target.nodeId);
          parent?.children?.push(cloned);
        }

        if (target.kind === "SLOT") {
          const layout = section.nodes.find((n) => n.id === target.nodeId);
          const slot = layout?.slots?.find((s: Slot) => s.id === target.slotId);
          slot?.children.push(cloned);
        }

        return schema;
      }),
    ),

  duplicateNode: (path) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        const sec = schema.layout.sections.find((x) => x.id === path.sectionId);
        if (!sec) return schema;

        const insert = (list: Node[]) => {
          const i = list.findIndex((n) => n.id === path.nodeId);
          if (i !== -1) {
            list.splice(i + 1, 0, cloneNode(list[i]));
            return true;
          }
          return false;
        };

        if (!path.slotId && insert(sec.nodes)) return schema;

        for (const n of sec.nodes) {
          for (const slot of n.slots ?? []) {
            if (slot.id === path.slotId && insert(slot.children)) {
              return schema;
            }
          }
        }

        return schema;
      }),
    ),

  moveNode: (from, to) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        let moving: Node | null = null;

        // REMOVE
        schema.layout.sections.forEach((sec) => {
          if (sec.id !== from.sectionId) return;

          const remove = (list: Node[]) =>
            list.filter((n) => {
              if (n.id === from.nodeId) {
                moving = n;
                return false;
              }
              return true;
            });

          if (!from.slotId) {
            sec.nodes = remove(sec.nodes);
          }

          sec.nodes.forEach((n) => {
            n.slots?.forEach((slot: Slot) => {
              if (slot.id === from.slotId) {
                slot.children = remove(slot.children);
              }
            });
          });
        });

        if (!moving) return schema;

        // INSERT
        const targetSec = schema.layout.sections.find(
          (x) => x.id === to.sectionId,
        );
        if (!targetSec) return schema;

        if (to.nodeId) {
          const parent = targetSec.nodes.find((n) => n.id === to.nodeId);
          parent?.children?.push(moving);
          return schema;
        }

        if (to.slotId) {
          targetSec.nodes.forEach((n) => {
            n.slots?.forEach((slot: Slot) => {
              if (slot.id === to.slotId) {
                slot.children.push(moving!);
              }
            });
          });
          return schema;
        }

        targetSec.nodes.push(moving);
        return schema;
      }),
    ),

  selectNode: (path) =>
    set(() => ({
      selectedNodePath: path,
      selectedSectionId: undefined,
      selectedFieldKey: undefined,
    })),

  selectField: (key) =>
    set(() => ({
      selectedFieldKey: key,
      selectedNodePath: undefined,
      selectedSectionId: undefined,
    })),

  /* ---------------- UNDO ---------------- */

  undo: () =>
    set((s) =>
      !s.history.length
        ? s
        : {
            schema: s.history.at(-1)!,
            history: s.history.slice(0, -1),
            future: [structuredClone(s.schema), ...s.future],
          },
    ),

  redo: () =>
    set((s) =>
      !s.future.length
        ? s
        : {
            schema: s.future[0],
            history: [...s.history, structuredClone(s.schema)],
            future: s.future.slice(1),
          },
    ),
  addRepeaterRow: (repeaterId) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        schema.layout.sections.forEach((sec) => {
          sec.nodes.forEach((n) => {
            if (
              n.kind === "LAYOUT" &&
              n.type === "repeater" &&
              n.id === repeaterId
            ) {
              n._rows = [...(n._rows ?? []), crypto.randomUUID()];
            }
          });
        });

        return schema;
      }),
    ),

  removeRepeaterRow: (repeaterId, rowId) =>
    set((s: BuilderState) =>
      updateSchemaWithHistory(s, (schema) => {
        schema.layout.sections.forEach((sec) => {
          sec.nodes.forEach((n) => {
            if (n.kind === "LAYOUT" && n.type === "repeater") {
              n._rows = (n._rows ?? []).filter((r: string) => r !== rowId);
            }
          });
        });

        return schema;
      }),
    ),

  updateLayoutNode: (path, updater) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        const section = schema.layout.sections.find(
          (sec) => sec.id === path.sectionId,
        );
        if (!section) return schema;

        function visit(nodes: Node[]): boolean {
          for (const n of nodes) {
            if (n.id === path.nodeId && n.kind === "LAYOUT") {
              if (
                n.type === "repeater" ||
                n.type === "columns" ||
                n.type === "tabs"
              ) {
                updater(n);
              }
              return true;
            }

            if (n.kind === "LAYOUT") {
              if (n.type === "repeater") {
                if (visit(n.children)) return true;
              }

              if (n.type === "columns" || n.type === "tabs") {
                for (const slot of n.slots) {
                  if (visit(slot.children)) return true;
                }
              }
            }
          }
          return false;
        }

        visit(section.nodes);
        return schema;
      }),
    ),
  updatePresentationNode: (path, updater) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        const section = schema.layout.sections.find(
          (sec) => sec.id === path.sectionId,
        );
        if (!section) return schema;

        for (const n of section.nodes) {
          if (n.kind === "LAYOUT" && n.id === path.nodeId) {
            if (
              n.type === "heading" ||
              n.type === "spacer" ||
              n.type === "divider"
            ) {
              updater(n);
            }
            break;
          }
        }

        return schema;
      }),
    ),

  deleteNode: (path: NodePath) =>
    set((s) =>
      updateSchemaWithHistory(s, (schema) => {
        const section = schema.layout.sections.find(
          (sec) => sec.id === path.sectionId,
        );
        if (!section) return schema;

        function remove(nodes: Node[]): Node[] {
          return nodes.filter((n) => {
            if (n.id === path.nodeId) return false;

            if (n.kind === "LAYOUT") {
              if (n.type === "repeater") {
                n.children = remove(n.children);
              }

              if ("slots" in n) {
                n.slots.forEach(
                  (slot) => (slot.children = remove(slot.children)),
                );
              }
            }

            return true;
          });
        }

        section.nodes = remove(section.nodes);
        return schema;
      }),
    ),

  setFieldValue: (key: string, value: any) =>
    set((s) => {
      const nextValues = {
        ...s.formValues,
        [key]: value,
      };

      let changed = true;

      while (changed) {
        changed = false;

        s.fieldConfigs.forEach((f) => {
          if (!f.calculation) return;

          const depends = f.calculation.operands.some(
            (dep) =>
              dep === key ||
              key.startsWith(`${dep}.`) ||
              dep.startsWith(`${key}.`),
          );

          if (!depends) return;

          const next = evaluateCalculation(f.calculation, nextValues);

          if (nextValues[f.meta.key] !== next) {
            nextValues[f.meta.key] = next;
            changed = true;
          }
        });
      }

      return { formValues: nextValues };
    }),

  setPreviewValue: (key: string, value: any) =>
    set((s) => ({
      previewValues: {
        ...s.previewValues,
        [key]: value,
      },
    })),

  resetPreview: () =>
    set(() => ({
      previewValues: {},
    })),
  submitErrors: {},

  setSubmitErrors: (errors) => set({ submitErrors: errors }),

  clearSubmitErrors: () => set({ submitErrors: {} }),
  hydrateFromBackend: (schemaId, schema, fieldConfigs, published) =>
    set(() => ({
      schemaId,
      schema,
      fieldConfigs,
      published,
      history: [],
      future: [],
      formValues: {},
      previewValues: {},
      selectedFieldKey: undefined,
      selectedNodePath: undefined,
      selectedSectionId: undefined,
    })),

  resetBuilder: () =>
    set(() => ({
      schema: { version: 1, layout: { sections: [] } },
      fieldConfigs: [],
      published: false,
      history: [],
      future: [],
      formValues: {},
      previewValues: {},
    })),
  setLastSavedDraft: (payload: DraftPayload) =>
    set({ lastSavedDraftPayload: payload }),
}));
