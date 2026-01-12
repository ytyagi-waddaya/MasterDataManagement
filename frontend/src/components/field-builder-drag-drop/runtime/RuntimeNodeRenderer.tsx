// "use client";

// import { useState } from "react";
// import { EditorNode } from "../contracts/editor.contract";
// import { RuntimeFieldRenderer } from "./RuntimeField";

// export function RuntimeNodeRenderer({
//   node,
//   values,
//   errors,
//   onChange,
// }: {
//   node: EditorNode;
//   values: Record<string, any>;
//   errors: Record<string, string | null>;
//   onChange: (field: DynamicField, value: any) => void;
// }) {
//   /* ================= FIELD ================= */
//   if (node.kind === "FIELD") {
//     return (
//       <RuntimeFieldRenderer
//         field={node.field}
//         value={values[node.field.key]}
//         error={errors[node.field.key]}
//         onChange={onChange}
//       />
//     );
//   }

//   /* ================= COLUMNS ================= */
//   if (node.type === "columns") {
//     return (
//       <div className="grid grid-cols-12 gap-4">
//         {node.columns.map(col => (
//           <div key={col.id} className={`col-span-${col.span} space-y-4`}>
//             {col.children.map(child => (
//               <RuntimeNodeRenderer
//                 key={child.id}
//                 node={child}
//                 values={values}
//                 errors={errors}
//                 onChange={onChange}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     );
//   }

//   /* ================= TABS ================= */
//   if (node.type === "tabs") {
//     const [active, setActive] = useState(node.tabs[0]?.id);
//     const tab = node.tabs.find(t => t.id === active);
//     if (!tab) return null;

//     return (
//       <div className="space-y-4">
//         <div className="flex gap-3 border-b">
//           {node.tabs.map(t => (
//             <button
//               key={t.id}
//               onClick={() => setActive(t.id)}
//               className={`pb-2 ${
//                 t.id === active ? "border-b-2 font-semibold" : ""
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </div>

//         <div className="space-y-4">
//           {tab.children.map(child => (
//             <RuntimeNodeRenderer
//               key={child.id}
//               node={child}
//               values={values}
//               errors={errors}
//               onChange={onChange}
//             />
//           ))}
//         </div>
//       </div>
//     );
//   }

//   /* ================= ACCORDION ================= */
//   if (node.type === "accordion") {
//     return (
//       <div className="space-y-2">
//         {node.panels.map(p => (
//           <details key={p.id} className="border rounded">
//             <summary className="cursor-pointer px-3 py-2 font-medium">
//               {p.label}
//             </summary>
//             <div className="p-3 space-y-3">
//               {p.children.map(child => (
//                 <RuntimeNodeRenderer
//                   key={child.id}
//                   node={child}
//                   values={values}
//                   errors={errors}
//                   onChange={onChange}
//                 />
//               ))}
//             </div>
//           </details>
//         ))}
//       </div>
//     );
//   }

//   /* ================= REPEATER ================= */
//   if (node.type === "repeater") {
//     const items = values[node.id] ?? [];

//     return (
//       <div className="space-y-4">
//         {items.map((_: any, index: number) => (
//           <div key={index} className="border p-3 rounded space-y-3">
//             {node.children.map(child => (
//               <RuntimeNodeRenderer
//                 key={child.id}
//                 node={child}
//                 values={values}
//                 errors={errors}
//                 onChange={onChange}
//               />
//             ))}
//           </div>
//         ))}

//         <button
//           type="button"
//           className="text-sm underline"
//           onClick={() =>
//             onChange({ key: node.id } as any, [...items, {}])
//           }
//         >
//           + Add {node.config?.itemLabel ?? "Item"}
//         </button>
//       </div>
//     );
//   }

//   /* ================= SIMPLE LAYOUT ================= */
//   if (node.type === "divider") return <hr className="my-6" />;

//   if (node.type === "heading")
//     return <h3 className="font-semibold">{node.config?.text}</h3>;

//   if (node.type === "spacer")
//     return <div style={{ height: node.config?.height ?? 16 }} />;

//   return null;
// }
