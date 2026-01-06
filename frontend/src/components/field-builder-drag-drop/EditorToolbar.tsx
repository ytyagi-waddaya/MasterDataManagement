// "use client";

// export function EditorToolbar({
//   undo,
//   redo,
//   canUndo,
//   canRedo,
//   mode,
//   setMode,
//   onSave,
//   hideSave,
// }: {
//   undo: () => void;
//   redo: () => void;
//   canUndo: boolean;
//   canRedo: boolean;
//   mode: "EDIT" | "PREVIEW";
//   setMode: (m: "EDIT" | "PREVIEW") => void;
//   onSave: () => void;
//   hideSave?: boolean;
// }) {
//   return (
//     <div className="flex items-center gap-2 p-2 border-b bg-background">
//       <button onClick={undo} disabled={!canUndo}>
//         ⟲ Undo
//       </button>
//       <button onClick={redo} disabled={!canRedo}>
//         ⟳ Redo
//       </button>

//       <div className="ml-auto flex items-center gap-2">
//         <button
//           onClick={() => setMode("EDIT")}
//           className={mode === "EDIT" ? "font-semibold" : ""}
//         >
//           Builder
//         </button>

//         <button
//           onClick={() => setMode("PREVIEW")}
//           className={mode === "PREVIEW" ? "font-semibold" : ""}
//         >
//           Preview
//         </button>

//         {!hideSave && (
//           <button className="ml-2 px-2 py-1 border rounded" onClick={onSave}>
//             💾 Save
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { Undo2, Redo2, Save, Eye, Edit, ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

export function EditorToolbar({
  undo,
  redo,
  canUndo,
  canRedo,
  mode,
  setMode,
  onSave,
  hideSave,
}: {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  mode: "EDIT" | "PREVIEW";
  setMode: (m: "EDIT" | "PREVIEW") => void;
  onSave: () => void;
  hideSave?: boolean;
}) {
  return (
    <div className="flex items-center gap-1 p-2 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 justify-between">
      {/* Undo/Redo buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={undo}
          disabled={!canUndo}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
          title="Undo"
        >
          <Undo2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>

        <button
          onClick={redo}
          disabled={!canRedo}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors"
          title="Redo"
        >
          <Redo2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-1" />
      </div>
      {/* Mode toggle */}
      <div className="flex items-center rounded bg-gray-100 dark:bg-gray-800 p-0.5">
        <button
          onClick={() => setMode("EDIT")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
            mode === "EDIT"
              ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Edit className="h-3.5 w-3.5" />
          <span>Edit</span>
        </button>

        <button
          onClick={() => setMode("PREVIEW")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-colors ${
            mode === "PREVIEW"
              ? "bg-white dark:bg-gray-900 shadow-sm text-gray-900 dark:text-gray-100"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Preview</span>
        </button>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-2">
        <Button
          className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded text-sm"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft className="h-3 w-3" /> <span>Back</span>
        </Button>

        {!hideSave && (
          <button
            onClick={onSave}
            className="ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            title="Save"
          >
            <Save className="h-3.5 w-3.5" />
            <span>Save</span>
          </button>
        )}
      </div>
    </div>
  );
}
