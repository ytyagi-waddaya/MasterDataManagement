"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";



import { DataTable } from "@/components/table/data-table";


import { setTotal } from "@/store/dataTableSlice";

import { CreateButton } from "@/components/table/create-button";

import {
  createWorkflowSchema,
} from "../schema/workflow-schema";

import { useZodForm } from "@/hooks/useZodForm";
import { useCreateWorkflow, useWorkflows } from "../hooks";
import { isActive } from "./filters";
import { workflowColumns } from "./column";
import { useResourceList } from "@/lib/resource/hook";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function WorkflowsTable() {
  const dispatch = useDispatch();
const router = useRouter()
  // --- Mutations ---
  const createWorkflow = useCreateWorkflow();

  // --- Form State & Validation ---
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(createWorkflowSchema, {
      name: "",
      description: "",
      resourceId: "",
      isActive:true,
    });

  // --- Redux DataTable State ---
  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  // --- Query Workflows ---
  const { data, isLoading } = useWorkflows({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sorting?.[0]?.id,
    sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
  });

   useEffect(() => {
    if (data?.workflows) dispatch(setTotal(data.workflows.total));
  }, [data?.workflows?.total, dispatch])

    // const [sortColumn] = useState("createdAt");
    // const [sortOrder] = useState<"asc" | "desc">("desc");

    // const { data: roleData } = useRoles({
    //   page,
    //   limit: 100,
    //   search,
    //   filters,
    //   sortBy: sortColumn,
    //   sortOrder,
    // });
  
    // const roles = roleData?.roles.data ?? [];
    const { data: resources = [] } = useResourceList();

  // --- Table Filters ---
  const tableFilters = [
    {
      type: "single",
      columnId: "isActive",
      title: "Status",
      options: isActive,
    },
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  // --- Create Workflow Handler ---
  const handleSubmit = (close: () => void) => {
    const validation = validateForm();

    if (!validation.success) return;


    createWorkflow.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      }
    });
  };

  return (
    <DataTable
      columns={workflowColumns}
      data={data?.workflows?.data ?? []}
      total={data?.workflows?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      // createButton={
      //   <CreateButton
      //     triggerText="Add Workflow"
      //     title="Create Workflow"
      //     size="lg"
      //     onSubmit={handleSubmit}
      //     onOpenReset={reset}
      //   >
      //     {({ close }) => (
      //       <WorkflowForm
      //         form={form}
      //         errors={errors}
      //         touched={touched}
      //         setValue={setValue}
      //         onBlur={onBlur}
      //         resources={resources}
      //       />
      //     )}
      //   </CreateButton>
      // }
            createButton={
        <Button
          onClick={() => router.push("/create-workflow")}
          className="ml-auto"
        >
          Add Workflow
        </Button>
      }
    />
  );
}
