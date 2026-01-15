// export type WorkflowValidationResult = {
//   isValid: boolean;
//   errors: string[];
//   warnings: string[];
// };

// type Stage = {
//   tempId: string;
//   name: string;
//   category: string;
//   isInitial: boolean;
//   isFinal: boolean;
//   allowedNextCategories?: string[];
// };

// type Transition = {
//   label: string;
//   fromStageId: string;
//   toStageId: string;
//   transitionType: string;
//   triggerStrategy?: string;
//   approvalStrategy?: string;
//   approvalConfig?: any;
// };

// export function validateWorkflowGraph(data: any): WorkflowValidationResult {
//   const errors: string[] = [];
//   const warnings: string[] = [];

//   const stages: Stage[] = data.stages ?? [];
//   const transitions: Transition[] = data.transitions ?? [];

//   /* ======================================================
//      STAGE RULES
//   ====================================================== */

//   const initialStages = stages.filter((s) => s.isInitial);
//   const finalStages = stages.filter((s) => s.isFinal);

//   if (initialStages.length !== 1) {
//     errors.push("Exactly one initial stage is required");
//   }

//   if (finalStages.length !== 1) {
//     errors.push("Exactly one final stage is required");
//   }

//   const stageIds = new Set(stages.map((s) => s.tempId));
//   const stageNames = new Set<string>();

//   for (const s of stages) {
//     if (!s.name) errors.push("All stages must have a name");

//     if (stageNames.has(s.name)) {
//       errors.push(`Duplicate stage name: "${s.name}"`);
//     }
//     stageNames.add(s.name);
//   }

//   /* ======================================================
//      TRANSITION BASIC RULES
//   ====================================================== */

//   if (!transitions.length) {
//     errors.push("At least one transition is required");
//   }

//   for (const t of transitions) {
//     if (!t.fromStageId || !t.toStageId) {
//       errors.push("All transitions must have from and to stages");
//       continue;
//     }

//     if (!stageIds.has(t.fromStageId) || !stageIds.has(t.toStageId)) {
//       errors.push(`Transition "${t.label}" references an invalid stage`);
//     }

//     /* ---------- SELF LOOP RULE ---------- */
//     if (
//       t.fromStageId === t.toStageId &&
//       !["REVIEW", "AUTO"].includes(t.transitionType)
//     ) {
//       errors.push(
//         `Only REVIEW or AUTO transitions can be self-loops ("${t.label}")`
//       );
//     }

//     /* ---------- AUTO RULE ---------- */
//     if (t.transitionType === "AUTO") {
//       if (t.triggerStrategy !== "SYSTEM_ONLY") {
//         errors.push(`AUTO transition "${t.label}" must be SYSTEM_ONLY`);
//       }
//       if (t.approvalConfig) {
//         errors.push(`AUTO transition "${t.label}" cannot have approval config`);
//       }
//     }

//     /* ---------- APPROVAL RULES ---------- */
//     if (t.transitionType === "APPROVAL") {
//       if (!t.approvalConfig || !t.approvalStrategy) {
//         errors.push(
//           `Approval transition "${t.label}" is missing approval configuration`
//         );
//       }

//       // triggerStrategy is system-controlled for approval
//       if (
//         t.triggerStrategy &&
//         t.triggerStrategy !== "APPROVER_ONLY"
//       ) {
//         errors.push(
//           `Approval transition "${t.label}" must be APPROVER_ONLY`
//         );
//       }

//       const levels = t.approvalConfig?.levels;
//       if (!levels || !levels.length) {
//         errors.push(
//           `Approval transition "${t.label}" must have at least one approval level`
//         );
//       } else {
//         levels.forEach((lvl: any, i: number) => {
//           const count =
//             (lvl.roleIds?.length ?? 0) +
//             (lvl.userIds?.length ?? 0);

//           if (count === 0) {
//             errors.push(
//               `Approval transition "${t.label}" level ${
//                 i + 1
//               } has no approvers`
//             );
//           }
//         });
//       }

//       if (
//         t.approvalStrategy === "MAJORITY" &&
//         t.approvalConfig?.mode === "SEQUENTIAL"
//       ) {
//         errors.push(
//           `MAJORITY strategy cannot be used with SEQUENTIAL approvals ("${t.label}")`
//         );
//       }
//     }
//   }

//   /* ======================================================
//      FINAL STAGE OUTGOING RULE
//   ====================================================== */

//   for (const s of stages) {
//     if (!s.isFinal) continue;

//     const outgoing = transitions.filter(
//       (t) =>
//         t.fromStageId === s.tempId &&
//         !["SEND_BACK", "REVIEW", "AUTO"].includes(t.transitionType)
//     );

//     if (outgoing.length) {
//       errors.push(
//         `Final stage "${s.name}" cannot have outgoing transitions`
//       );
//     }
//   }

//   /* ======================================================
//      CATEGORY FLOW RULES
//   ====================================================== */

//   for (const t of transitions) {
//     const from = stages.find((s) => s.tempId === t.fromStageId);
//     const to = stages.find((s) => s.tempId === t.toStageId);
//     if (!from || !to) continue;

//     if (
//       from.allowedNextCategories?.length &&
//       !from.allowedNextCategories.includes(to.category)
//     ) {
//       errors.push(
//         `Stage "${from.name}" cannot transition to category "${to.category}"`
//       );
//     }
//   }

//   /* ======================================================
//      GRAPH VALIDATION (MATCHES BACKEND)
//   ====================================================== */

//   // Build forward graph (ignore REVIEW, SEND_BACK, AUTO)
//   const graph = new Map<string, string[]>();
//   stages.forEach((s) => graph.set(s.tempId, []));

//   for (const t of transitions) {
//     if (
//       ["REVIEW", "SEND_BACK", "AUTO"].includes(t.transitionType)
//     ) {
//       continue;
//     }

//     const edges = graph.get(t.fromStageId);
//     if (edges) edges.push(t.toStageId);
//   }

//   /* ---------- CYCLE DETECTION ---------- */
//   const visited = new Set<string>();
//   const stack = new Set<string>();

//   const dfsCycle = (node: string): boolean => {
//     if (stack.has(node)) return true;
//     if (visited.has(node)) return false;

//     visited.add(node);
//     stack.add(node);

//     for (const next of graph.get(node) ?? []) {
//       if (dfsCycle(next)) return true;
//     }

//     stack.delete(node);
//     return false;
//   };

//   for (const s of stages) {
//     if (!visited.has(s.tempId) && dfsCycle(s.tempId)) {
//       errors.push("Workflow contains circular forward transitions");
//       break;
//     }
//   }

//   /* ---------- REACHABILITY ---------- */
//   const initial = initialStages[0];
//   if (initial) {
//     const reachable = new Set<string>();

//     const walk = (node: string) => {
//       reachable.add(node);
//       for (const next of graph.get(node) ?? []) {
//         if (!reachable.has(next)) walk(next);
//       }
//     };

//     walk(initial.tempId);

//     const unreachable = stages.filter(
//       (s) => !reachable.has(s.tempId)
//     );

//     if (unreachable.length) {
//       errors.push(
//         `Unreachable stages: ${unreachable
//           .map((s) => s.name)
//           .join(", ")}`
//       );
//     }
//   }

//   /* ---------- DEAD-END CHECK ---------- */
//   for (const s of stages) {
//     if (s.isFinal) continue;

//     const outgoing = transitions.filter(
//       (t) =>
//         t.fromStageId === s.tempId &&
//         !["SEND_BACK", "REVIEW", "AUTO"].includes(t.transitionType)
//     );

//     if (!outgoing.length) {
//       errors.push(`Stage "${s.name}" has no outgoing transitions`);
//     }
//   }

//   /* ======================================================
//      RESULT
//   ====================================================== */

//   return {
//     isValid: errors.length === 0,
//     errors,
//     warnings,
//   };
// }
export type WorkflowValidationResult = {
  isValid: boolean;
  errors: string[];
  warnings: string[];
};

type Stage = {
  tempId: string;
  name: string;
  category: string;
  isInitial: boolean;
  isFinal: boolean;
  allowedNextCategories?: string[];
};

type Transition = {
  label: string;
  fromStageId: string;
  toStageId: string;
  transitionType: string;
  triggerStrategy?: string;
  approvalStrategy?: string;
  approvalConfig?: any;
};

export function validateWorkflowGraph(data: any): WorkflowValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const stages: Stage[] = data.stages ?? [];
  const transitions: Transition[] = data.transitions ?? [];

  /* ======================================================
     STAGE RULES
  ====================================================== */

  const initialStages = stages.filter((s) => s.isInitial);
  const finalStages = stages.filter((s) => s.isFinal);

  if (initialStages.length !== 1) {
    errors.push("Exactly one initial stage is required");
  }

  // Keep this only if business wants single final stage
  if (finalStages.length !== 1) {
    errors.push("Exactly one final stage is required");
  }

  const stageIds = new Set(stages.map((s) => s.tempId));
  const stageNames = new Set<string>();

  for (const s of stages) {
    if (!s.name) errors.push("All stages must have a name");

    if (stageNames.has(s.name)) {
      errors.push(`Duplicate stage name: "${s.name}"`);
    }
    stageNames.add(s.name);
  }

  /* ======================================================
     TRANSITION BASIC RULES
  ====================================================== */

  if (!transitions.length) {
    errors.push("At least one transition is required");
  }

  for (const t of transitions) {
    if (!t.fromStageId || !t.toStageId) {
      errors.push("All transitions must have from and to stages");
      continue;
    }

    if (!stageIds.has(t.fromStageId) || !stageIds.has(t.toStageId)) {
      errors.push(`Transition "${t.label}" references an invalid stage`);
    }

    /* ---------- SELF LOOP RULE ---------- */
    if (
      t.fromStageId === t.toStageId &&
      !["REVIEW", "AUTO"].includes(t.transitionType)
    ) {
      errors.push(
        `Only REVIEW or AUTO transitions can be self-loops ("${t.label}")`
      );
    }

    /* ---------- AUTO RULE ---------- */
    if (t.transitionType === "AUTO") {
      if (t.triggerStrategy !== "SYSTEM_ONLY") {
        errors.push(`AUTO transition "${t.label}" must be SYSTEM_ONLY`);
      }
      if (t.approvalConfig) {
        errors.push(`AUTO transition "${t.label}" cannot have approval config`);
      }
    }

    /* ---------- APPROVAL RULES ---------- */
    if (t.transitionType === "APPROVAL") {
      if (!t.approvalConfig || !t.approvalStrategy) {
        errors.push(
          `Approval transition "${t.label}" is missing approval configuration`
        );
      }

      if (
        t.triggerStrategy &&
        t.triggerStrategy !== "APPROVER_ONLY"
      ) {
        errors.push(
          `Approval transition "${t.label}" must be APPROVER_ONLY`
        );
      }

      const levels = t.approvalConfig?.levels;
      if (!levels || !levels.length) {
        errors.push(
          `Approval transition "${t.label}" must have at least one approval level`
        );
      } else {
        levels.forEach((lvl: any, i: number) => {
          const count =
            (lvl.roleIds?.length ?? 0) +
            (lvl.userIds?.length ?? 0);

          if (count === 0) {
            errors.push(
              `Approval transition "${t.label}" level ${
                i + 1
              } has no approvers`
            );
          }
        });
      }

      if (
        t.approvalStrategy === "MAJORITY" &&
        t.approvalConfig?.mode === "SEQUENTIAL"
      ) {
        errors.push(
          `MAJORITY strategy cannot be used with SEQUENTIAL approvals ("${t.label}")`
        );
      }
    }
  }

  /* ======================================================
     FINAL STAGE OUTGOING RULE (MATCHES BACKEND)
  ====================================================== */

  for (const s of stages) {
    if (!s.isFinal) continue;

    const outgoingForward = transitions.filter(
      (t) =>
        t.fromStageId === s.tempId &&
        !["SEND_BACK", "REVIEW", "AUTO"].includes(t.transitionType)
    );

    if (outgoingForward.length) {
      errors.push(
        `Final stage "${s.name}" cannot have outgoing forward transitions`
      );
    }
  }

  /* ======================================================
     CATEGORY FLOW RULES
  ====================================================== */

  for (const t of transitions) {
    const from = stages.find((s) => s.tempId === t.fromStageId);
    const to = stages.find((s) => s.tempId === t.toStageId);
    if (!from || !to) continue;

    if (
      from.allowedNextCategories?.length &&
      !from.allowedNextCategories.includes(to.category)
    ) {
      errors.push(
        `Stage "${from.name}" cannot transition to category "${to.category}"`
      );
    }
  }

  /* ======================================================
     GRAPH VALIDATION (MATCHES BACKEND)
  ====================================================== */

  // Build forward graph (ignore REVIEW, SEND_BACK, AUTO)
  const graph = new Map<string, string[]>();
  stages.forEach((s) => graph.set(s.tempId, []));

  for (const t of transitions) {
    if (["REVIEW", "SEND_BACK", "AUTO"].includes(t.transitionType)) {
      continue;
    }

    const edges = graph.get(t.fromStageId);
    if (edges) edges.push(t.toStageId);
  }

  /* ---------- CYCLE DETECTION ---------- */
  const visited = new Set<string>();
  const stack = new Set<string>();

  const dfsCycle = (node: string): boolean => {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const next of graph.get(node) ?? []) {
      if (dfsCycle(next)) return true;
    }

    stack.delete(node);
    return false;
  };

  for (const s of stages) {
    if (!visited.has(s.tempId) && dfsCycle(s.tempId)) {
      errors.push("Workflow contains circular forward transitions");
      break;
    }
  }

  /* ---------- REACHABILITY ---------- */
  const initial = initialStages[0];
  if (initial) {
    const reachable = new Set<string>();

    const walk = (node: string) => {
      reachable.add(node);
      for (const next of graph.get(node) ?? []) {
        if (!reachable.has(next)) walk(next);
      }
    };

    walk(initial.tempId);

    const unreachable = stages.filter(
      (s) => !reachable.has(s.tempId)
    );

    if (unreachable.length) {
      errors.push(
        `Unreachable stages: ${unreachable
          .map((s) => s.name)
          .join(", ")}`
      );
    }
  }

  /* ======================================================
     DEAD-END CHECK (MATCHES BACKEND)
  ====================================================== */

  for (const s of stages) {
    if (s.isFinal) continue;

    const outgoing = transitions.filter(
      (t) =>
        t.fromStageId === s.tempId &&
        !["REVIEW", "AUTO"].includes(t.transitionType)
      // SEND_BACK IS VALID EXIT
    );

    if (!outgoing.length) {
      errors.push(`Stage "${s.name}" has no outgoing transitions`);
    }
  }

  /* ======================================================
     RESULT
  ====================================================== */

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}
