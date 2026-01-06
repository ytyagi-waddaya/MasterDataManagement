// "use client";

// import { useState, useRef, useMemo, useEffect } from "react";
// import { FieldMeta } from "../condition-builder/ConditionGroupView";
// import clsx from "clsx";

// const OPERATORS = [
//   { label: "AND", value: " && " },
//   { label: "OR", value: " || " },
//   { label: "=", value: " === " },
//   { label: "≠", value: " !== " },
//   { label: ">", value: " > " },
//   { label: "<", value: " < " },
//   { label: "≥", value: " >= " },
//   { label: "≤", value: " <= " },
//   { label: "contains", value: ".includes(" },
// ];

// export function ExpressionEditor({
//   value,
//   onChange,
//   fields,
// }: {
//   value: string;
//   onChange: (v: string) => void;
//   fields: readonly FieldMeta[];
// }) {
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   const [open, setOpen] = useState(false);
//   const [query, setQuery] = useState("");
//   const [activeIndex, setActiveIndex] = useState(0);

//   /* ----------------------------------------
//      Detect values.<query>
//   ---------------------------------------- */
//   useEffect(() => {
//     const match = /values\.([a-zA-Z0-9_]*)$/.exec(value);
//     if (match) {
//       setQuery(match[1]);
//       setOpen(true);
//       setActiveIndex(0);
//     } else {
//       setOpen(false);
//     }
//   }, [value]);

//   /* ----------------------------------------
//      Filter fields
//   ---------------------------------------- */
//   const filtered = useMemo(
//     () =>
//       fields.filter((f) =>
//         f.key.toLowerCase().includes(query.toLowerCase())
//       ),
//     [fields, query]
//   );

//   /* ----------------------------------------
//      Insert text at cursor
//   ---------------------------------------- */
//   function insertText(text: string) {
//     const el = textareaRef.current;
//     if (!el) return;

//     const start = el.selectionStart ?? value.length;
//     const end = el.selectionEnd ?? value.length;

//     const next =
//       value.slice(0, start) + text + value.slice(end);

//     onChange(next);

//     requestAnimationFrame(() => {
//       el.focus();
//       el.setSelectionRange(
//         start + text.length,
//         start + text.length
//       );
//     });
//   }

//   function insertField(key: string) {
//     const el = textareaRef.current;
//     if (!el) return;

//     const cursor = el.selectionStart ?? value.length;

//     const before = value
//       .slice(0, cursor)
//       .replace(/values\.[a-zA-Z0-9_]*$/, "");

//     const after = value.slice(cursor);

//     const next = `${before}values.${key}${after}`;
//     onChange(next);
//     setOpen(false);

//     requestAnimationFrame(() => el.focus());
//   }

//   /* ----------------------------------------
//      Keyboard navigation
//   ---------------------------------------- */
//   function onKeyDown(e: React.KeyboardEvent) {
//     if (!open) return;

//     if (e.key === "ArrowDown") {
//       e.preventDefault();
//       setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
//     }

//     if (e.key === "ArrowUp") {
//       e.preventDefault();
//       setActiveIndex((i) => Math.max(i - 1, 0));
//     }

//     if (e.key === "Enter") {
//       e.preventDefault();
//       const f = filtered[activeIndex];
//       if (f) insertField(f.key);
//     }

//     if (e.key === "Escape") {
//       setOpen(false);
//     }
//   }

//   return (
//     <div className="space-y-2 relative">
//       {/* ================= OPERATOR TOOLBAR ================= */}
//       <div className="flex flex-wrap gap-1">
//         {OPERATORS.map((op) => (
//           <button
//             key={op.label}
//             type="button"
//             onClick={() => insertText(op.value)}
//             className="
//               text-xs px-2 py-1 rounded
//               border bg-muted hover:bg-muted/70
//               font-mono
//             "
//           >
//             {op.label}
//           </button>
//         ))}
//       </div>

//       {/* ================= TEXTAREA ================= */}
//       <textarea
//         ref={textareaRef}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onKeyDown={onKeyDown}
//         placeholder={`Example:
// values.age > 18 && values.country === "IN"`}
//         spellCheck={false}
//         rows={4}
//         className="
//           w-full rounded-md border px-3 py-2
//           font-mono text-sm resize-y
//           bg-background
//           focus:outline-none focus:ring-2 focus:ring-primary
//         "
//       />

//       {/* ================= AUTOCOMPLETE ================= */}
//       {open && (
//         <div
//           className="
//             absolute z-50 w-full
//             rounded-md border bg-background shadow-lg
//             max-h-48 overflow-auto
//           "
//         >
//           {filtered.map((f, i) => (
//             <div
//               key={f.key}
//               onMouseDown={() => insertField(f.key)}
//               className={clsx(
//                 "px-3 py-2 cursor-pointer flex justify-between",
//                 i === activeIndex
//                   ? "bg-primary/10"
//                   : "hover:bg-muted"
//               )}
//             >
//               <span className="font-mono">
//                 values.<strong>{f.key}</strong>
//               </span>
//               <span className="text-xs text-muted-foreground">
//                 {f.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ================= HELP ================= */}
//       <p className="text-xs text-muted-foreground">
//         Use <code className="font-mono">values.&lt;fieldKey&gt;</code> to reference other fields
//       </p>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useMemo, useEffect } from "react";
import { FieldMeta } from "../condition-builder/ConditionGroupView";
import { Plus, X, ChevronUp, ChevronDown } from "lucide-react";

const OPERATORS = [
  { label: "AND", value: " && " },
  { label: "OR", value: " || " },
  { label: "=", value: " === " },
  { label: "≠", value: " !== " },
  { label: ">", value: " > " },
  { label: "<", value: " < " },
  { label: "≥", value: " >= " },
  { label: "≤", value: " <= " },
  { label: "contains", value: ".includes(" },
];

export function ExpressionEditor({
  value,
  onChange,
  fields,
}: {
  value: string;
  onChange: (v: string) => void;
  fields: readonly FieldMeta[];
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  /* ----------------------------------------
     Detect values.<query>
  ---------------------------------------- */
  useEffect(() => {
    const match = /values\.([a-zA-Z0-9_]*)$/.exec(value);
    if (match) {
      setQuery(match[1]);
      setOpen(true);
      setActiveIndex(0);
    } else {
      setOpen(false);
    }
  }, [value]);

  /* ----------------------------------------
     Filter fields
  ---------------------------------------- */
  const filtered = useMemo(
    () =>
      fields.filter((f) =>
        f.key.toLowerCase().includes(query.toLowerCase())
      ),
    [fields, query]
  );

  /* ----------------------------------------
     Insert text at cursor
  ---------------------------------------- */
  function insertText(text: string) {
    const el = textareaRef.current;
    if (!el) return;

    const start = el.selectionStart ?? value?.length;
    const end = el.selectionEnd ?? value?.length;

    const next =
      value.slice(0, start) + text + value.slice(end);

    onChange(next);

    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(
        start + text?.length,
        start + text?.length
      );
    });
  }

  function insertField(key: string) {
    const el = textareaRef.current;
    if (!el) return;

    const cursor = el.selectionStart ?? value?.length;

    const before = value
      .slice(0, cursor)
      .replace(/values\.[a-zA-Z0-9_]*$/, "");

    const after = value.slice(cursor);

    const next = `${before}values.${key}${after}`;
    onChange(next);
    setOpen(false);

    requestAnimationFrame(() => el.focus());
  }

  /* ----------------------------------------
     Keyboard navigation
  ---------------------------------------- */
  function onKeyDown(e: React.KeyboardEvent) {
    if (!open) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    }

    if (e.key === "Enter") {
      e.preventDefault();
      const f = filtered[activeIndex];
      if (f) insertField(f.key);
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="space-y-3 relative">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
          Expression
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {value?.length} chars
        </div>
      </div>

      {/* ================= OPERATOR TOOLBAR ================= */}
      <div className="flex flex-wrap gap-1.5">
        {OPERATORS?.map((op) => (
          <button
            key={op.label}
            type="button"
            onClick={() => insertText(op.value)}
            className="
              flex items-center gap-1 text-xs px-2.5 py-1.5 rounded
              border border-gray-300 dark:border-gray-700
              bg-white dark:bg-gray-900
              hover:bg-gray-50 dark:hover:bg-gray-800
              font-mono transition-colors
            "
          >
            <Plus className="h-3 w-3" />
            {op.label}
          </button>
        ))}
      </div>

      {/* ================= TEXTAREA ================= */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={`// Return true to show field, false to hide
// Example: values.age > 18 && values.country === "IN"`}
          spellCheck={false}
          rows={4}
          className="
            w-full rounded-lg border border-gray-300 dark:border-gray-700
            px-3 py-2.5 font-mono text-sm resize-y
            bg-white dark:bg-gray-900
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        />
        
        {/* Clear button */}
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            title="Clear expression"
          >
            <X className="h-3.5 w-3.5 text-gray-400" />
          </button>
        )}
      </div>

      {/* ================= AUTOCOMPLETE ================= */}
      {open && (
        <div
          className="
            absolute z-50 w-full mt-1
            rounded-lg border border-gray-300 dark:border-gray-700 
            bg-white dark:bg-gray-900 shadow-lg
            max-h-56 overflow-auto
          "
        >
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-800">
            <div className="text-xs font-medium text-gray-700 dark:text-gray-300">
              Available Fields
            </div>
          </div>
          
          {filtered?.map((f, i) => (
            <button
              key={f.key}
              onMouseDown={() => insertField(f.key)}
              className={`
                w-full px-3 py-2.5 cursor-pointer flex items-center justify-between
                transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0
                ${i === activeIndex
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                }
              `}
            >
              <div className="flex flex-col items-start">
                <span className="font-mono text-sm text-gray-800 dark:text-gray-200">
                  <span className="text-blue-500">values.</span>
                  <span className="font-semibold">{f.key}</span>
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {f.label}
                </span>
              </div>
              {i === activeIndex && (
                <ChevronUp className="h-3.5 w-3.5 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ================= HELP ================= */}
      <div className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
          How to use expressions
        </div>
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
          <li className="flex items-start gap-2">
            <span className="font-mono text-blue-500">values.</span>
            <span>Reference other fields by their key</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono">&&</span>
            <span>Logical AND operator</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono">||</span>
            <span>Logical OR operator</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-mono">===</span>
            <span>Strict equality comparison</span>
          </li>
        </ul>
      </div>
    </div>
  );
}