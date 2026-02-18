"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Archive,
  Edit,
  EllipsisVertical,
  Eye,
  RotateCcw,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  ArchiveDialog,
  DeleteDialog,
  RestoreDialog,
} from "../dialog/department-actions-dialog";

import { FormDialog } from "@/components/dialog/edit-dialog";
import { EditDepartmentForm } from "../form/edit-department";

import {
  useArchiveDepartment,
  useRestoreDepartment,
  useDeleteDepartment,
  useUpdateDepartment,
} from "../hooks/useDepartment";

import { Department } from "../schema/department-schema";
import { IfAllowed } from "@/store/auth";

export const departmentColumns: ColumnDef<Department>[] = [
  {
    accessorKey: "name",
    header: "Department",
  },
  {
    accessorKey: "code",
    header: "Code",
  },

  {
    accessorKey: "departmentRoles",
    header: "Roles",
    enableSorting: false,
    cell: ({ row }) => {
      const rolesArray = (row.getValue("departmentRoles") ?? []) as any[];

      const roles = rolesArray.map((r) => r.role?.name ?? "ROLE");

      const visible = roles.slice(0, 4);
      const hiddenCount = Math.max(0, roles.length - 4);

      return (
        <div className="flex flex-wrap gap-1 max-w-[300px]">
          {visible.map((role, index) => (
            <Badge
              key={index}
              className="bg-blue-200 text-blue-800 text-xs"
            >
              {role}
            </Badge>
          ))}

          {hiddenCount > 0 && (
            <Badge variant="outline" className="text-xs">
              +{hiddenCount} more
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;

      return (
        <span
          className={`inline-block px-2 py-1 text-[12px] font-medium rounded-full ${status === "ACTIVE"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-700"
            }`}
        >
          {status}
        </span>
      );
    },
  },

  // 🔥 ACTION COLUMN
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const router = useRouter();
      const department = row.original;
      const isActive = department.status === "ACTIVE";

      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      const archiveDepartment = useArchiveDepartment();
      const restoreDepartment = useRestoreDepartment();
      const deleteDepartment = useDeleteDepartment();
      const updateDepartment = useUpdateDepartment();

      const handleView = () =>
        router.push(`/department/${department.id}`);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

              <IfAllowed action="READ" resource="DEPARTMENT">
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="mr-2 w-4 h-4" /> View
                </DropdownMenuItem>
              </IfAllowed>

              {isActive ? (
                <>
                  <IfAllowed action="UPDATE" resource="DEPARTMENT">
                    <DropdownMenuItem onClick={() => setOpenEdit(true)}>
                      <Edit className="mr-2 w-4 h-4" /> Edit
                    </DropdownMenuItem>
                  </IfAllowed>

                  <IfAllowed action="ARCHIVE" resource="DEPARTMENT">
                    <DropdownMenuItem onClick={() => setOpenArchive(true)}>
                      <Archive className="mr-2 w-4 h-4" /> Archive
                    </DropdownMenuItem>
                  </IfAllowed>
                </>
              ) : (
                <>
                  <IfAllowed action="RESTORE" resource="DEPARTMENT">
                    <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                      <RotateCcw className="mr-2 w-4 h-4" /> Restore
                    </DropdownMenuItem>
                  </IfAllowed>

                  <IfAllowed action="DELETE" resource="DEPARTMENT">
                    <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                      <Trash2 className="mr-2 w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </IfAllowed>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Archive Dialog */}
          <ArchiveDialog
            open={openArchive}
            onOpenChange={setOpenArchive}
            departmentName={department.name}
            onConfirm={() =>
              archiveDepartment.mutate(department.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          {/* Restore Dialog */}
          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            departmentName={department.name}
            onConfirm={() =>
              restoreDepartment.mutate(department.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          {/* Delete Dialog */}
          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            departmentName={department.name}
            onConfirm={() =>
              deleteDepartment.mutate(department.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />

          {/* Edit Dialog */}
          <FormDialog
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit Department"
            description="Modify department details."
            initialValues={{
              name: department.name,
              code: department.code,
              status: department.status,
            }}
            onSave={(data) =>
              updateDepartment.mutate(
                {
                  departmentId: department.id,
                  payload: data,
                },
                { onSuccess: () => setOpenEdit(false) }
              )
            }
            FormComponent={EditDepartmentForm}
          />
        </>
      );
    },
  },
];
