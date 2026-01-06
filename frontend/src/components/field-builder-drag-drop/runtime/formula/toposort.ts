import { DependencyGraph } from "./dependency-graph";

/* ======================================================
   TOPO SORT (KAHN)
====================================================== */

export function topoSort(
  graph: DependencyGraph
): string[] {
  const inDegree = new Map<string, number>();

  for (const [node, deps] of graph.entries()) {
    if (!inDegree.has(node)) inDegree.set(node, 0);

    for (const dep of deps) {
      inDegree.set(dep, (inDegree.get(dep) ?? 0) + 1);
    }
  }

  const queue = [...inDegree.entries()]
    .filter(([, deg]) => deg === 0)
    .map(([k]) => k);

  const result: string[] = [];

  while (queue.length) {
    const current = queue.shift()!;
    result.push(current);

    for (const [node, deps] of graph.entries()) {
      if (deps.has(current)) {
        const deg = inDegree.get(node)! - 1;
        inDegree.set(node, deg);

        if (deg === 0) queue.push(node);
      }
    }
  }

  if (result.length !== inDegree.size) {
    throw new Error("Cyclic dependency detected in formulas");
  }

  return result;
}
