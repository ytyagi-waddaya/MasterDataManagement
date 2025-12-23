// "use client";

// import { useMemo, useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// import { DataTable } from "@/components/table/data-table";
// import { Checkbox } from "@/components/ui/checkbox";

// import { useDispatch, useSelector } from "react-redux";
// import { setTotal } from "@/store/dataTableSlice";
// import { RootState } from "@/store";

// import { useResource } from "@/lib/resource/hook/useResource";
// import { useCreateRecord, useRecords } from "@/lib/masterRecord/hooks";

// import { CreateButton } from "@/components/table/create-button";
// import { RecordActions } from "@/components/RecordActions";

// import { FormPreviewTabs } from "@/components/field-builder/preview/FormPreviewTabs";
// import { fromBackendSchema } from "@/components/field-builder/types/fromBackendSchema";

// import { CellContext, ColumnDef } from "@tanstack/react-table";

// /* --------------------------------------------------
//    Generate Dynamic Table Columns
// -------------------------------------------------- */
// function generateColumns(fields: any[], workflowId?: string): ColumnDef<any>[] {
//   const dynamicColumns: ColumnDef<any>[] = fields
//     .filter((f) => f.showInList === true)
//     .map((field) => ({
//       accessorKey: field.key,
//       header: field.label,
//       cell: ({ row }: CellContext<any, unknown>) =>
//         row.original?.data?.[field.key] ?? "-",
//     }));

//   return [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <Checkbox
//           checked={table.getIsAllRowsSelected()}
//           onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
//         />
//       ),
//       cell: ({ row }: CellContext<any, unknown>) => (
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={() => row.toggleSelected()}
//         />
//       ),
//       enableSorting: false,
//       enableHiding: false,
//     },

//     ...dynamicColumns,

//     {
//       id: "status",
//       header: "Status",
//       accessorKey: "status",
//       cell: ({ row }) => row.original?.status ?? "-",
//     },

//     {
//       id: "actions",
//       header: "Actions",
//       cell: ({ row }) => {
//         const wfId =
//           row.original?.masterObject?.resources?.[0]?.workflows?.[0]?.id ??
//           null;

//         return <RecordActions record={row.original} workflowId={wfId} />;
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

//   const sortColumn = sorting?.[0]?.id;
//   const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

//   /* ---------------- Fetch resource ---------------- */
//   const { data: resourceData, isLoading: loadingResource } =
//     useResource(resourceId);

//   const masterObject = resourceData?.masterObject ?? null;

//   /* ---------------- Resolve schema ---------------- */
//   const schema =
//     masterObject?.schemas?.find((s: any) => s.status === "PUBLISHED") ??
//     masterObject?.schemas?.[0];

//   const sections = schema?.layout ? fromBackendSchema(schema.layout) : [];

//   /* ---------------- Extract list fields ---------------- */
//   const listFields = useMemo(() => {
//     return sections.flatMap((section) =>
//       section.fields.map((f: any) => ({
//         ...f,
//         showInList: Boolean(f.showInList),
//       }))
//     );
//   }, [sections]);

//   /* ---------------- Fetch records ---------------- */
//   const { data, isLoading } = useRecords({
//     masterObjectId: masterObject?.id,
//     page,
//     limit: pageSize,
//     search,
//     filters,
//     sortBy: sortColumn,
//     sortOrder,
//   });

//   useEffect(() => {
//     if (data?.total !== undefined) {
//       dispatch(setTotal(data.total));
//     }
//   }, [data?.total, dispatch]);

//   const columns = useMemo(
//     () => generateColumns(listFields, masterObject?.workflowId),
//     [listFields]
//   );

//   /* ---------------- Create record ---------------- */
//   const createRecord = useCreateRecord();
//   const [formData, setFormData] = useState<Record<string, any>>({});

//   const handleSubmit = (close: () => void) => {
//     if (!masterObject?.id) return;

//     createRecord.mutate(
//       {
//         masterObjectId: masterObject.id,
//         data: formData,
//       },
//       {
//         onSuccess: () => {
//           setFormData({});
//           close();
//         },
//       }
//     );
//   };

//   const tableFilters = [
//     {
//       type: "date",
//       columnId: "createdAt",
//       title: "Created Date",
//     },
//   ];
//   if (loadingResource) return <div>Loading resource...</div>;
//   if (!masterObject)
//     return <div>No master object found.</div>;

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
//         filters={tableFilters}
//         createButton={
//           <CreateButton
//             triggerText="Create Record"
//             title={`New ${resourceData?.name}`}
//             onSubmit={handleSubmit}
//             onOpenReset={() => setFormData({})}
//           >
//             {() => (
//               <FormPreviewTabs
//                 sections={sections}
//                 values={formData}
//                 onChange={(key, value) =>
//                   setFormData((prev) => ({
//                     ...prev,
//                     [key]: value,
//                   }))
//                 }
//               />
//             )}
//           </CreateButton>
//         }
//       />
//     </div>
//   );
// }

"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { DataTable } from "@/components/table/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "@/store/dataTableSlice";
import { RootState } from "@/store";

import { useResource } from "@/lib/resource/hook/useResource";
import { useCreateRecord, useRecords } from "@/lib/masterRecord/hooks";

import { CreateButton } from "@/components/table/create-button";
import { RecordActions } from "@/components/RecordActions";


import { CellContext, ColumnDef } from "@tanstack/react-table";
import { useMasterObjectForRuntime } from "@/lib/masterObject/hook";
import { RuntimeForm } from "@/components/field-builder/form-renderer/RuntimeForm";
import { toRuntimeField } from "@/components/field-builder/runtime/runtimeField";

/* --------------------------------------------------
   Generate Dynamic Table Columns
-------------------------------------------------- */
function generateColumns(fields: any[], workflowId?: string): ColumnDef<any>[] {
  const dynamicColumns: ColumnDef<any>[] = fields
    .filter((f) => f.showInList === true)
    .map((field) => ({
      accessorKey: field.key,
      header: field.label,
      cell: ({ row }: CellContext<any, unknown>) =>
        row.original?.data?.[field.key] ?? "-",
    }));

  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          onCheckedChange={(v) => table.toggleAllRowsSelected(!!v)}
        />
      ),
      cell: ({ row }: CellContext<any, unknown>) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={() => row.toggleSelected()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },

    ...dynamicColumns,

    {
      id: "status",
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => row.original?.status ?? "-",
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const wfId =
          row.original?.masterObject?.resources?.[0]?.workflows?.[0]?.id ?? null;

        return <RecordActions record={row.original} workflowId={wfId} />;
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
    (s: RootState) => s.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  /* ---------------- Fetch resource ---------------- */
  const { data: resourceData, isLoading: loadingResource } =
    useResource(resourceId);

  const masterObject = resourceData?.masterObject ?? null;

  /* ---------------- Fetch runtime schema ---------------- */
  const { data: runtimeObject } = useMasterObjectForRuntime(
    masterObject?.id
  );

  const activeSchema = runtimeObject?.activeSchema ?? null;

  /* ---------------- Runtime fields ---------------- */
  const [formData, setFormData] = useState<Record<string, any>>({});

  const runtimeFields = useMemo(() => {
    if (!activeSchema?.layout) return [];

    return activeSchema.layout.map((fieldConfig: any) =>
      toRuntimeField(fieldConfig, formData)
    );
  }, [activeSchema, formData]);

  /* ---------------- Extract list fields ---------------- */
  const listFields = useMemo(() => {
    if (!activeSchema?.layout) return [];

    return activeSchema.layout.filter(
      (f: any) => f?.config?.showInList === true
    );
  }, [activeSchema]);

  /* ---------------- Fetch records ---------------- */
  const { data, isLoading } = useRecords({
    masterObjectId: masterObject?.id,
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });

  useEffect(() => {
    if (data?.total !== undefined) {
      dispatch(setTotal(data.total));
    }
  }, [data?.total, dispatch]);

  const columns = useMemo(
    () => generateColumns(listFields),
    [listFields]
  );

  /* ---------------- Create record ---------------- */
  const createRecord = useCreateRecord();

  const handleSubmit = (close: () => void) => {
    if (!masterObject?.id) return;

    createRecord.mutate(
      {
        masterObjectId: masterObject.id,
        data: formData,
      },
      {
        onSuccess: () => {
          setFormData({});
          close();
        },
      }
    );
  };

  const tableFilters = [
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

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
        filters={tableFilters}
        createButton={
          <CreateButton
            triggerText="Create Record"
            title={`New ${resourceData?.name}`}
            onSubmit={handleSubmit}
            onOpenReset={() => setFormData({})}
          >
            {() => (
              <RuntimeForm
                fields={runtimeFields}
                values={formData}
                onChange={(key, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    [key]: value,
                  }))
                }
              />
            )}
          </CreateButton>
        }
      />
    </div>
  );
}
