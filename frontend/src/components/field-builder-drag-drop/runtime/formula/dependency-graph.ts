
/* ======================================================
   GRAPH STRUCTURE
====================================================== */

import { FieldConfig } from "../../contracts/field-config.contract";

export type DependencyGraph = Map<string, Set<string>>;

/* ======================================================
   BUILD GRAPH
====================================================== */

export function buildDependencyGraph(
  fields: FieldConfig[]
): DependencyGraph {
  const graph: DependencyGraph = new Map();

  for (const field of fields) {
    const formula = field.behavior?.formula;
    if (!formula) continue;

    if (!graph.has(field.meta.key)) {
      graph.set(field.meta.key, new Set());
    }

    for (const dep of formula.dependencies) {
      graph.get(field.meta.key)!.add(dep);
    }
  }

  return graph;
}
