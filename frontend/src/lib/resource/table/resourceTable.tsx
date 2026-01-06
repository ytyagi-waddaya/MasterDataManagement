"use client";

export interface Resource {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  createdBy: string;

  moduleId: string | null;
  module: {
    id: string;
    name: string;
  } | null;
}


import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useResources,
  useCreateResource,
  useBulkArchiveResources,
  useBulkRestoreResources,
  useBulkDeleteResources,
} from "../hook/index";
import { DataTable } from "@/components/table/data-table";
import { isActive, systemOptions } from "./filter";

import { setTotal } from "@/store/dataTableSlice";
import { CreateButton } from "@/components/table/create-button";
import { resourceColumns } from "./column";
import { ResourceForm } from "../form/create-resource";
import { createResourceSchema } from "../schema/resource-schema";
import { useZodForm } from "@/hooks/useZodForm";
import { useModuleList } from "@/lib/module/hook/useModule";

export default function ResourcesTable() {
  const dispatch = useDispatch();
  const createResource = useCreateResource();
  const { data: modules = [] } = useModuleList();

  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(createResourceSchema, {
      name: "",
      codePrefix: "",
      description: "",
      isActive: true,
      isSystem: false,
      moduleId: "",
    });

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  const { data, isLoading } = useResources({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });
  React.useEffect(() => {
    if (data?.resources) {
      dispatch(setTotal(data.resources.total));
    }
  }, [data?.resources?.total, dispatch]);

  const tableFilters = [
    {
      type: "single",
      columnId: "isActive",
      title: "Status",
      options: isActive,
    },
    {
      type: "single",
      columnId: "isSystem",
      title: "System Type",
      options: systemOptions,
    },
    {
      type: "single",
      columnId: "moduleId",
      title: "Module",
      options:modules
    },
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  const handleSubmit = (close: () => void) => {
    const validation = validateForm();
    if (!validation.success) return;

    createResource.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  return (
    <DataTable
      columns={resourceColumns}
      data={data?.resources?.data ?? []}
      total={data?.resources?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <CreateButton
          triggerText="Add Resource"
          title="Create New Resource"
          onSubmit={handleSubmit}
          onOpenReset={reset}
        >
          {({ close }) => (
            <ResourceForm
              form={form}
              errors={errors}
              touched={touched}
              setValue={setValue}
              onBlur={onBlur}
              modules={modules}
            />
          )}
        </CreateButton>
      }
      onBulkArchive={(ids) => useBulkArchiveResources().mutate(ids)}
      onBulkRestore={(ids) => useBulkRestoreResources().mutate(ids)}
      onBulkDelete={(ids) => useBulkDeleteResources().mutate(ids)}
    />
  );
}
