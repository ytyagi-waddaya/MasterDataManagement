"use client";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";

import { FieldPalette } from "./FieldPalette";
import { FormRuntimePreview } from "./runtime/FormRuntimePreview";
import { FormCanvas } from "./form-canvas/FormCanvas";
import { formDnDRouter } from "./dnd/formDnDRouter";
import { useUndoRedo } from "./history/useUndoRedo";
import { InspectorPanel } from "./form-inspector/InspectorPanel";
import {
  findNodeById,
  updateNode,
  deleteNode,
  duplicateNode,
} from "./editor/editor.utils";
import { EditorSelection, FormSection } from "./contracts/editor.contract";
import { EditorToolbar } from "./EditorToolbar";
import { SaveSchemaDialog } from "./SaveSchemaDialog";
import { PaletteItem } from "./contracts/fieldPalette.contract";
import { normalizeEditorSchema } from "./normalizeSchema";
import { FieldDefinition } from "./contracts/field-definition.contract";

/* ======================================================
   HELPERS
====================================================== */

function createDefaultSection(): FormSection[] {
  return [
    {
      id: "section-1",
      title: "Section 1",
      nodes: [],
      collapsed: false,
    },
  ];
}

/* ======================================================
   TYPES
====================================================== */

type ActiveDragItem = {
  type: "PALETTE_FIELD" | "PALETTE_LAYOUT";
  item: PaletteItem;
} | null;

type FormBuilderProps = {
  masterObjectId: string;
  initialSchema?: {
    version: number;
    layout: {
      sections: FormSection[];
    };
    fieldDefinitions: FieldDefinition[]; // ✅ ADD THIS
  } | null;
  isPublished?: boolean;
};

/* ======================================================
   FORM BUILDER
====================================================== */

export function FormBuilder({
  masterObjectId,
  initialSchema,
  isPublished = false,
}: FormBuilderProps) {
  /* ================= DEBUG: INIT ================= */
  console.debug("[FB:init] initialSchema", initialSchema);

  const {
    state: sections,
    setState: setSections,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<FormSection[]>(createDefaultSection());

  const [mode, setMode] = useState<"EDIT" | "PREVIEW">("EDIT");
  const [activeDragItem, setActiveDragItem] = useState<ActiveDragItem>(null);
  const [showSave, setShowSave] = useState(false);
  const [selection, setSelection] = useState<EditorSelection>(null);

  /* ======================================================
     HYDRATE FROM BACKEND (AUTHORITATIVE)
  ====================================================== */
  useEffect(() => {
    console.log("[FB] hydrate raw initialSchema:", initialSchema);

    const sections = initialSchema?.layout?.sections ?? null;
    const fieldDefinitions = (initialSchema as any)?.fieldDefinitions ?? [];
    

    if (Array.isArray(sections) && sections.length > 0) {
      const normalized = normalizeEditorSchema(sections, fieldDefinitions);
      console.log("[FB] normalized sections:", normalized);
      reset(normalized);
    } else {
      console.log("[FB] no schema found → default section");
      reset(createDefaultSection());
    }
  }, [initialSchema?.version]);

  /* ================= DEBUG: STATE ================= */

  useEffect(() => {
    console.debug("[FB:state] sections updated", sections);
  }, [sections]);

  /* ======================================================
     DND SETUP
  ====================================================== */

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  /* ======================================================
     KEYBOARD SHORTCUTS
  ====================================================== */

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      const target = e.target as HTMLElement;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target.isContentEditable
      ) {
        return;
      }

      if (!e.ctrlKey && !e.metaKey) return;

      if (e.key === "z") undo();
      if (e.key === "y" || (e.shiftKey && e.key === "Z")) redo();
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo]);

  const selectedNode =
    selection?.type === "NODE"
      ? findNodeById(sections, selection.nodeId)
      : null;

  const selectedSection =
    selection?.type === "SECTION"
      ? sections.find((s) => s.id === selection.sectionId) ?? null
      : null;

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="flex flex-col h-screen">
      <EditorToolbar
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        mode={mode}
        setMode={setMode}
        onSave={() => setShowSave(true)}
        hideSave={isPublished}
      />

      {mode === "EDIT" ? (
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={(e) =>
            setActiveDragItem(e.active.data.current as ActiveDragItem)
          }
          onDragEnd={(e) => {
            setActiveDragItem(null);
            if (!isPublished) {
              formDnDRouter(e, setSections, (id) =>
                setSelection({ type: "NODE", nodeId: id })
              );
            }
          }}
        >
          <div className="flex flex-1 overflow-hidden">
            {/* Left: Field Palette */}
            {!isPublished && <FieldPalette />}

            {/* Middle: Canvas */}
            <div className="flex-1 overflow-hidden hover:overflow-auto scrollbar-hide">
              <FormCanvas
                sections={sections}
                selection={selection}
                setSelection={setSelection}
                setSections={setSections}
                readOnly={isPublished}
              />
            </div>

            {/* Right: Inspector Panel */}
            {!isPublished && selection && (
              <div className="overflow-hidden hover:overflow-auto scrollbar-hide">
                <InspectorPanel
                  node={selectedNode}
                  section={selectedSection}
                  sections={sections}
                  onNodeChange={(node) =>
                    setSections((prev) => updateNode(prev, node))
                  }
                  onSectionChange={(section) =>
                    setSections((prev) =>
                      prev.map((s) => (s.id === section.id ? section : s))
                    )
                  }
                  onDelete={() => {
                    if (selection?.type === "NODE") {
                      setSections((prev) => deleteNode(prev, selection.nodeId));
                      setSelection(null);
                    }
                  }}
                  onDuplicate={() => {
                    if (selection?.type === "NODE") {
                      setSections((prev) =>
                        duplicateNode(prev, selection.nodeId)
                      );
                    }
                  }}
                />
              </div>
            )}

            <DragOverlay>
              {activeDragItem?.type === "PALETTE_FIELD" && (
                <div className="p-3 border bg-white shadow rounded">
                  {activeDragItem.item.label}
                </div>
              )}
            </DragOverlay>
          </div>
        </DndContext>
      ) : (
        <div className="flex-1 overflow-hidden hover:overflow-auto scrollbar-hide">
          <FormRuntimePreview
            sections={sections}
            fieldDefinitions={initialSchema?.fieldDefinitions ?? []}
          />
        </div>
      )}

      {/* ================= SAVE DIALOG ================= */}
      {!isPublished && (
        <SaveSchemaDialog
          open={showSave}
          onClose={() => setShowSave(false)}
          masterObjectId={masterObjectId}
          schema={{
            version: initialSchema?.version ?? 1,
            layout: { sections },
            fieldDefinitions: initialSchema?.fieldDefinitions ?? [],
          }}
        />
      )}
    </div>
  );
}
