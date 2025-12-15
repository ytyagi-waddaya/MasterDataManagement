"use client";

export interface Action {
  id: string;
  name: string;
  description?: string | null;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  createdBy: string;
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  useActions,
  useCreateAction,
  useBulkArchiveActions,
  useBulkRestoreActions,
  useBulkDeleteActions,
} from "../hooks/index";
import { DataTable } from "@/components/table/data-table";
import { isActive, systemOptions } from "./filter";

import { setTotal } from "@/store/dataTableSlice";
import { CreateButton } from "@/components/table/create-button";
import { actionColumns } from "./column";
import { ActionForm } from "../form/create-action";
import { createActionSchema } from "../schema/action-schema";
import { useZodForm } from "@/hooks/useZodForm";

export default function ActionsTable() {
  const dispatch = useDispatch();
  const createAction = useCreateAction();
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(createActionSchema, {
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

  const { data, isLoading } = useActions({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });
  React.useEffect(() => {
    if (data?.actions) {
      dispatch(setTotal(data.actions.total));
    }
  }, [data?.actions?.total, dispatch]);

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
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  const handleSubmit = (close: () => void) => {
    const validation = validateForm();
    if (!validation.success) return;

    createAction.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  return (
    <DataTable
      columns={actionColumns}
      data={data?.actions?.data ?? []}
      total={data?.actions?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <CreateButton
          triggerText="Add Action"
          title="Create New Action"
          onSubmit={handleSubmit}
          onOpenReset={reset}
        >
          {({ close }) => (
            <ActionForm
              form={form}
              errors={errors}
              touched={touched}
              setValue={setValue}
              onBlur={onBlur}
            />
          )}
        </CreateButton>
      }
      onBulkArchive={(ids) => useBulkArchiveActions().mutate(ids)}
      onBulkRestore={(ids) => useBulkRestoreActions().mutate(ids)}
      onBulkDelete={(ids) => useBulkDeleteActions().mutate(ids)}
    />
  );
}
