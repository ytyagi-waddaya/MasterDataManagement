"use client";

import React, { useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { OPERATORS } from "./operators";

/* ---------------------------------------------------------
 * Types
 * --------------------------------------------------------- */

export type Operator = (typeof OPERATORS)[number];

export const ConditionRule = z.object({
  field: z.string().min(1),
  operator: z.string(),
  value: z.union([z.string(), z.number(), z.boolean(), z.array(z.any())]),
});

export type ConditionRuleType = z.infer<typeof ConditionRule>;

export type Group = {
  id: string;
  logic: "AND" | "OR";
  conditions: ConditionRuleType[];
  groups: Group[];
};

/* ---------------------------------------------------------
 * Helpers
 * --------------------------------------------------------- */

const uid = (prefix = "") =>
  prefix + Math.random().toString(36).slice(2, 8) + Date.now().toString(36).slice(-4);

const clone = <T,>(obj: T) => JSON.parse(JSON.stringify(obj)) as T;

function toExpression(node: Group | ConditionRuleType): string {
  if (!("conditions" in node && "groups" in node)) {
    const val = Array.isArray(node.value)
      ? `[${node.value.join(", ")}]`
      : `${node.value}`;
    return `${node.field} ${node.operator} ${val}`;
  }

  const parts: string[] = [];

  node.conditions.forEach((c) => parts.push(toExpression(c)));
  node.groups.forEach((g) => parts.push(toExpression(g)));

  const joined = parts.join(` ${node.logic} `);
  return parts.length > 1 ? `(${joined})` : joined;
}

function convertToBackend(node: Group | ConditionRuleType): any {
  if (!("conditions" in node)) {
    // Rule Node
    return {
      field: node.field,
      operator: node.operator,
      value: node.value,
    };
  }

  // Group Node
  return {
    op: node.logic,
    rules: [
      ...node.conditions.map(convertToBackend),
      ...node.groups.map(convertToBackend),
    ],
  };
}

function convertFromBackend(node: any): Group | ConditionRuleType {
  // If it's a rule
  if (node.field !== undefined) {
    return {
      field: node.field,
      operator: node.operator,
      value: node.value,
    };
  }

  // If it's a group
  return {
    id: uid("g_"),
    logic: node.op || "AND",
    conditions: node.rules
      .filter((r: any) => r.field !== undefined)
      .map((r: any) => convertFromBackend(r) as ConditionRuleType),
    groups: node.rules
      .filter((r: any) => r.field === undefined)
      .map((g: any) => convertFromBackend(g) as Group),
  };
}

/* ---------------------------------------------------------
 * Small UI Components
 * --------------------------------------------------------- */

function SmallLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-xs text-muted-foreground">{children}</div>;
}

/* ---------------------------------------------------------
 * Rule Row
 * --------------------------------------------------------- */

function RuleRow({
  rule,
  onChange,
  onRemove,
  fieldHints = [],
  operators,
}: {
  rule: ConditionRuleType;
  onChange: (next: ConditionRuleType) => void;
  onRemove?: () => void;
  fieldHints?: string[];
  operators: readonly string[];
}) {
  return (
    <div className="flex gap-2 items-start">
      {/* Field */}
      <div className="flex-1">
        <SmallLabel>Field</SmallLabel>
        <Input
          value={rule.field}
          onChange={(e) => onChange({ ...rule, field: e.target.value })}
          placeholder="e.g. ticket.createdBy"
        />

        {fieldHints.length > 0 && (
          <div className="mt-1 flex flex-wrap gap-1">
            {fieldHints.map((f) => (
              <button
                key={f}
                type="button"
                className="text-xs px-2 py-1 rounded border bg-white"
                onClick={() => onChange({ ...rule, field: f })}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Operator */}
      <div className="w-40">
        <SmallLabel>Operator</SmallLabel>
        <Select
          value={rule.operator}
          onValueChange={(v) => onChange({ ...rule, operator: v })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {operators.map((op) => (
              <SelectItem key={op} value={op}>
                {op}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Value */}
      <div className="flex-1">
        <SmallLabel>Value</SmallLabel>
        <Input
          value={
            Array.isArray(rule.value) ? rule.value.join(", ") : String(rule.value ?? "")
          }
          onChange={(e) => {
            const raw = e.target.value;
            const converted = raw.includes(",")
              ? raw.split(",").map((s) => s.trim())
              : raw;
            onChange({ ...rule, value: converted });
          }}
        />
      </div>

      {/* Remove */}
      <div className="pt-6">
        {onRemove && (
          <Button size="sm" variant="destructive" onClick={onRemove}>
            Remove
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
 * Group Editor (recursive)
 * --------------------------------------------------------- */

function GroupEditor({
  group,
  onChange,
  onRemove,
  depth = 0,
  fieldHints,
  operators,
}: {
  group: Group;
  onChange: (next: Group) => void;
  onRemove?: () => void;
  depth?: number;
  fieldHints?: string[];
  operators: readonly string[];
}) {
  const addCondition = () =>
    onChange({
      ...group,
      conditions: [...group.conditions, { field: "", operator: "=", value: "" }],
    });

  const addGroup = () =>
    onChange({
      ...group,
      groups: [...group.groups, { id: uid("g_"), logic: "AND", conditions: [], groups: [] }],
    });

  return (
    <div className={`p-3 border rounded-md ${depth ? "bg-white" : "bg-gray-50"}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SmallLabel>Group Logic</SmallLabel>

          <Select
            value={group.logic}
            onValueChange={(v) => onChange({ ...group, logic: v as Group["logic"] })}
          >
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">AND</SelectItem>
              <SelectItem value="OR">OR</SelectItem>
            </SelectContent>
          </Select>

          <Badge>{group.conditions.length + group.groups.length} items</Badge>
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="ghost" onClick={addCondition}>
            + Condition
          </Button>
          <Button size="sm" variant="ghost" onClick={addGroup}>
            + Group
          </Button>
          {onRemove && (
            <Button size="sm" variant="destructive" onClick={onRemove}>
              Remove
            </Button>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="space-y-3">
        {group.conditions.map((c, i) => (
          <RuleRow
            key={`c_${i}`}
            rule={c}
            onChange={(r) => {
              const copy = [...group.conditions];
              copy[i] = r;
              onChange({ ...group, conditions: copy });
            }}
            onRemove={() =>
              onChange({
                ...group,
                conditions: group.conditions.filter((_, idx) => idx !== i),
              })
            }
            fieldHints={fieldHints}
            operators={operators}
          />
        ))}

        {group.groups.map((g, i) => (
          <GroupEditor
            key={g.id}
            group={g}
            onChange={(next) => {
              const copy = [...group.groups];
              copy[i] = next;
              onChange({ ...group, groups: copy });
            }}
            onRemove={() =>
              onChange({
                ...group,
                groups: group.groups.filter((_, idx) => idx !== i),
              })
            }
            depth={depth + 1}
            fieldHints={fieldHints}
            operators={operators}
          />
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------
 * Main Component
 * --------------------------------------------------------- */

export default function ConditionEditor({
  defaultValue,
  onSave,
  onCancel,
  fieldHints,
  operators = OPERATORS,
}: {
  defaultValue?: Group | null;
  onSave: (value: Group) => void;
  onCancel?: () => void;
  fieldHints?: string[];
  operators?: readonly string[];
}) {
const [tree, setTree] = useState<Group>(() =>
  defaultValue
    ? (convertFromBackend(defaultValue) as Group)
    : { id: uid("g_"), logic: "AND", conditions: [], groups: [] }
);


  const expressionPreview = useMemo(() => toExpression(tree), [tree]);

const handleSave = () => {
  try {
    const validate = (g: Group) => {
      g.conditions.forEach((c) => ConditionRule.parse(c));
      g.groups.forEach(validate);
    };
    validate(tree);
  } catch (err: any) {
    alert(`Invalid condition: ${err?.message}`);
    return;
  }

  const backendFormat = convertToBackend(tree);
  onSave(backendFormat);
};


  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-6">

        {/* Builder */}
        <Card className="p-4 w-full">
          <div className="max-h-[70vh] overflow-y-auto pr-2">
            <GroupEditor
              group={tree}
              onChange={(g) => setTree(g)}
              fieldHints={fieldHints}
              operators={operators}
            />
          </div>
        </Card>

        {/* Expression */}
        <Card className="p-4 w-full flex flex-col">
          <h3 className="text-sm font-medium mb-2">Expression Preview</h3>

          <pre className="p-3 bg-gray-50 rounded text-sm h-64 overflow-y-auto whitespace-pre-wrap wrap-break-words flex-1">
            {expressionPreview || "(empty)"}
          </pre>

          <div className="flex justify-between mt-4">
            <Button onClick={handleSave}>Save</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
