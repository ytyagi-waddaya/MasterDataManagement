import { BadRequestException } from "../utils/appError.js";
import { Prisma } from "../../prisma/generated/client.js";

function assertExists<T>(
  value: T | undefined,
  message: string
): asserts value is T {
  if (value === undefined) {
    throw new BadRequestException(message);
  }
}

export const validateWorkflowGraph = async (
  workflowId: string,
  tx: Prisma.TransactionClient
): Promise<true> => {
  const workflow = await tx.workflowDefinition.findUnique({
    where: { id: workflowId },
    include: { stages: true, transitions: true },
  });

  if (!workflow) {
    throw new BadRequestException("Workflow not found");
  }

  const { stages, transitions } = workflow;

  /* ---------- INITIAL ---------- */
  const initialStages = stages.filter((s) => s.isInitial);
  if (initialStages.length !== 1) {
    throw new BadRequestException("Exactly one initial stage is required");
  }

  const initialStage = initialStages[0];
  assertExists(initialStage, "Initial stage missing");

  /* ---------- FINAL STAGE RULE ---------- */
  for (const stage of stages) {
    if (stage.isFinal) {
      const outgoing = transitions.filter(
        (t) =>
          t.fromStageId === stage.id &&
          t.transitionType !== "SEND_BACK" &&
          t.transitionType !== "REVIEW" &&
          t.transitionType !== "AUTO"
      );

      if (outgoing.length > 0) {
        throw new BadRequestException(
          `Final stage "${stage.name}" cannot have outgoing transitions`
        );
      }
    }
  }

  /* ---------- GRAPH BUILD (FORWARD FLOW ONLY) ---------- */
  const graph = new Map<string, string[]>();
  stages.forEach((s) => graph.set(s.id, []));

  for (const t of transitions) {
    // REVIEW self-loop → ignore
    if (
      t.transitionType === "REVIEW" &&
      t.fromStageId === t.toStageId
    ) {
      continue;
    }

    // SEND_BACK → ignore (rollback)
    if (t.transitionType === "SEND_BACK") {
      continue;
    }

    // AUTO → ignore (system flow)
    if (t.transitionType === "AUTO") {
      continue;
    }

    const edges = graph.get(t.fromStageId);
    if (!edges) {
      throw new BadRequestException(
        `Invalid fromStageId: ${t.fromStageId}`
      );
    }

    edges.push(t.toStageId);
  }

  /* ---------- CYCLE DETECTION ---------- */
  const visited = new Set<string>();
  const stack = new Set<string>();

  const dfs = (node: string): boolean => {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const next of graph.get(node) ?? []) {
      if (dfs(next)) return true;
    }

    stack.delete(node);
    return false;
  };

  for (const stage of stages) {
    if (!visited.has(stage.id) && dfs(stage.id)) {
      throw new BadRequestException(
        "Workflow contains circular forward transitions"
      );
    }
  }

  /* ---------- REACHABILITY ---------- */
  const reachable = new Set<string>();

  const walk = (node: string) => {
    reachable.add(node);
    for (const next of graph.get(node) ?? []) {
      if (!reachable.has(next)) walk(next);
    }
  };

  walk(initialStage.id);

  const unreachable = stages.filter((s) => !reachable.has(s.id));
  if (unreachable.length) {
    throw new BadRequestException(
      `Unreachable stages: ${unreachable.map((s) => s.name).join(", ")}`
    );
  }

  /* ---------- DEAD-END (NON-FINAL STAGES) ---------- */
  for (const stage of stages) {
    if (!stage.isFinal) {
      const outgoing = transitions.filter(
        (t) =>
          t.fromStageId === stage.id &&
          t.transitionType !== "SEND_BACK" &&
          t.transitionType !== "REVIEW" &&
          t.transitionType !== "AUTO"
      );

      if (!outgoing.length) {
        throw new BadRequestException(
          `Stage "${stage.name}" has no outgoing transitions`
        );
      }
    }
  }

  return true;
};
