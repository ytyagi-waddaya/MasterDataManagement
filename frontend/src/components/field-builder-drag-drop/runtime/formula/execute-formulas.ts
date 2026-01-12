
import { topoSort } from "./toposort";
import { buildDependencyGraph } from "./dependency-graph";
// import { evaluateExpression } from "../evaluators/expression-evaluator";
import { FieldConfig } from "../../contracts/field-config.contract";

export function executeFormulas(
  fields: FieldConfig[],
  values: Record<string, any>
): Record<string, any> {
  const graph = buildDependencyGraph(fields);
  const order = topoSort(graph);

  const nextValues = { ...values };

  for (const fieldKey of order) {
    const field = fields.find(f => f.meta.key === fieldKey);
    if (!field?.behavior?.formula) continue;

    // nextValues[fieldKey] = evaluateExpression(
    //   { expression: field.behavior.formula.expression },
    //   nextValues
    // );
  }

  return nextValues;
}
