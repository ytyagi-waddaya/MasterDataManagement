// "use client";

// import { FormRenderer } from "@/components/field-builder/form-renderer/FormRenderer";
// import { fromBackendSchema } from "@/components/field-builder/types/fromBackendSchema";

// export function MasterObjectFormView({
//   schema,
//   mode = "RUNTIME",
// }: {
//   schema: any;
//   mode?: "RUNTIME" | "BUILDER";
// }) {
//   if (!schema?.sections?.length) {
//     return (
//       <div className="text-sm text-muted-foreground">
//         No form schema defined
//       </div>
//     );
//   }

//   const sections = fromBackendSchema(schema);

//   return (
//     <div className="space-y-8">
//       {sections.map((section) => (
//         <div key={section.id} className="space-y-4">
//           <h3 className="text-lg font-semibold">
//             {section.title}
//           </h3>

//           <FormRenderer
//             fields={section.fields.map((f) => ({
//               key: f.key,
//               label: f.label,
//               fieldType: f.type.toUpperCase(),
//               required: f.required,
//               config: {
//                 layout: f.layout,
//                 placeholder: f.placeholder,
//                 options: f.options,
//               },
//               value: null,
//             }))}
//             mode={mode}
//           />
//         </div>
//       ))}
//     </div>
//   );
// }
