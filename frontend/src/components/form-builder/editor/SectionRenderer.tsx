import { useFormBuilderStore } from "../state/useFormBuilderStore";
import { NodeRenderer } from "./NodeRenderer";
import {
  PersistedFormSchema,
} from "@/lib/masterObject/schema/masterObject.schema";

/* ======================================================
   TYPES
====================================================== */

type Section =
  PersistedFormSchema["layout"]["sections"][number];

type Props = {
  section: Section;
};

/* ======================================================
   COMPONENT
====================================================== */

export function SectionRenderer({ section }: Props) {
  const {
    updateSection,
    removeSection,
    moveSectionUp,
    moveSectionDown,
    duplicateSection,
    selectSection,
    selectedSectionId,
    published,
  } = useFormBuilderStore();

  const isSelected = selectedSectionId === section.id;

  /* ======================================================
     HANDLERS
  ====================================================== */

  function handleSelect() {
    selectSection(section.id);
  }

  function toggleCollapse(e: React.MouseEvent) {
    e.stopPropagation();
    updateSection(section.id, {
      collapsed: !section.collapsed,
    });
  }

  function handleTitleChange(
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    updateSection(section.id, { title: e.target.value });
  }

  function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm("Delete this section and all its content?")) return;
    removeSection(section.id);
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div
      className={`border rounded-md transition ${
        isSelected ? "ring-2 ring-blue-400" : ""
      }`}
      onClick={handleSelect}
    >
      {/* ================= HEADER ================= */}
      <div
        className="flex items-center justify-between bg-gray-50 px-3 py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          {/* Collapse */}
          <button
            onClick={toggleCollapse}
            className="text-xs w-6"
          >
            {section.collapsed ? "▶" : "▼"}
          </button>

          {/* Title */}
          <input
            className="font-semibold bg-transparent outline-none"
            value={section.title}
            onChange={handleTitleChange}
          />
        </div>

        {!published && (
          <div className="flex gap-2 text-xs">
            <button onClick={() => moveSectionUp(section.id)}>
              ⬆
            </button>
            <button onClick={() => moveSectionDown(section.id)}>
              ⬇
            </button>
            <button onClick={() => duplicateSection(section.id)}>
              📄
            </button>
            <button
              onClick={handleDelete}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* ================= BODY ================= */}
      {!section.collapsed && (
        <div className="p-4 space-y-4">
          {section.nodes.length === 0 && (
            <div className="text-sm text-gray-400">
              Drop fields or layouts here
            </div>
          )}

          {section.nodes.map((node) => (
            <NodeRenderer
              key={node.id}
              node={node}
              sectionId={section.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
