
import { useFormBuilderStore } from "../state/useFormBuilderStore";

/* ======================================================
   TYPES
====================================================== */

type FieldNodeType = {
  kind: "FIELD";
  id: string;
  field: { key: string };
};

type Props = {
  node: FieldNodeType;
  sectionId: string;
  slotId?: string;
};

/* ======================================================
   COMPONENT
====================================================== */

export function FieldNode({ node, sectionId, slotId }: Props) {
  const { fieldConfigs, schema, moveNode, selectField, selectedFieldKey } =
    useFormBuilderStore();

  const field = fieldConfigs.find((f) => f.meta.key === node.field.key);

  if (!field) {
    return (
      <div className="border p-2 text-red-500">
        Missing field: {node.field.key}
      </div>
    );
  }

  const fieldKeySafe = field.meta.key;

  const isSelected = selectedFieldKey === fieldKeySafe;

  function handleSelect(e: React.MouseEvent) {
    e.stopPropagation();
    selectField(fieldKeySafe);
  }

  function handleMove(toSectionId: string) {
    moveNode(
      {
        sectionId,
        nodeId: node.id,
        slotId,
      },
      { sectionId: toSectionId },
    );
  }

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div
      className={`border p-3 rounded space-y-2 cursor-pointer ${
        isSelected ? "ring-2 ring-blue-400" : "hover:bg-gray-50"
      }`}
      onClick={handleSelect}
    >
      <div className="text-sm font-medium">{field.meta.label}</div>

      {/* MOVE CONTROL */}
      <select
        className="text-xs border p-1"
        onChange={(e) => handleMove(e.target.value)}
        defaultValue=""
        onClick={(e) => e.stopPropagation()}
      >
        <option value="" disabled>
          Move to section…
        </option>

        {schema.layout.sections.map((sec) => (
          <option key={sec.id} value={sec.id}>
            {sec.title}
          </option>
        ))}
      </select>
    </div>
  );
}
