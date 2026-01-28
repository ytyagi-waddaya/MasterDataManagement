// export function validateField(
//   value: any,
//   rules: any[],
//   fieldType: string
// ): string | null {
//   for (const rule of rules) {
//     switch (rule.type) {
//       case "REQUIRED":
//         if (
//           value === undefined ||
//           value === null ||
//           value === "" ||
//           (Array.isArray(value) && value.length === 0)
//         ) {
//           return rule.message;
//         }
//         break;

//       case "REGEX":
//         if (
//           value &&
//           rule.params?.regex &&
//           !new RegExp(rule.params.regex).test(value)
//         ) {
//           return rule.message;
//         }
//         break;

//       case "EMAIL":
//         if (
//           value &&
//           !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
//         ) {
//           return rule.message;
//         }
//         break;

//       case "MIN":
//         if (
//           fieldType === "NUMBER" &&
//           value !== "" &&
//           Number(value) < rule.params?.min
//         ) {
//           return rule.message;
//         }
//         break;

//       case "MAX":
//         if (
//           fieldType === "NUMBER" &&
//           value !== "" &&
//           Number(value) > rule.params?.max
//         ) {
//           return rule.message;
//         }
//         break;
//     }
//   }

//   return null;
// }
/* ======================================================
   FIELD VALIDATION ENGINE
====================================================== */
/* ======================================================
   FIELD VALIDATION ENGINE
====================================================== */

export function validateField(
  value: any,
  rules: any[] = [],
  fieldType: string,
  allValues?: Record<string, any>, // for REQUIRED_IF
): string | null {
  for (const rule of rules) {
    switch (rule.type) {
      /* ================= REQUIRED ================= */

      case "REQUIRED": {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          return rule.message || "This field is required";
        }
        break;
      }

      /* ================= REQUIRED_IF ================= */

      case "REQUIRED_IF": {
        const { fieldKey, equals } = rule.params ?? {};
        if (!fieldKey) break;

        const shouldRequire = allValues?.[fieldKey] === equals;

        if (
          shouldRequire &&
          (value === undefined ||
            value === null ||
            value === "" ||
            (Array.isArray(value) && value.length === 0))
        ) {
          return rule.message || "This field is required";
        }
        break;
      }

      /* ================= EMAIL ================= */

      case "EMAIL": {
        if (
          value &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        ) {
          return rule.message || "Invalid email address";
        }
        break;
      }

      /* ================= REGEX ================= */

      case "REGEX": {
        if (
          value &&
          rule.params?.regex &&
          !new RegExp(rule.params.regex).test(value)
        ) {
          return rule.message || "Invalid format";
        }
        break;
      }

      /* ================= NUMBER ================= */

      case "MIN": {
        if (
          fieldType === "NUMBER" &&
          value !== "" &&
          Number(value) < rule.params?.min
        ) {
          return rule.message || `Minimum value is ${rule.params.min}`;
        }
        break;
      }

      case "MAX": {
        if (
          fieldType === "NUMBER" &&
          value !== "" &&
          Number(value) > rule.params?.max
        ) {
          return rule.message || `Maximum value is ${rule.params.max}`;
        }
        break;
      }

      case "BETWEEN": {
        const { min, max } = rule.params ?? {};
        if (
          fieldType === "NUMBER" &&
          value !== "" &&
          (Number(value) < min || Number(value) > max)
        ) {
          return (
            rule.message ||
            `Value must be between ${min} and ${max}`
          );
        }
        break;
      }

      /* ================= STRING LENGTH ================= */

      case "LENGTH": {
        if (typeof value !== "string") break;

        if (
          rule.params?.min &&
          value.length < rule.params.min
        ) {
          return (
            rule.message ||
            `Minimum length is ${rule.params.min}`
          );
        }

        if (
          rule.params?.max &&
          value.length > rule.params.max
        ) {
          return (
            rule.message ||
            `Maximum length is ${rule.params.max}`
          );
        }
        break;
      }

      /* ================= RANGE (DATE / NUMBER) ================= */

      case "RANGE": {
        const { from, to } = rule.params ?? {};
        if (!value) break;

        if (
          (from && value < from) ||
          (to && value > to)
        ) {
          return (
            rule.message ||
            `Value must be between ${from} and ${to}`
          );
        }
        break;
      }

      /* ================= CUSTOM ================= */

      case "CUSTOM": {
        // Reserved for backend or plugin validation
        break;
      }

      default:
        break;
    }
  }

  return null;
}
