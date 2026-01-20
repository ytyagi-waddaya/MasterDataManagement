"use client";

export interface Module {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  createdBy: string;
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useModules,
  useCreateModule,
  useBulkArchiveModules,
  useBulkRestoreModules,
  useBulkDeleteModules,
} from "../hook/index";
import { DataTable } from "@/components/table/data-table";
import { isActive, systemOptions } from "./filter";

import { setTotal } from "@/store/dataTableSlice";
import { CreateButton } from "@/components/table/create-button";
import { moduleColumns } from "./column";
import { createModuleSchema } from "../schema/module-schema";
import { useZodForm } from "@/hooks/useZodForm";
import { ModuleForm } from "../form/create-module";
import { IfAllowed } from "@/store/auth";
import { useModuleRealtime } from "@/realtime/useModuleRealtime";

export default function ModulesTable() {
  useModuleRealtime();
  const dispatch = useDispatch();
  const createModule = useCreateModule();
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(createModuleSchema, {
      name: "",
      description: "",
      isActive: true,
      isSystem: false,
    });

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  const { data, isLoading } = useModules({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });
  React.useEffect(() => {
    if (data?.modules) {
      dispatch(setTotal(data.modules.total));
    }
  }, [data?.modules?.total, dispatch]);

  const tableFilters = [
    {
      type: "single",
      columnId: "isActive",
      title: "Status",
      options: isActive,
    },
    {
      type: "multi",
      columnId: "isSystem",
      title: "System Type",
      options: systemOptions,
    },
    {
      type: "date-advanced",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  const handleSubmit = (close: () => void) => {
    const validation = validateForm();
    if (!validation.success) return;

    createModule.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  // const handleCreateModule = (payload: any, close: () => void) => {
  //   createModule.mutate(payload, {
  //     onSuccess: () => {
  //       close();
  //     },
  //   });
  // };

  return (
    <DataTable
      columns={moduleColumns}
      data={data?.modules?.data ?? []}
      total={data?.modules?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <IfAllowed action="CREATE" resource="MODULE">
        <CreateButton
          triggerText="Add Module"
          title="Create New Module"
          onSubmit={handleSubmit}
          onOpenReset={reset}
        >
          {({ close }) => (
            <ModuleForm
              form={form}
              errors={errors}
              touched={touched}
              setValue={setValue}
              onBlur={onBlur}
            />
          )}
        </CreateButton>
        </IfAllowed>
      }
      onBulkArchive={(ids) => useBulkArchiveModules().mutate(ids)}
      onBulkRestore={(ids) => useBulkRestoreModules().mutate(ids)}
      onBulkDelete={(ids) => useBulkDeleteModules().mutate(ids)}
    />
  );
}
