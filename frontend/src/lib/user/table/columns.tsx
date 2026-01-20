// src/app/users/table/columns.tsx
"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { useDispatch } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RolesDialog } from "../dialog/roles-dialog";
import { AppDispatch } from "@/store";
import { toggleRowSelection } from "@/store/dataTableSlice";
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
} from "../dialog/user-actions-dialog";
import { FormDialog } from "@/components/dialog/edit-dialog";
import { EditUserForm } from "../form/edit-user";
import {
  UpdateUserInput,
  User,
  USER_STATUS,
  USER_STATUS_COLORS,
} from "../schema/user-schema";

import {
  useArchiveUser,
  useRestoreUser,
  useDeleteUser,
  useUpdateUser,
} from "../hooks/index";
import { cn } from "@/lib/utils";
import { IfAllowed } from "@/store/auth";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    accessorFn: () => "",
    enableSorting: false,
    enableHiding: false,
    header: ({ table }) => {
      const allSelected = table.getIsAllRowsSelected();
      const someSelected = table.getIsSomeRowsSelected();

      return (
        <Checkbox
          checked={allSelected ? true : someSelected ? "indeterminate" : false}
          onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <RowCheckbox rowId={row.id} isSelected={row.getIsSelected()} />
    ),
  },
  {
    accessorKey: "name",
    header: "User",
    enableSorting: true,
    cell: ({ row }) => {
      const name = row.original.name;
      const email = row.original.email;

      const initials = name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

      return (
        <div className="flex items-center gap-3 ">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            {initials}
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-medium text-[14px]">{name}</span>
            <span className="text-sm text-muted-foreground">{email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "roles",
    header: "Roles",
    enableSorting: false,
    cell: ({ row }) => {
      const rolesArray = (row.getValue("roles") ?? []) as any[];
      const roles = rolesArray.map((r) => r.name ?? r.role?.name ?? "role");
      const visible = roles.slice(0, 4);
      const hiddenCount = Math.max(0, roles.length - 4);

      const getColor = (value: string) => {
        const action = value.split(":")[0].toLowerCase();
        switch (action) {
          case "create":
            return "bg-green-200 text-green-800";
          case "update":
            return "bg-yellow-200 text-yellow-800";
          case "delete":
            return "bg-red-200 text-red-800";
          case "read":
            return "bg-blue-200 text-blue-800";
          default:
            return "bg-gray-200 text-gray-800";
        }
      };

      return (
        <div className="max-w-[330px] whitespace-normal flex flex-wrap gap-1 p-1 ">
          {visible.map((item, index) => (
            <Badge key={index} className={`text-[12px] ${getColor(item)}`}>
              {item}
            </Badge>
          ))}
          {hiddenCount > 0 && <RolesDialog roles={roles} count={hiddenCount} />}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    enableSorting: false,
    cell: ({ row }) => {
      const status = row.getValue("status") as keyof typeof USER_STATUS_COLORS;
      const colors = USER_STATUS[status];

      return (
        <span
          className={cn(
            "inline-block px-2 py-1 text-[12px] font-medium rounded-full",
            colors.bg,
            colors.text
          )}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "type",
    header: "Type",
    enableSorting: false,
    cell: ({ row }) => {
      return (
        <span className="text-sm">{String(row.getValue("type") ?? "")}</span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    enableSorting: false,
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter();
      const user = row.original as User;
      const status = row.getValue("status") as string;
      const isActive = status === "ACTIVE";

      
      const [openArchive, setOpenArchive] = React.useState(false);
      const [openRestore, setOpenRestore] = React.useState(false);
      const [openDelete, setOpenDelete] = React.useState(false);
      const [openEdit, setOpenEdit] = React.useState(false);

      // mutation hooks
      const softDeleteUser = useArchiveUser();
      const restoreUser = useRestoreUser();
      const deleteUser = useDeleteUser();
      const updateUser = useUpdateUser();


      const handleView = () => router.push(`/user/${user.id}`);
      const handleEdit = () => setOpenEdit(true);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <EllipsisVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
 
            <DropdownMenuContent align="end">
              <IfAllowed
                action="READ"
                resource="USER"
              >
                <DropdownMenuItem onClick={handleView}>
                  <Eye className="mr-2 w-4 h-4" /> View
                </DropdownMenuItem>
              </IfAllowed>

              {isActive ? (
                <>
                  <IfAllowed
                    action="UPDATE"
                    resource="USER"
                  >
                    <DropdownMenuItem onClick={handleEdit}>
                      <Edit className="mr-2 w-4 h-4" /> Edit
                    </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed
                    action="ARCHIVE"
                    resource="USER"
                  >
                    <DropdownMenuItem onClick={() => setOpenArchive(true)}>
                      <Archive className="mr-2 w-4 h-4" /> Archive
                    </DropdownMenuItem>
                  </IfAllowed>
                </>
              ) : (
                <>
                  <IfAllowed
                    action="RESTORE"
                    resource="USER"
                  >
                    <DropdownMenuItem onClick={() => setOpenRestore(true)}>
                      <RotateCcw className="mr-2 w-4 h-4" /> Restore
                    </DropdownMenuItem>
                  </IfAllowed>
                  <IfAllowed
                    action="DELETE"
                    resource="USER"
                  >
                    <DropdownMenuItem onClick={() => setOpenDelete(true)}>
                      <Trash2 className="mr-2 w-4 h-4" /> Delete
                    </DropdownMenuItem>
                  </IfAllowed>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <ArchiveDialog
            open={openArchive}
            onOpenChange={setOpenArchive}
            userName={user.name}
            onConfirm={() =>
              softDeleteUser.mutate(user.id, {
                onSuccess: () => setOpenArchive(false),
              })
            }
          />

          <RestoreDialog
            open={openRestore}
            onOpenChange={setOpenRestore}
            userName={user.name}
            onConfirm={() =>
              restoreUser.mutate(user.id, {
                onSuccess: () => setOpenRestore(false),
              })
            }
          />

          <DeleteDialog
            open={openDelete}
            onOpenChange={setOpenDelete}
            userName={user.name}
            onConfirm={() =>
              deleteUser.mutate(user.id, {
                onSuccess: () => setOpenDelete(false),
              })
            }
          />

          <FormDialog<UpdateUserInput>
            open={openEdit}
            onOpenChange={setOpenEdit}
            title="Edit User"
            description="Modify user details and system assignment."
            initialValues={{
              name: user.name,
              type: user.type,
              status: user.status,
              department: user.department ?? null,
              location: user.location ?? null,
            }}
            onSave={(data) =>{
              console.log("[FormDialog] onSave called:", data)
              updateUser.mutate(
                {
                  userId: user.id,
                  payload: data,
                },

                { onSuccess: () => setOpenEdit(false) }
              )}
            }
            FormComponent={EditUserForm}
            disabled={false}
          />
        </>
      );
    },
  },
];

const RowCheckbox: React.FC<{ rowId: string; isSelected: boolean }> = ({
  rowId,
  isSelected,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <Checkbox
      checked={isSelected}
      onCheckedChange={() => dispatch(toggleRowSelection(rowId))}
      aria-label="Select row"
    />
  );
};
