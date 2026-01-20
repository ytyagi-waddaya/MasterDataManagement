"use client";

export interface Permission {
  id: string;
  key: string;
  name: string;
  description: string | null;
  isActive: boolean;
  isSystem: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  action: {
    id: string;
    key: string;
    name: string;
    description: string | null;
    isActive: boolean;
    isSystem: boolean;
    category: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };

  resource: {
    id: string;
    key: string;
    name: string;
    description: string | null;
    isActive: boolean;
    isSystem: boolean;
    moduleId: string;
    category: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;

    module: {
      id: string;
      key: string;
      name: string;
      description: string | null;
      isActive: boolean;
      isSystem: boolean;
      createdAt: string;
      updatedAt: string;
      deletedAt: string | null;
    };
  };
}

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  usePermissions,
  useBulkArchivePermissions,
  useBulkRestorePermissions,
  useBulkDeletePermissions,
  useGeneratePermissions,
} from "../hooks/index";
import { DataTable } from "@/components/table/data-table";
import { isActive, systemOptions } from "./filter";

import { setTotal } from "@/store/dataTableSlice";
import { CreateButton } from "@/components/table/create-button";
import { permissionColumns } from "./column";
import { useModuleList } from "@/lib/module/hook/useModule";
import { useResourceList } from "@/lib/resource/hook";
import { useActionList } from "@/lib/action/hooks";
import IfAllowed from "@/store/auth/IfAllowed";

export default function PermissionsTable() {
  const dispatch = useDispatch();

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const sortColumn = sorting?.[0]?.id;
  const sortOrder = sorting?.[0]?.desc ? "desc" : "asc";

  const { data, isLoading } = usePermissions({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sortColumn,
    sortOrder,
  });
  
  React.useEffect(() => {
    if (data?.permissions) {
      dispatch(setTotal(data.permissions.total));
    }
  }, [data?.permissions?.total, dispatch]);

  const generatePermissions = useGeneratePermissions();
  const { data: modules = [] } = useModuleList();
  const { data: resources = [] } = useResourceList();
  const { data: actions = [] } = useActionList();

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
      options: modules,
    },
    {
      type: "single",
      columnId: "resourceId",
      title: "Resouce",
      options: resources,
    },
    {
      type: "single",
      columnId: "actionId",
      title: "Action",
      options: actions,
    },
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  return (
    <DataTable
      columns={permissionColumns}
      data={data?.permissions?.data ?? []}
      total={data?.permissions?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <IfAllowed action="CREATE" resource="PERMISSION" >
        <CreateButton
          triggerText="Generate Permissions"
          title="Generate All Permissions"
          onSubmit={(close) => {
            generatePermissions.mutate(undefined, {
              onSuccess: () => {
                close();
              },
            });
          }}
          confirmDisabled={generatePermissions.isPending}
        >
          {() => (
            <div className="p-3 text-sm text-muted-foreground">
              This will automatically generate all system-defined permissions.
            </div>
          )}
        </CreateButton>
        </IfAllowed>
      }
      onBulkArchive={(ids) => useBulkArchivePermissions().mutate(ids)}
      onBulkRestore={(ids) => useBulkRestorePermissions().mutate(ids)}
      onBulkDelete={(ids) => useBulkDeletePermissions().mutate(ids)}
    />
  );
}
