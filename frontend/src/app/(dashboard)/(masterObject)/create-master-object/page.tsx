// // app/create-master-object/page.tsx (Next.js app router)
// "use client";
// import { FieldBuilder } from "@/components/field-builder/FieldBuilder";
// import { FormPreview } from "@/components/field-builder/FormPreview";
// import { useState } from "react";


// export default function CreateMasterObjectPage() {
//   const [sections, setSections] = useState<any[]>([]);

//   return (
//     <div className="p-6 space-y-6">
//       <h1 className="text-2xl font-semibold">Create Master Object</h1>

//       {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
//         <div>
//           <FieldBuilder
//             initialSections={[]}
//             onSave={(s) => {
//               setSections(s);
//               alert("Saved master object fields (check console)");
//               console.log("Saved sections:", s);
//             }}
//           />
//         </div>

//         {/* <div>
//           <h2 className="text-lg font-semibold mb-3">Live Preview</h2>
//           <FormPreview sections={sections} />
//         </div> */}
//       {/* </div> */}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { FieldBuilder } from "@/components/field-builder/FieldBuilder";
import { FormPreview } from "@/components/field-builder/FormPreview";
import type { FormSection } from "@/components/field-builder/types/DynamicField";

export default function CreateMasterObjectPage() {
  const [sections, setSections] = useState<FormSection[]>([]);
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Create Master Object</h1>

      {!previewMode ? (
        <FieldBuilder
          initialSections={[]}
          onSave={(s) => setSections(s)}
          onPreview={(s) => {
            setSections(s);
            setPreviewMode(true);
          }}
        />
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Live Preview</h2>
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 border rounded bg-white"
            >
              Back to Builder
            </button>
          </div>

          <FormPreview sections={sections} />
        </div>
      )}
    </div>
  );
}
