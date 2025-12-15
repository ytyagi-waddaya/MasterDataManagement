"use client";

import { useMemo, useState, useEffect } from "react";
import { useParams } from "next/navigation";

import { DataTable } from "@/components/table/data-table";
import { Checkbox } from "@/components/ui/checkbox";

import { useDispatch, useSelector } from "react-redux";
import { setTotal } from "@/store/dataTableSlice";
import { RootState } from "@/store";

import { useResource } from "@/lib/resource/hook/useResource";

import { CreateButton } from "@/components/table/create-button";
import { MasterRecordForm } from "@/components/MasterRecordForm";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { RecordActions } from "@/components/RecordActions";
import { useCreateRecord, useRecords } from "@/lib/masterRecord/hooks";

// --------------------------------------------------
// Generate Dynamic Table Columns
// --------------------------------------------------
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
      enableSorting: true,
      enableHiding: false,
      accessorKey: "status",
      cell: ({ row }) => row.original?.status ?? "-",
    },
    {
      id: "actions",
      header: "Actions",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        const wfId =
          row.original?.masterObject?.resources?.[0]?.workflows?.[0]?.id ??
          null;

        return <RecordActions record={row.original} workflowId={wfId} />;
      },
    },
  ];
}

export default function ResourceRecordsPage() {
  const params = useParams();
  const resourceId = params.id as string;

  const dispatch = useDispatch();
  const { page, pageSize, search, sorting, filters } = useSelector(
    (s: RootState) => s.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  // Fetch resource
  const { data: resourceData, isLoading: loadingResource } =
    useResource(resourceId);

  const masterObject = resourceData?.masterObject ?? null;

  // Extract master object fields
  let fields: any[] = [];

  if (masterObject?.fields && typeof masterObject.fields === "object") {
    const rawSet = (masterObject.fields as any).set;

    if (Array.isArray(rawSet)) {
      fields = rawSet.flatMap((section) =>
        Array.isArray(section.fields) ? section.fields : []
      );
    }
  }

  // default showInList flag
  fields = fields.map((f) => ({
    showInList: false,
    ...f,
  }));

  // Fetch records using updated hook
  const { data, isLoading } = useRecords({
    masterObjectId: masterObject?.id,
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });

  // Update total rows for pagination
  useEffect(() => {
    if (data?.total !== undefined) {
      dispatch(setTotal(data.total));
    }
  }, [data?.total]);

  // Build table columns
  const columns = useMemo(() => {
    const cols = generateColumns(fields, masterObject?.workflowId);
    return cols;
  }, [fields]);

  // Create record state + submit logic
  const createRecord = useCreateRecord();
  const [formData, setFormData] = useState<Record<string, any>>({});

  const setValue = (key: string, value: any) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (close: () => void) => {
    if (!masterObject?.id) {
      return;
    }

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

  // Loading + error states
  if (loadingResource) return <div>Loading resource...</div>;
  if (!masterObject) {
    return <div>No master object found.</div>;
  }

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
              <MasterRecordForm
                fields={fields}
                formData={formData}
                setValue={setValue}
              />
            )}
          </CreateButton>
        }
      />
    </div>
  );
}
