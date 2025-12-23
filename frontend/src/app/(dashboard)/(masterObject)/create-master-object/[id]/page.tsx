// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { FieldBuilder } from "@/components/field-builder/FieldBuilder";
// import type { FormSection } from "@/components/field-builder/types/DynamicField";
// import {
//   useUpdateMasterObject,
//   useMasterObject,
// } from "@/lib/masterObject/hook";
// import { Button } from "@/components/ui/button";
// import { ChevronLeft } from "lucide-react";
// import { useRoleList } from "@/lib/role/hooks";
// import { fromBackendSchema } from "@/components/field-builder/types/fromBackendSchema";
// import { buildFieldConfig } from "@/components/field-builder/schemaNormalizer";

// export default function CreateMasterObjectPage() {
//   const params = useParams<{ id: string }>();
//   const masterObjectId = params.id;

//   const { data: masterObjectData, isLoading } = useMasterObject(masterObjectId);

//   const updateMasterObject = useUpdateMasterObject();
//   const { data: rolesData } = useRoleList();

//   const roles = rolesData?.map((r: any) => r.key) ?? [];

//   const [sections, setSections] = useState<FormSection[]>([]);
//   const [initialized, setInitialized] = useState(false);

//   useEffect(() => {
//     if (initialized) return;
//     if (!masterObjectData?.schemas?.length) return;

//     const schema =
//       masterObjectData.schemas.find((s: any) => s.status === "DRAFT") ??
//       masterObjectData.schemas.find((s: any) => s.status === "PUBLISHED");

//     if (schema?.layout) {
//       setSections(fromBackendSchema(schema.layout));
//       setInitialized(true);
//     }
//   }, [masterObjectData, initialized]);

//   /* ----------------------------------------------------
//      SAVE DRAFT
//   ---------------------------------------------------- */
//   function handleSave(sections: FormSection[]) {
//      const schema = buildFieldConfig(sections);
//     updateMasterObject.mutate(
//       {
//         masterObjectId,
//         payload: {
//           schema,
//           publish: false,
//         },
//       },
//       {
//         onSuccess: () => setSections(sections),
//       }
//     );
//   }

//   /* ----------------------------------------------------
//      PUBLISH
//   ---------------------------------------------------- */
//   function handlePublish(sections: FormSection[]) {
//      const schema = buildFieldConfig(sections);
//     updateMasterObject.mutate(
//       {
//         masterObjectId,
//         payload: {
//           schema,
//           publish: true,
//         },
//       },
//       {
//         onSuccess: () => setSections(sections),
//       }
//     );
//   }

//   if (isLoading) return <div>Loading...</div>;

//   return (
//     <div className="p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center gap-2">
//         <Button
//           className="h-8 w-8"
//           onClick={() => window.history.back()}
//           variant="outline"
//         >
//           <ChevronLeft />
//         </Button>

//         <h1 className="text-2xl font-semibold">Edit Master Object Fields</h1>
//       </div>

//       {/* Form Builder */}
//       <FieldBuilder
//         initialSections={sections}
//         userRoles={roles}
//         onSave={handleSave}
//         onPublish={handlePublish}
//       />
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { FieldBuilder } from "@/components/field-builder/FieldBuilder";
import type { FormSection } from "@/components/field-builder/types/DynamicField";

import {
  useMasterObjectForEditor,
  useUpdateMasterObject,
} from "@/lib/masterObject/hook";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

import { useRoleList } from "@/lib/role/hooks";
import { fromBackendSchema } from "@/components/field-builder/types/fromBackendSchema";
import { buildFieldConfig } from "@/components/field-builder/schemaNormalizer";

export default function CreateMasterObjectPage() {
  const params = useParams<{ id: string }>();
  const masterObjectId = params.id;

  /* =====================================================
     EDITOR DATA (DRAFT + PUBLISHED)
  ===================================================== */

  const { data: masterObjectData, isLoading } =
    useMasterObjectForEditor(masterObjectId);

  const updateMasterObject = useUpdateMasterObject();
  const { data: rolesData } = useRoleList();

  const roles = rolesData?.map((r: any) => r.key) ?? [];

  const [sections, setSections] = useState<FormSection[]>([]);
  const [initialized, setInitialized] = useState(false);

  /* =====================================================
     INITIALIZE SECTIONS FROM SCHEMA
     Priority: DRAFT → PUBLISHED
  ===================================================== */

  useEffect(() => {
    if (initialized) return;
    if (!masterObjectData?.schemas?.length) return;

    const draftSchema = masterObjectData.schemas.find(
      (s: any) => s.status === "DRAFT"
    );

    const publishedSchema = masterObjectData.schemas.find(
      (s: any) => s.status === "PUBLISHED"
    );

    const activeSchema = draftSchema ?? publishedSchema;

    if (activeSchema?.layout) {
      setSections(fromBackendSchema(activeSchema.layout));
      setInitialized(true);
    }
  }, [masterObjectData, initialized]);

  /* =====================================================
     SAVE DRAFT
  ===================================================== */

  function handleSave(updatedSections: FormSection[]) {
    const schema = buildFieldConfig(updatedSections);

    updateMasterObject.mutate(
      {
        masterObjectId,
        payload: {
          schema,
          publish: false,
        },
      },
      {
        onSuccess: () => {
          setSections(updatedSections);
        },
      }
    );
  }

  /* =====================================================
     PUBLISH SCHEMA
  ===================================================== */

  function handlePublish(updatedSections: FormSection[]) {
    const schema = buildFieldConfig(updatedSections);

    updateMasterObject.mutate(
      {
        masterObjectId,
        payload: {
          schema,
          publish: true,
        },
      },
      {
        onSuccess: () => {
          setSections(updatedSections);
        },
      }
    );
  }

  if (isLoading) return <div>Loading...</div>;
  if (!masterObjectData) return <div>Master object not found</div>;

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Button
          className="h-8 w-8"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <h1 className="text-2xl font-semibold">
          Edit Master Object Fields
        </h1>
      </div>

      {/* Field Builder (EDITOR MODE) */}
      <FieldBuilder
        initialSections={sections}
        userRoles={roles}
        onSave={handleSave}
        onPublish={handlePublish}
      />
    </div>
  );
}
