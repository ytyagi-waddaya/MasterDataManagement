
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
