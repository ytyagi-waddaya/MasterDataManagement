import { RuntimeField } from "../contracts/runtime.contract";
import { validateRuntimeField } from "./validateFieldValue";

/* ======================================================
   FORM VALIDATION
====================================================== */

export function validateForm(
  runtimeFields: RuntimeField[],
  values: Record<string, any>
): boolean {
  let isValid = true;

  for (const field of runtimeFields) {
    const errors = validateRuntimeField(field, values);
    field.state.errors = errors;

    if (errors.length > 0) {
      isValid = false;
    }
  }

  return isValid;
}
