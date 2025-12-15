"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface RolesDialogProps {
  roles: string[];
  count: number;
}

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

export function RolesDialog({ roles, count }: RolesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Badge variant="outline" className="text-[10px] cursor-pointer">
          +{count} more
        </Badge>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>All Roles</DialogTitle>
        </DialogHeader>

        <div className="flex flex-wrap gap-2 mt-2">
          {roles.map((r, index) => (
            <Badge key={index} className={`text-xs ${getColor(r)}`}>
              {r}
            </Badge>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
