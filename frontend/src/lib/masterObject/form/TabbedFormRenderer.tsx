// "use client";

// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs";
// import { FormRenderer } from "@/components/field-builder/form-renderer/FormRenderer";
// import { fromBackendSchema } from "@/components/field-builder/types/fromBackendSchema";

// export function TabbedFormRenderer({
//   schema,
//   mode = "RUNTIME",
// }: {
//   schema: any;
//   mode?: "BUILDER" | "RUNTIME";
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
//     <Tabs defaultValue={sections[0].id} className="w-full">
//       {/* 🔹 Clean underline tabs */}
//       <div className="border-b">
//         <TabsList className="bg-transparent gap-6 px-2">
//           {sections.map((section) => (
//             <TabsTrigger
//               key={section.id}
//               value={section.id}
//               className="
//                 relative
//                 bg-transparent
//                 px-2
//                 pb-2
//                 text-muted-foreground
//                 data-[state=active]:text-primary
//                 data-[state=active]:font-medium
//                 after:absolute
//                 after:left-0
//                 after:bottom-0
//                 after:h-0.5
//                 after:w-full
//                 after:scale-x-0
//                 after:bg-primary
//                 after:transition-transform
//                 data-[state=active]:after:scale-x-100
//               "
//             >
//               {section.title}
//             </TabsTrigger>
//           ))}
//         </TabsList>
//       </div>

//       {/* 🔹 Section content */}
//       {sections.map((section) => (
//         <TabsContent
//           key={section.id}
//           value={section.id}
//           className="pt-6"
//         >
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
//         </TabsContent>
//       ))}
//     </Tabs>
//   );
// }
