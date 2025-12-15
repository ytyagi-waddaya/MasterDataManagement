import { useState } from "react";
import { ZodSchema } from "zod";

export function useZodForm<T extends Record<string, any>>(
  schema: ZodSchema<T>,
  initial: T
) {
  const [form, setForm] = useState<T>(initial);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as any);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>({} as any);

  const validateField = (field: keyof T, value: any) => {
    const updated = { ...form, [field]: value };
    const result = schema.safeParse(updated);

    if (!result.success) {
      const issue = result.error.issues.find((i) => i.path[0] === field);
      setErrors((prev) => ({
        ...prev,
        [field]: issue?.message || "",
      }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }

    return updated;
  };

  return {
    form,
    errors,
    touched,

    setValue: <K extends keyof T>(field: K, value: T[K]) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const updated = validateField(field, value);
      setForm(updated);
    },

    onBlur: <K extends keyof T>(field: K) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      validateField(field, form[field]);
    },

    validateForm: () => schema.safeParse(form),

    reset: () => {
      setForm(initial);
      setErrors({} as any);
      setTouched({} as any);
    },
  };
}
