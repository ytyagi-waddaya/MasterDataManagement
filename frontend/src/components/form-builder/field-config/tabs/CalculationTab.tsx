// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// const OPERATORS = [
//   { value: "ADD", label: "+" },
//   { value: "SUBTRACT", label: "−" },
//   { value: "MULTIPLY", label: "×" },
//   { value: "DIVIDE", label: "÷" },
// ];

// export function CalculationTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fields = useFormBuilderStore((s) => s.fieldConfigs);

//   if (field.meta.category !== "CALCULATED") return null;

//   const calculation = field.calculation ?? {
//     operator: "ADD",
//     operands: [],
//   };

//   function update(patch: any) {
//     updateField(field.meta.key, {
//       calculation: {
//         ...calculation,
//         ...patch,
//       },
//     });
//   }

//   return (
//     <div className="space-y-4">
//       <h4 className="font-semibold">Calculation</h4>

//       {/* OPERATOR */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">
//           Operation
//         </label>
//         <select
//           className="border p-2 w-full"
//           value={calculation.operator}
//           onChange={(e) =>
//             update({ operator: e.target.value })
//           }
//         >
//           {OPERATORS?.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* OPERANDS */}
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">
//           Fields
//         </label>

//         <div className="space-y-2">
//           {calculation.operands?.map((key: string, i: number) => (
//             <div key={i} className="flex gap-2">
//               <select
//                 className="border p-2 flex-1"
//                 value={key}
//                 onChange={(e) => {
//                   const next = [...calculation.operands];
//                   next[i] = e.target.value;
//                   update({ operands: next });
//                 }}
//               >
//                 {fields
//                   .filter((f) => f.data.type === "NUMBER")
//                   .map((f) => (
//                     <option
//                       key={f.meta.key}
//                       value={f.meta.key}
//                     >
//                       {f.meta.label}
//                     </option>
//                   ))}
//               </select>

//               <button
//                 type="button"
//                 className="text-red-500 text-xs"
//                 onClick={() =>
//                   update({
//                     operands: calculation.operands.filter(
//                       (_: any, idx: number) => idx !== i,
//                     ),
//                   })
//                 }
//               >
//                 ✕
//               </button>
//             </div>
//           ))}
//         </div>

//         <button
//           type="button"
//           className="text-sm border px-3 py-1 mt-2"
//           onClick={() =>
//             update({
//               operands: [...calculation.operands, ""],
//             })
//           }
//         >
//           ➕ Add field
//         </button>
//       </div>
//     </div>
//   );
// }
// import { useMemo, useRef } from "react";
// import { useFormBuilderStore } from "../../state/useFormBuilderStore";

// const OPERATORS = ["+", "-", "*", "/", "(", ")"];
// const FUNCTIONS = ["if", "min", "max", "round", "abs", "ceil", "floor"];

// export function CalculationTab({ field }: any) {
//   const updateField = useFormBuilderStore((s) => s.updateField);
//   const fields = useFormBuilderStore((s) => s.fieldConfigs);

//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   if (field.meta.category !== "CALCULATED") return null;

//   const calculation = field.calculation ?? {
//     expression: "",
//     dependencies: [],
//   };

//   const numberFields = useMemo(
//     () => fields.filter((f) => f.data.type === "NUMBER"),
//     [fields],
//   );

//   /* ================= HELPERS ================= */

//   function extractDeps(expr: string) {
//     const keys = numberFields.map((f) => f.meta.key);
//     return keys.filter((k) => new RegExp(`\\b${k}\\b`).test(expr));
//   }

//   function updateExpression(expr: string) {
//     updateField(field.meta.key, {
//       calculation: {
//         expression: expr,
//         dependencies: extractDeps(expr),
//       },
//     });
//   }

//   function insertAtCursor(text: string) {
//     const el = textareaRef.current;
//     if (!el) return;

//     const start = el.selectionStart ?? el.value.length;
//     const end = el.selectionEnd ?? el.value.length;

//     const next =
//       el.value.slice(0, start) + text + el.value.slice(end);

//     updateExpression(next);

//     // restore cursor position
//     requestAnimationFrame(() => {
//       el.selectionStart = el.selectionEnd = start + text.length;
//       el.focus();
//     });
//   }

//   /* ================= RENDER ================= */

//   return (
//     <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
//       <h4 className="font-semibold text-sm">Formula</h4>

//       {/* FORMULA INPUT */}
//       <textarea
//         ref={textareaRef}
//         className="w-full border rounded p-2 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//         placeholder="e.g. price * quantity * (1 + tax / 100)"
//         value={calculation.expression}
//         onChange={(e) => updateExpression(e.target.value)}
//         rows={4}
//       />

//       {/* OPERATORS */}
//       <div>
//         <div className="text-xs text-gray-500 mb-1">Operators</div>
//         <div className="flex flex-wrap gap-2">
//           {OPERATORS.map((op) => (
//             <button
//               key={op}
//               type="button"
//               onClick={() => insertAtCursor(op)}
//               className="px-2 py-1 border rounded text-xs hover:bg-gray-100"
//             >
//               {op}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FUNCTIONS */}
//       <div>
//         <div className="text-xs text-gray-500 mb-1">Functions</div>
//         <div className="flex flex-wrap gap-2">
//           {FUNCTIONS.map((fn) => (
//             <button
//               key={fn}
//               type="button"
//               onClick={() => insertAtCursor(`${fn}(`)}
//               className="px-2 py-1 border rounded text-xs bg-white hover:bg-gray-100"
//             >
//               {fn}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* FIELDS */}
//       <div>
//         <div className="text-xs text-gray-500 mb-1">
//           Number fields (click to insert)
//         </div>
//         <div className="flex flex-wrap gap-2">
//           {numberFields.map((f) => (
//             <button
//               key={f.meta.key}
//               type="button"
//               onClick={() => insertAtCursor(f.meta.key)}
//               className="px-2 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded text-xs hover:bg-blue-100"
//             >
//               {f.meta.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* DEPENDENCIES */}
//       {calculation.dependencies.length > 0 && (
//         <div className="text-xs text-gray-500">
//           Depends on:{" "}
//           <span className="font-mono">
//             {calculation.dependencies.join(", ")}
//           </span>
//         </div>
//       )}

//       {/* EXAMPLES */}
//       <div className="text-xs text-gray-400">
//         <div className="font-medium mb-1">Examples</div>
//         <ul className="list-disc ml-4 space-y-1">
//           <li>price * quantity</li>
//           <li>amount * (1 + tax / 100)</li>
//           <li>if(total &gt; 1000, total * 0.9, total)</li>
//           <li>round(subtotal * 1.18, 2)</li>
//         </ul>
//       </div>
//     </div>
//   );
// }
import { useMemo, useState } from "react";
import { useActiveFields, useFormBuilderStore } from "../../state/useFormBuilderStore";

/* ================= TYPES ================= */

type Token = {
  type: "FIELD" | "NUMBER" | "OP" | "FUNC" | "PAREN" | "LOGIC";
  value: string;
  label?: string; // ✅ optional (fixes TS error)
};

const ARITHMETIC_OPS = ["+", "-", "*", "/", "%"];
const COMPARISON_OPS = [">", "<", ">=", "<=", "==", "!="];
const LOGICAL_OPS = ["&&", "||"];
const FUNCTIONS = ["IF", "MIN", "MAX", "ROUND", "ABS", "CEIL", "FLOOR"];

export function CalculationTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const fields = useActiveFields()

  
  const numberFields = useMemo(
    () => fields.filter((f) => f.data.type === "NUMBER"),
    [fields],
  );
  
  /* ================= TOKEN STATE ================= */
  
  const [tokens, setTokens] = useState<Token[]>(() => {
    if (!field.calculation?.expression) return [];
    return parseExpressionToTokens(field.calculation.expression, numberFields);
  });
  
  if (field.meta.category !== "CALCULATED") return null;

  /* ================= HELPERS ================= */

  function compile(next: Token[]) {
    const expr = next.map((t) => t.value).join(" ");
    const deps = next
      .filter((t) => t.type === "FIELD")
      .map((t) => t.value);

    updateField(field.meta.key, {
      calculation: {
        expression: expr,
        dependencies: Array.from(new Set(deps)),
      },
    });
  }

  function push(token: Token) {
    const next = [...tokens, token];
    setTokens(next);
    compile(next);
  }

  function pop() {
    const next = tokens.slice(0, -1);
    setTokens(next);
    compile(next);
  }

  function clear() {
    setTokens([]);
    updateField(field.meta.key, {
      calculation: { expression: "", dependencies: [] },
    });
  }

  /* ================= RENDER ================= */

  return (
    <div className="space-y-4 border rounded-lg p-4 bg-gray-50">
      <h4 className="font-semibold text-sm">Formula Builder</h4>

      {/* ================= EXPRESSION PREVIEW ================= */}
      <div className="min-h-11 border rounded bg-white p-2 font-mono text-sm flex flex-wrap gap-1">
        {tokens.length === 0 && (
          <span className="text-gray-400">
            Click buttons to build formula…
          </span>
        )}

        {tokens.map((t, i) => (
          <span
            key={i}
            className={`px-2 py-1 rounded text-xs ${
              t.type === "FIELD"
                ? "bg-blue-100 text-blue-700"
                : t.type === "FUNC"
                ? "bg-purple-100 text-purple-700"
                : t.type === "LOGIC"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100"
            }`}
          >
            {t.label ?? t.value}
          </span>
        ))}
      </div>

      {/* ================= FIELDS ================= */}
      <Section title="Fields">
        {numberFields.map((f) => (
          <TokenButton
            key={f.meta.key}
            label={f.meta.label}
            onClick={() =>
              push({
                type: "FIELD",
                value: f.meta.key,
                label: f.meta.label,
              })
            }
          />
        ))}
      </Section>

      {/* ================= ARITHMETIC ================= */}
      <Section title="Arithmetic">
        {ARITHMETIC_OPS.map((op) => (
          <TokenButton
            key={op}
            label={op}
            onClick={() => push({ type: "OP", value: op })}
          />
        ))}
      </Section>

      {/* ================= COMPARISON ================= */}
      <Section title="Comparison">
        {COMPARISON_OPS.map((op) => (
          <TokenButton
            key={op}
            label={op}
            onClick={() => push({ type: "OP", value: op })}
          />
        ))}
      </Section>

      {/* ================= LOGICAL ================= */}
      <Section title="Logical">
        {LOGICAL_OPS.map((op) => (
          <TokenButton
            key={op}
            label={op}
            onClick={() => push({ type: "LOGIC", value: op })}
          />
        ))}
      </Section>

      {/* ================= GROUPING ================= */}
      <Section title="Grouping">
        <TokenButton label="(" onClick={() => push({ type: "PAREN", value: "(" })} />
        <TokenButton label=")" onClick={() => push({ type: "PAREN", value: ")" })} />
      </Section>

      {/* ================= FUNCTIONS ================= */}
      <Section title="Functions">
        {FUNCTIONS.map((fn) => (
          <TokenButton
            key={fn}
            label={`${fn}(`}
            onClick={() => push({ type: "FUNC", value: `${fn}(` })}
          />
        ))}
      </Section>

      {/* ================= ACTIONS ================= */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={pop}
          className="px-3 py-1 text-xs border rounded hover:bg-gray-100"
        >
          ⌫ Undo
        </button>

        <button
          type="button"
          onClick={clear}
          className="px-3 py-1 text-xs border rounded text-red-600 hover:bg-red-50"
        >
          Clear
        </button>
      </div>

      {/* ================= DEPENDENCIES ================= */}
      {field.calculation?.dependencies?.length > 0 && (
        <div className="text-xs text-gray-500">
          Depends on:{" "}
          <span className="font-mono">
            {field.calculation.dependencies.join(", ")}
          </span>
        </div>
      )}
    </div>
  );
}

/* ================= SMALL UI HELPERS ================= */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-1">{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function TokenButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2 py-1 border rounded text-xs bg-white hover:bg-gray-100"
    >
      {label}
    </button>
  );
}

/* ================= UTILS ================= */

function parseExpressionToTokens(expr: string, fields: any[]): Token[] {
  if (!expr) return [];

  const tokens: Token[] = [];
  const parts = expr.split(/\s+/);

  for (const p of parts) {
    const field = fields.find((f) => f.meta.key === p);

    if (field) {
      tokens.push({ type: "FIELD", value: p, label: field.meta.label });
    } else if (ARITHMETIC_OPS.includes(p) || COMPARISON_OPS.includes(p)) {
      tokens.push({ type: "OP", value: p });
    } else if (LOGICAL_OPS.includes(p)) {
      tokens.push({ type: "LOGIC", value: p });
    } else if (p === "(" || p === ")") {
      tokens.push({ type: "PAREN", value: p });
    } else if (p.endsWith("(")) {
      tokens.push({ type: "FUNC", value: p });
    } else {
      tokens.push({ type: "NUMBER", value: p, label: p });
    }
  }

  return tokens;
}
