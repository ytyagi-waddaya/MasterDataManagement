// export type ValueInputType =
//   | "TEXT"
//   | "NUMBER"
//   | "BOOLEAN"
//   | "SELECT_MULTI"
//   | "DATE";

// /* ================= PROPS ================= */

// type BaseProps = {
//   onChange: (v: any) => void;
//   options?: { label: string; value: string }[];
// };

// type TextProps = {
//   type: "TEXT" | "DATE";
//   value: string | undefined;
// };

// type NumberProps = {
//   type: "NUMBER";
//   value: number | undefined;
// };

// type BooleanProps = {
//   type: "BOOLEAN";
//   value: boolean | undefined;
// };

// type MultiSelectProps = {
//   type: "SELECT_MULTI";
//   value: string[];
// };

// export type ValueInputProps =
//   | (TextProps & BaseProps)
//   | (NumberProps & BaseProps)
//   | (BooleanProps & BaseProps)
//   | (MultiSelectProps & BaseProps);

// /* ================= COMPONENT ================= */

// export function ValueInput(props: ValueInputProps) {
//   switch (props.type) {
//     case "TEXT":
//     case "DATE":
//       return (
//         <input
//           type={props.type === "DATE" ? "date" : "text"}
//           value={props.value ?? ""}
//           onChange={(e) => props.onChange(e.target.value)}
//         />
//       );

//     case "NUMBER":
//       return (
//         <input
//           type="number"
//           value={props.value ?? ""}
//           onChange={(e) =>
//             props.onChange(
//               e.target.value === ""
//                 ? undefined
//                 : Number(e.target.value)
//             )
//           }
//         />
//       );

//     case "BOOLEAN":
//       return (
//         <select
//           value={
//             props.value === undefined ? "" : String(props.value)
//           }
//           onChange={(e) =>
//             props.onChange(
//               e.target.value === ""
//                 ? undefined
//                 : e.target.value === "true"
//             )
//           }
//         >
//           <option value="">Select</option>
//           <option value="true">True</option>
//           <option value="false">False</option>
//         </select>
//       );

//     case "SELECT_MULTI":
//       return (
//         <select
//           multiple
//           value={props.value}
//           onChange={(e) =>
//             props.onChange(
//               Array.from(e.target.selectedOptions).map(
//                 (o) => o.value
//               )
//             )
//           }
//         >
//           {props.options?.map((o) => (
//             <option key={o.value} value={o.value}>
//               {o.label}
//             </option>
//           ))}
//         </select>
//       );

//     default:
//       return null;
//   }
// }

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type ValueInputType =
  | "TEXT"
  | "NUMBER"
  | "BOOLEAN"
  | "SELECT_MULTI"
  | "DATE";

/* ================= PROPS ================= */

type BaseProps = {
  onChange: (v: any) => void;
  options?: { label: string; value: string }[];
};

type TextProps = {
  type: "TEXT" | "DATE";
  value: string | undefined;
};

type NumberProps = {
  type: "NUMBER";
  value: number | undefined;
};

type BooleanProps = {
  type: "BOOLEAN";
  value: boolean | undefined;
};

type MultiSelectProps = {
  type: "SELECT_MULTI";
  value: string[];
};

export type ValueInputProps =
  | (TextProps & BaseProps)
  | (NumberProps & BaseProps)
  | (BooleanProps & BaseProps)
  | (MultiSelectProps & BaseProps);

/* ================= COMPONENT ================= */

export function ValueInput(props: ValueInputProps) {
  switch (props.type) {
    case "TEXT":
      return (
        <input
          type="text"
          value={props.value ?? ""}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder="Enter value"
          className="
            w-full text-sm px-3 py-1.5 rounded border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        />
      );

    case "DATE":
      return (
        <input
          type="date"
          value={props.value ?? ""}
          onChange={(e) => props.onChange(e.target.value)}
          className="
            w-full text-sm px-3 py-1.5 rounded border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        />
      );

    case "NUMBER":
      return (
        <input
          type="number"
          value={props.value ?? ""}
          onChange={(e) =>
            props.onChange(
              e.target.value === ""
                ? undefined
                : Number(e.target.value)
            )
          }
          placeholder="Enter number"
          className="
            w-full text-sm px-3 py-1.5 rounded border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        />
      );

    case "BOOLEAN":
      return (
        <select
          value={props.value === undefined ? "" : String(props.value)}
          onChange={(e) =>
            props.onChange(
              e.target.value === ""
                ? undefined
                : e.target.value === "true"
            )
          }
          className="
            w-full text-sm px-3 py-1.5 rounded border
            border-gray-300 dark:border-gray-700
            bg-white dark:bg-gray-900
            focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
          "
        >
          <option value="">Select</option>
          <option value="true">True</option>
          <option value="false">False</option>
        </select>
      );

    case "SELECT_MULTI":
      return (
        <MultiSelectDropdown
          value={props.value}
          options={props.options || []}
          onChange={props.onChange}
        />
      );

    default:
      return null;
  }
}

/* ================= MULTI-SELECT DROPDOWN ================= */

function MultiSelectDropdown({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: { label: string; value: string }[];
  onChange: (v: string[]) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOption = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter(v => v !== optionValue)
      : [...value, optionValue];
    onChange(newValue);
  };

  const selectedLabels = options
    .filter(opt => value.includes(opt.value))
    .map(opt => opt.label);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          w-full text-sm px-3 py-1.5 rounded border
          border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900
          flex items-center justify-between
          focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500
        "
      >
        <span className="truncate">
          {selectedLabels.length > 0 
            ? selectedLabels.join(", ") 
            : "Select options"}
        </span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="
          absolute z-10 w-full mt-1
          rounded-lg border border-gray-300 dark:border-gray-700
          bg-white dark:bg-gray-900 shadow-lg
          max-h-60 overflow-auto
        ">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => toggleOption(option.value)}
              className="
                w-full px-3 py-2 text-sm text-left
                hover:bg-gray-50 dark:hover:bg-gray-800
                flex items-center justify-between
                transition-colors
              "
            >
              <span>{option.label}</span>
              {value.includes(option.value) && (
                <Check className="h-4 w-4 text-blue-500" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
