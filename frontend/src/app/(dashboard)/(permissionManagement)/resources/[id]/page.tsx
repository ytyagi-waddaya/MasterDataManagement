// "use client";

// import { useMemo, useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";

// import { DataTable } from "@/components/table/data-table";
// import { Checkbox } from "@/components/ui/checkbox";

// import { useDispatch, useSelector } from "react-redux";
// import { setTotal } from "@/store/dataTableSlice";
// import { RootState } from "@/store";

// import { useResource } from "@/lib/resource/hook/useResource";
// import { useCreateRecord, useRecords } from "@/lib/masterRecord/hooks";

// import { CreateButton } from "@/components/table/create-button";
// import { RecordActions } from "@/components/RecordActions";

// import { CellContext, ColumnDef } from "@tanstack/react-table";
// import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
// import { FormRuntimePreview } from "@/components/field-builder-drag-drop/runtime/FormRuntimePreview";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { IfAllowed } from "@/store/auth";

// /* --------------------------------------------------
//    Generate Dynamic Table Columns
// -------------------------------------------------- */
// function generateColumns(fields: any[], resourceId:string, resourceKey:string): ColumnDef<any>[] {
//   return [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllRowsSelected()}
//           onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
//         />
//       ),
//       cell: ({ row }) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={() => row.toggleSelected()}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },

//     // ...fields.map((field) => ({
//     //   accessorKey: field.key,
//     //   header: field.label,
//     //   cell: ({ row }: CellContext<any, unknown>) =>
//     //     row.original?.data?.[field.key] ?? "-",
//     // })),

//     {
//       accessorKey: "code",
//       header: "code",
//       enableSorting: true,
//       enableHiding: false,
//     },

//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => {
//         const wfId =
//           row.original?.masterObject?.resources?.[0]?.workflows?.[0]?.id ??
//           null;
//         const router = useRouter();
//         return <RecordActions record={row.original}  router={router} resourceId={resourceId} resourceKey={resourceKey} workflowId={wfId}/>;
//       },
//     },
//   ];
// }

// /* --------------------------------------------------
//    PAGE
// -------------------------------------------------- */
// export default function ResourceRecordsPage() {
//   const params = useParams();
//   const resourceId = params.id as string;

//   const dispatch = useDispatch();
//   const { page, pageSize, search, sorting, filters } = useSelector(
//     (s: RootState) => s.dataTable
//   );

//   /* ---------------- Fetch resource ---------------- */
//   const { data: resourceData, isLoading: loadingResource } =
//     useResource(resourceId);

//   const masterObject = resourceData?.masterObject ?? null;

//   /* ---------------- Fetch runtime schema ---------------- */
//   const { data: runtimeObject } = useMasterObjectForRuntime(masterObject?.id);

//   /** ✅ ONLY PUBLISHED SCHEMA */
//   const publishedSchema = useMemo(() => {
//     if (!runtimeObject?.schemas) return null;
//     return (
//       runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null
//     );
//   }, [runtimeObject]);

//   /* ---------------- Runtime form state ---------------- */
//   const [formData, setFormData] = useState<Record<string, any>>({});

//   /* ---------------- List fields ---------------- */
//   const listFields = useMemo(() => {
//     if (!publishedSchema?.fieldDefinitions) return [];
//     return publishedSchema.fieldDefinitions.filter(
//       (f: any) => f.config?.ui?.showInList === true
//     );
//   }, [publishedSchema]);

//   /* ---------------- Fetch records ---------------- */
//   const { data, isLoading } = useRecords({
//     masterObjectId: masterObject?.id,
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sorting?.[0]?.id,
//     sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
//   });

//   useEffect(() => {
//     if (data?.total !== undefined) {
//       dispatch(setTotal(data.total));
//     }
//   }, [data?.total, dispatch]);

//   const key = resourceData?.key
//   const columns = useMemo(() => generateColumns(listFields, resourceId, key), [listFields]);

//   /* ---------------- Create record ---------------- */
//   const createRecord = useCreateRecord();

//   const handleSubmit = (values: Record<string, any>, close: () => void) => {
//     if (!masterObject?.id) return;

//     createRecord.mutate(
//       { masterObjectId: masterObject.id, data: values },
//       {
//         onSuccess: () => {
//           setFormData({});
//           close();
//         },
//       }
//     );
//   };

//   /* ---------------- Guards ---------------- */
//   if (loadingResource) return <div>Loading resource...</div>;
//   if (!masterObject) return <div>No master object found.</div>;

//   /* ---------------- Render ---------------- */
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">
//         {resourceData?.name} Records
//       </h2>
//       <DataTable
//         columns={columns}
//         data={data?.data ?? []}
//         total={data?.total ?? 0}
//         loading={isLoading}
//         page={page}
//         pageSize={pageSize}
//         sorting={sorting}
//         search={search}
//         filters={[
//           {
//             type: "date",
//             columnId: "createdAt",
//             title: "Created Date",
//           },
//         ]}
//         createButton={
//           <IfAllowed action="CREATE" resource={key} >
//           <TooltipProvider>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 {/* span needed so tooltip works on disabled button */}
//                 <span className="inline-block">
//                   <CreateButton
//                     triggerText="Create Record"
//                     title={`New ${resourceData?.name}`}
//                     disabled={!publishedSchema}
//                     confirmDisabled={true} // ⛔ disable confirm button
//                     size="lg"

//                     showFooter={false}
//                   >
//                     {({ close }) => (
//                       <FormRuntimePreview
//                         sections={publishedSchema?.layout.sections ?? []}
//                         fieldDefinitions={publishedSchema?.fieldDefinitions ?? []}
//                         hideDebug
//                         onSubmit={(values) => {
//                           handleSubmit(values, close); // ✅ form submits directly
//                         }}
//                       />
//                     )}
//                   </CreateButton>
//                 </span>
//               </TooltipTrigger>

//               {!publishedSchema && (
//                 <TooltipContent side="bottom">
//                   <p className="text-sm">
//                     Publish a schema to enable record creation
//                   </p>
//                 </TooltipContent>
//               )}
//             </Tooltip>
//           </TooltipProvider>
//           </IfAllowed>
//         }
//       />
//     </div>
//   );
// }

"use client";

import { useMemo, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { DataTable } from "@/components/table/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "@/store/dataTableSlice";
import { RootState } from "@/store";

import { useResource } from "@/lib/resource/hook/useResource";
import { useCreateRecord, useRecords } from "@/lib/masterRecord/hooks";
import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";

import { CreateButton } from "@/components/table/create-button";
import { RecordActions } from "@/components/RecordActions";

import { ColumnDef, CellContext } from "@tanstack/react-table";

import { FormRenderer } from "@/components/form-builder/runtime/FormRenderer";
import { normalizeMasterObjectFromBackend } from "@/components/form-builder/normalizeMasterObject";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IfAllowed } from "@/store/auth";

/* --------------------------------------------------
   TABLE COLUMNS
-------------------------------------------------- */
function generateColumns(
  fields: any[],
  resourceId: string,
  resourceKey: string,
): ColumnDef<any>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    {
      accessorKey: "code",
      header: "Code",
      enableSorting: true,
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const router = useRouter();
        const wfId =
          row.original?.masterObject?.resources?.[0]?.workflows?.[0]?.id ??
          null;

        return (
          <RecordActions
            record={row.original}
            router={router}
            resourceId={resourceId}
            resourceKey={resourceKey}
            workflowId={wfId}
          />
        );
      },
    },
  ];
}

/* --------------------------------------------------
   PAGE
-------------------------------------------------- */

export default function ResourceRecordsPage() {
  const params = useParams();
  const resourceId = params.id as string;

  const dispatch = useDispatch();
  const { page, pageSize, search, sorting, filters } = useSelector(
    (s: RootState) => s.dataTable,
  );

  const { data: resourceData, isLoading: loadingResource } =
    useResource(resourceId);

  const masterObject = resourceData?.masterObject ?? null;
  const { data: runtimeObject } = useMasterObjectForRuntime(masterObject?.id);

  const publishedSchema = useMemo(() => {
    if (!runtimeObject?.schemas) return null;
    return (
      runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null
    );
  }, [runtimeObject]);

  const normalized = useMemo(() => {
    if (!runtimeObject) return null;
    return normalizeMasterObjectFromBackend(runtimeObject, "RUNTIME");
  }, [runtimeObject]);

  const { data, isLoading } = useRecords({
    masterObjectId: masterObject?.id,
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sorting?.[0]?.id,
    sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
  });

  useEffect(() => {
    if (data?.total !== undefined) {
      dispatch(setTotal(data.total));
    }
  }, [data?.total, dispatch]);

  const createRecord = useCreateRecord();
  const listFields = useMemo(() => {
    if (!publishedSchema?.fieldDefinitions) return [];
    return publishedSchema.fieldDefinitions.filter(
      (f: any) => f.config?.ui?.showInList === true,
    );
  }, [publishedSchema]);

  const key = resourceData?.key;
  const columns = useMemo(
    () => generateColumns(listFields, resourceId, key),
    [listFields],
  );

  if (loadingResource) return <div>Loading resource...</div>;
  if (!masterObject) return <div>No master object found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        {resourceData?.name} Records
      </h2>

      <DataTable
        columns={columns}
        data={data?.data ?? []}
        total={data?.total ?? 0}
        loading={isLoading}
        page={page}
        pageSize={pageSize}
        sorting={sorting}
        search={search}
        filters={[
          {
            type: "date",
            columnId: "createdAt",
            title: "Created Date",
          },
        ]}
        createButton={
          <IfAllowed action="CREATE" resource={resourceData?.key}>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="inline-block">
                    <CreateButton
                      triggerText="Create Record"
                      title={`New ${resourceData?.name}`}
                      disabled={!publishedSchema}
                      size="lg"
                      showFooter={false}
                    >
                      {({ close }) =>
                        normalized?.schema && (
                          <>
                            <FormRenderer
                              schema={normalized.schema}
                              fields={normalized.fieldConfigs}
                              mode="CREATE"
                              onSubmit={(values) => {
                                createRecord.mutate(
                                  {
                                    masterObjectId: masterObject.id,
                                    data: values,
                                  },
                                  {
                                    onSuccess: () => close(),
                                  },
                                );
                              }}
                            />

                            {/* ✅ SUBMIT BUTTON */}
                            <div className="pt-6 border-t flex justify-end">
                              <button
                                type="submit"
                                form="runtime-form"
                                className="bg-black text-white px-6 py-2 rounded"
                              >
                                Save
                              </button>
                            </div>
                          </>
                        )
                      }
                    </CreateButton>
                  </span>
                </TooltipTrigger>

                {!publishedSchema && (
                  <TooltipContent>
                    Publish a schema to enable record creation
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </IfAllowed>
        }
      />
    </div>
  );
}

// export default function ResourceRecordsPage() {
//   const params = useParams();
//   const resourceId = params.id as string;

//   const dispatch = useDispatch();
//   const { page, pageSize, search, sorting, filters } = useSelector(
//     (s: RootState) => s.dataTable
//   );

//   /* ---------------- Resource ---------------- */
//   const { data: resourceData, isLoading: loadingResource } =
//     useResource(resourceId);

//   const masterObject = resourceData?.masterObject ?? null;

//   /* ---------------- Runtime schema ---------------- */
//   const { data: runtimeObject } = useMasterObjectForRuntime(masterObject?.id);

//   /** only published schema */
//   const publishedSchema = useMemo(() => {
//     if (!runtimeObject?.schemas) return null;
//     return runtimeObject.schemas.find((s: any) => s.status === "PUBLISHED") ?? null;
//   }, [runtimeObject]);

//   /* ---------------- Normalize (CRITICAL) ---------------- */
//   const normalized = useMemo(() => {
//     if (!runtimeObject) return null;
//     return normalizeMasterObjectFromBackend(runtimeObject, "RUNTIME");
//   }, [runtimeObject]);

//   /* ---------------- Records ---------------- */
//   const { data, isLoading } = useRecords({
//     masterObjectId: masterObject?.id,
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sorting?.[0]?.id,
//     sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
//   });

//   useEffect(() => {
//     if (data?.total !== undefined) {
//       dispatch(setTotal(data.total));
//     }
//   }, [data?.total, dispatch]);

//   const columns = useMemo(
//     () => generateColumns([], resourceId, resourceData?.key ?? ""),
//     [resourceId, resourceData?.key]
//   );

//   /* ---------------- Create record ---------------- */
//   const createRecord = useCreateRecord();

//   const handleSubmit = (values: Record<string, any>, close: () => void) => {
//     if (!masterObject?.id) return;

//     createRecord.mutate(
//       { masterObjectId: masterObject.id, data: values },
//       {
//         onSuccess: () => close(),
//       }
//     );
//   };

//   /* ---------------- Guards ---------------- */
//   if (loadingResource) return <div>Loading resource...</div>;
//   if (!masterObject) return <div>No master object found.</div>;

//   /* ---------------- Render ---------------- */
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-4">
//         {resourceData?.name} Records
//       </h2>

//       {/* <DataTable
//         columns={columns}
//         data={data?.data ?? []}
//         total={data?.total ?? 0}
//         loading={isLoading}
//         page={page}
//         pageSize={pageSize}
//         sorting={sorting}
//         search={search}
//         filters={[
//           {
//             type: "date",
//             columnId: "createdAt",
//             title: "Created Date",
//           },
//         ]}
//         createButton={
//           <IfAllowed action="CREATE" resource={resourceData?.key}>
//             <TooltipProvider>
//               <Tooltip>
//                 <TooltipTrigger asChild>
//                   <span className="inline-block">
//                     <CreateButton
//                       triggerText="Create Record"
//                       title={`New ${resourceData?.name}`}
//                       disabled={!publishedSchema}
//                       confirmDisabled
//                       size="lg"
//                       showFooter={false}
//                     >
//                       {({ close }) =>
//                         normalized?.schema && (
//                           <FormRenderer
//                             schema={normalized.schema}
//                             fields={normalized.fieldConfigs}
//                           />
//                         )
//                       }
//                     </CreateButton>
//                   </span>
//                 </TooltipTrigger>

//                 {!publishedSchema && (
//                   <TooltipContent>
//                     Publish a schema to enable record creation
//                   </TooltipContent>
//                 )}
//               </Tooltip>
//             </TooltipProvider>
//           </IfAllowed>
//         }
//       /> */}
//       createButton={
//   <IfAllowed action="CREATE" resource={resourceData?.key}>
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <span className="inline-block">
//             <CreateButton
//               triggerText="Create Record"
//               title={`New ${resourceData?.name}`}
//               disabled={!publishedSchema}
//               size="lg"
//               showFooter={false} // 👈 we control footer
//             >
//               {({ close }) =>
//                 normalized?.schema && (
//                   <>
//                     <FormRenderer
//                       schema={normalized.schema}
//                       fields={normalized.fieldConfigs}
//                       onSubmit={(values) => {
//                         createRecord.mutate(
//                           {
//                             masterObjectId: masterObject.id,
//                             data: values,
//                           },
//                           {
//                             onSuccess: () => {
//                               close(); // ✅ close modal
//                             },
//                           }
//                         );
//                       }}
//                     />

//                     {/* ✅ SUBMIT BUTTON (RIGHT PLACE) */}
//                     <div className="pt-6 border-t flex justify-end">
//                       <button
//                         type="submit"
//                         form="runtime-form"
//                         className="bg-black text-white px-6 py-2 rounded"
//                       >
//                         Save
//                       </button>
//                     </div>
//                   </>
//                 )
//               }
//             </CreateButton>
//           </span>
//         </TooltipTrigger>

//         {!publishedSchema && (
//           <TooltipContent>
//             Publish a schema to enable record creation
//           </TooltipContent>
//         )}
//       </Tooltip>
//     </TooltipProvider>
//   </IfAllowed>
// }

//     </div>
//   );
// }
