"use client";

export interface Role {
  id: string; 
  name: string;
  description?: string;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  createdBy: string;
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  useCreateRole,
  useRoles,
  useBulkArchiveRoles,
  useBulkRestoreRoles,
  useBulkDeleteRoles,
} from "../hooks/index";

import { DataTable } from "@/components/table/data-table";
import { roleColumns } from "../table/columns";

import { isActive, systemOptions } from "./filter";
import { setTotal } from "@/store/dataTableSlice";

import { CreateButton } from "@/components/table/create-button";
import { RoleForm } from "../form/create-role";
import { createRoleSchema } from "../schema/role-schema";
import { useZodForm } from "@/hooks/useZodForm";
import IfAllowed from "@/store/auth/IfAllowed";

export default function RolesTable() {
  const dispatch = useDispatch();
  const createRole = useCreateRole();

  const { form, errors, touched, setValue, onBlur, validateForm, reset } = useZodForm(
    createRoleSchema,
    {
      name: "",
      description: "",
      isActive: true,
      isSystem: false,
    }
  );

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const { data, isLoading } = useRoles({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sorting?.[0]?.id,
    sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
  });

  useEffect(() => {
    if (data?.roles) dispatch(setTotal(data.roles.total));
  }, [data?.roles?.total, dispatch]);

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

    createRole.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  return (
    <DataTable
      columns={roleColumns}
      data={data?.roles?.data ?? []} 
      total={data?.roles?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <IfAllowed action="CREATE" resource="ROLE" >
        <CreateButton
          triggerText="Add Role"
          title="Create New Role"
          onSubmit={handleSubmit}
          onOpenReset={reset}
        >
          {({ close }) => (
            <RoleForm
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
      onBulkArchive={(ids) => useBulkArchiveRoles().mutate(ids)}
      onBulkRestore={(ids) => useBulkRestoreRoles().mutate(ids)}
      onBulkDelete={(ids) => useBulkDeleteRoles().mutate(ids)}
    />
  );
}
