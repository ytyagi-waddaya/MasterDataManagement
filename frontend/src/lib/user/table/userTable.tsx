"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  useCreateUser,
  useUsers,
  useBulkArchiveUsers,
  useBulkRestoreUsers,
  useBulkDeleteUsers,
} from "../hooks/index";

import { DataTable } from "@/components/table/data-table";
import { userColumns } from "../table/columns";

import { status as statusOptions, type as typeOptions } from "./filter";
import { setTotal } from "@/store/dataTableSlice";

import { CreateButton } from "@/components/table/create-button";
import { UserForm } from "../form/create-user";
import {
  createUserSchema,
  USER_STATUS_COLORS,
  UserStatusKey,
} from "../schema/user-schema";
import { useZodForm } from "@/hooks/useZodForm";
import { IfAllowed } from "@/store/auth";

export default function UsersTable() {
  const dispatch = useDispatch();
  const createUser = useCreateUser();

  const bulkArchive = useBulkArchiveUsers();
  const bulkRestore = useBulkRestoreUsers();
  const bulkDelete = useBulkDeleteUsers();

  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(createUserSchema, {
      name: "",
      email: "",
      password: "",
      type: "INTERNAL",
      department: "",
      location: "",
    });

  const { page, pageSize, search, sorting, filters } = useSelector(
    (state: RootState) => state.dataTable
  );

  const { data, isLoading } = useUsers({
    page,
    limit: pageSize,
    search,
    filters,
    sortBy: sorting?.[0]?.id,
    sortOrder: sorting?.[0]?.desc ? "desc" : "asc",
  });

  useEffect(() => {
    if (data?.users) dispatch(setTotal(data.users.total));
  }, [data?.users?.total, dispatch]);

  const tableFilters = [
    {
      type: "single",
      columnId: "status",
      title: "Status",
      options: statusOptions,
    },
    {
      type: "single",
      columnId: "type",
      title: "Type",
      options: typeOptions,
    },
    {
      type: "date",
      columnId: "createdAt",
      title: "Created Date",
    },
  ];

  const handleSubmit = (close: () => void) => {
    const validation = validateForm();

    if (!validation.success) {
      return;
    }

    createUser.mutate(validation.data, {
      onSuccess: () => {
        reset();
        close();
      },
    });
  };

  // Bulk handlers: call the mutation's mutate method
  const handleBulkArchive = (ids: string[]) => bulkArchive.mutate(ids);
  const handleBulkRestore = (ids: string[]) => bulkRestore.mutate(ids);
  const handleBulkDelete = (ids: string[]) => bulkDelete.mutate(ids);

  return (
    <DataTable
      columns={userColumns}
      data={data?.users?.data ?? []}
      total={data?.users?.total ?? 0}
      loading={isLoading}
      page={page}
      pageSize={pageSize}
      sorting={sorting}
      search={search}
      filters={tableFilters}
      createButton={
        <IfAllowed action="CREATE" resource="USER" >
          <CreateButton
            triggerText="Add User"
            title="Create New User"
            size="lg"
            onSubmit={handleSubmit}
            onOpenReset={reset}
          >
            {({ close }) => (
              <UserForm
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
      rowClassName={(row) => {
        const status = row.status as UserStatusKey;
        return USER_STATUS_COLORS[status] ?? "";
      }}
      onBulkArchive={handleBulkArchive}
      onBulkRestore={handleBulkRestore}
      onBulkDelete={handleBulkDelete}
    />
  );
}
