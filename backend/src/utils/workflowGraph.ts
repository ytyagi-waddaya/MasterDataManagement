
// import { prisma } from "../lib/prisma.js";
// import { BadRequestException } from "../utils/appError.js";

// // Accept client override (tx) — default is prisma
// export const validateWorkflowGraph = async (
//   workflowId: string,
//   client: typeof prisma | any = prisma
// ) => {
//   // Fetch workflow using the provided client (tx or prisma)
//   const workflow = await client.workflowDefinition.findUnique({
//     where: { id: workflowId },
//     include: {
//       stages: true,
//       transitions: true,
//     },
//   });

//   if (!workflow) throw new BadRequestException("Workflow not found");

//   const stages = workflow.stages;
//   const transitions = workflow.transitions;

//   if (!stages.length) {
//     throw new BadRequestException("Workflow must have at least one stage");
//   }

//   // ----------- Ensure exactly one initial stage -----------
//   const initialStages = stages.filter((s:any) => s.isInitial);

//   if (initialStages.length === 0) {
//     throw new BadRequestException(
//       "Workflow must have one stage marked as initial"
//     );
//   }

//   if (initialStages.length > 1) {
//     throw new BadRequestException(
//       "Workflow cannot have multiple initial stages"
//     );
//   }

//   // Safe narrowing for TS
//   const initialStage = initialStages[0]!;

//   // ----------- Detect graph cycles -----------
//   const graph: Record<string, string[]> = {};

//   for (const stage of stages) {
//     graph[stage.id] = [];
//   }

//   transitions.forEach((t:any) => {
//     graph[t.fromStageId]?.push(t.toStageId);
//   });

//   const visited = new Set<string>();
//   const stack = new Set<string>();

//   const dfs = (node: string): boolean => {
//     if (stack.has(node)) return true; // cycle found
//     if (visited.has(node)) return false;

//     visited.add(node);
//     stack.add(node);

//     for (const neighbor of (graph[node] ?? [])) {
//       if (dfs(neighbor)) return true;
//     }

//     stack.delete(node);
//     return false;
//   };

//   for (const stage of stages) {
//     if (dfs(stage.id)) {
//       throw new BadRequestException(
//         "Workflow graph contains a cycle. Remove circular transitions."
//       );
//     }
//   }

//   // ----------- Orphan stage detection -----------
//   const reachable = new Set<string>();

//   const visit = (node: string) => {
//     reachable.add(node);
//     for (const next of (graph[node] ?? [])) {
//       if (!reachable.has(next)) visit(next);
//     }
//   };

//   visit(initialStage.id);

//   const unreachableStages = stages.filter((s:any) => !reachable.has(s.id));

//   if (unreachableStages.length) {
//     throw new BadRequestException(
//       `Some stages cannot be reached from the initial stage: ${unreachableStages
//         .map((s:any) => s.name)
//         .join(", ")}`
//     );
//   }

//   // ----------- Final stage validation -----------
//   for (const s of stages) {
//     if (s.isFinal) {
//       const outgoing = transitions.filter((t:any) => t.fromStageId === s.id);
//       if (outgoing.length > 0) {
//         throw new BadRequestException(
//           `Final stage "${s.name}" should not have outgoing transitions`
//         );
//       }
//     }
//   }

//   return true; // Workflow graph is valid
// };

import { prisma } from "../lib/prisma.js";
import { BadRequestException } from "../utils/appError.js";

export const validateWorkflowGraph = async (
  workflowId: string,
  client: typeof prisma | any = prisma
) => {
  const workflow = await client.workflowDefinition.findUnique({
    where: { id: workflowId },
    include: {
      stages: true,
      transitions: true,
    },
  });

  if (!workflow) throw new BadRequestException("Workflow not found");

  const stages = workflow.stages;
  const transitions = workflow.transitions;

  if (!stages.length) {
    throw new BadRequestException("Workflow must have at least one stage");
  }

  /* -----------------------------------------------------------
   * 1. INITIAL STAGE VALIDATION
   * --------------------------------------------------------- */
  const initialStages = stages.filter((s:any) => s.isInitial);

  if (initialStages.length === 0)
    throw new BadRequestException("Workflow must have one initial stage");

  if (initialStages.length > 1)
    throw new BadRequestException(
      "Workflow cannot have multiple initial stages"
    );

  const initialStage = initialStages[0];

  /* -----------------------------------------------------------
   * 2. FINAL STAGE VALIDATION
   * --------------------------------------------------------- */
  const finalStages = stages.filter((s:any) => s.isFinal);

  for (const f of finalStages) {
    const outgoing = transitions.filter((t:any) => t.fromStageId === f.id);
    if (outgoing.length > 0) {
      throw new BadRequestException(
        `Final stage "${f.name}" cannot have outgoing transitions`
      );
    }
  }

  /* -----------------------------------------------------------
   * 3. PREVENT illegal transitions:
   *    → No transition INTO initial stage
   *    → No transition FROM final stage
   * --------------------------------------------------------- */
  for (const t of transitions) {
    const from = stages.find((s:any) => s.id === t.fromStageId);
    const to = stages.find((s:any) => s.id === t.toStageId);

    if (!from || !to)
      throw new BadRequestException("Transition refers to invalid stage");

    if (from.isFinal) {
      throw new BadRequestException(
        `Transition cannot originate from final stage "${from.name}"`
      );
    }

    if (to.isInitial) {
      throw new BadRequestException(
        `Transition cannot point to initial stage "${to.name}"`
      );
    }
  }

  /* -----------------------------------------------------------
   * 4. GRAPH CYCLE DETECTION
   * --------------------------------------------------------- */
  const graph: Record<string, string[]> = {};
  for (const s of stages) graph[s.id] = [];

  transitions.forEach((t:any) => graph[t.fromStageId]?.push(t.toStageId));

  const visited = new Set<string>();
  const stack = new Set<string>();

  const dfs = (node: string): boolean => {
    if (stack.has(node)) return true; // cycle detected
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const next of graph[node] || []) {
      if (dfs(next)) return true;
    }

    stack.delete(node);
    return false;
  };

  for (const s of stages) {
    if (dfs(s.id)) {
      throw new BadRequestException(
        "Workflow graph contains a cycle. Remove circular transitions."
      );
    }
  }

  /* -----------------------------------------------------------
   * 5. ORPHAN / UNREACHABLE STAGE DETECTION
   * --------------------------------------------------------- */
  const reachable = new Set<string>();

  const explore = (node: string) => {
    reachable.add(node);
    for (const next of graph[node] ?? []) {
      if (!reachable.has(next)) explore(next);
    }
  };

  explore(initialStage.id);

  const unreachable = stages.filter((s:any) => !reachable.has(s.id));
  if (unreachable.length) {
    throw new BadRequestException(
      `Unreachable stages: ${unreachable.map((u:any) => u.name).join(", ")}`
    );
  }

  /* -----------------------------------------------------------
   * 6. FINAL STAGE MUST BE REACHABLE (if exists)
   * --------------------------------------------------------- */
  for (const f of finalStages) {
    if (!reachable.has(f.id)) {
      throw new BadRequestException(
        `Final stage "${f.name}" cannot be reached from initial stage`
      );
    }
  }

  /* -----------------------------------------------------------
   * 7. If multiple stages > 1 → must have transitions
   * --------------------------------------------------------- */
  if (stages.length > 1 && transitions.length === 0) {
    throw new BadRequestException(
      "Workflow has multiple stages but no transitions defined"
    );
  }

  return true;
};
