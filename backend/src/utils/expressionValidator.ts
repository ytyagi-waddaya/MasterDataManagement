// src/utils/expressionValidator.ts
export function validateExpression(
  expr: string,
  opts?: { allowedFieldPattern?: RegExp }
): { valid: true } | { valid: false; error: string } {
  if (!expr || typeof expr !== "string") return { valid: false, error: "empty expression" };

  // Basic checks
  // 1) parentheses balance
  let balance = 0;
  for (let ch of expr) {
    if (ch === "(") balance++;
    if (ch === ")") balance--;
    if (balance < 0) return { valid: false, error: "unbalanced parentheses" };
  }
  if (balance !== 0) return { valid: false, error: "unbalanced parentheses" };

  // Allowed tokens: identifiers (letters, digits, dot), numbers, strings in quotes,
  // operators: == = != > < >= <= && || and or, !, parentheses
  // We'll do a simple tokenizer
  const tokenRegex =
    /([A-Za-z_][A-Za-z0-9_\.]*|\d+(\.\d+)?|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|==|!=|>=|<=|&&|\|\||[=!<>+\-*/%()]|,|\s+)/g;

  const allowedFieldPattern = opts?.allowedFieldPattern ?? /^[A-Za-z_][A-Za-z0-9_\.]*$/;
  const allowedOperators = new Set(["==", "=", "!=", ">", "<", ">=", "<=", "&&", "||", "!", "+", "-", "*", "/", "%", ","]);

  let match;
  while ((match = tokenRegex.exec(expr)) !== null) {
    const token = match[0].trim();
    if (token === "") continue;

    // if identifier
    if (/^[A-Za-z_][A-Za-z0-9_\.]*$/.test(token)) {
      // Allow true/false/null
      if (["true", "false", "null"].includes(token.toLowerCase())) continue;
      // Validate field identifier pattern
      if (!allowedFieldPattern.test(token)) {
        return { valid: false, error: `invalid identifier: ${token}` };
      }
      continue;
    }

    // number
    if (/^\d+(\.\d+)?$/.test(token)) continue;

    // string
    if (/^".*"$/.test(token) || /^'.*'$/.test(token)) continue;

    // operators and parentheses
    if (allowedOperators.has(token) || token === "(" || token === ")") continue;

    return { valid: false, error: `invalid token: ${token}` };
  }

  // additional security: disallow suspicious substrings
  const blacklist = ["process", "require", "constructor", "prototype", "__proto__", "Function", "eval"];
  for (const b of blacklist) {
    if (expr.includes(b)) return { valid: false, error: `disallowed substring: ${b}` };
  }

  return { valid: true };
}
