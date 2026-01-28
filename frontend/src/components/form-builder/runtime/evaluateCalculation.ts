type CalculationConfig = {
  operator: "ADD" | "SUBTRACT" | "MULTIPLY" | "DIVIDE";
  operands: string[];
};

export function evaluateCalculation(
  calc: CalculationConfig,
  values: Record<string, any>,
): number | undefined {
  const nums = calc.operands
    ?.map((k) => Number(values[k]))
    .filter((v) => !isNaN(v));

  if (!nums?.length) return undefined;

  switch (calc.operator) {
    case "ADD":
      return nums.reduce((a, b) => a + b, 0);

    case "SUBTRACT":
      return nums.reduce((a, b) => a - b);

    case "MULTIPLY":
      return nums.reduce((a, b) => a * b, 1);

    case "DIVIDE":
      return nums.reduce((a, b) => a / b);

    default:
      return undefined;
  }
}
