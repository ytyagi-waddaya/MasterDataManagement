// tabs/PermissionsTab.tsx
"use client";

import { TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import type { DynamicField } from "../types/DynamicField";

export function PermissionsTab({
  field,
  roles,
  onUpdate,
}: {
  field: DynamicField;
  roles: string[];
  onUpdate: (f: DynamicField) => void;
}) {
  const perms = field.permissions ?? {};

  function toggle(role: string, type: "read" | "write") {
    const list = perms[type] ?? [];
    const next = list.includes(role)
      ? list.filter((r) => r !== role)
      : [...list, role];

    onUpdate({
      ...field,
      permissions: {
        ...perms,
        [type]: next,
      },
    });
  }

  return (
    <TabsContent value="permissions" className="space-y-3">
      {roles.map((role) => (
        <div
          key={role}
          className="flex items-center justify-between border rounded p-2"
        >
          <span className="font-medium">{role}</span>
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <Checkbox
                checked={perms.read?.includes(role)}
                onCheckedChange={() =>
                  toggle(role, "read")
                }
              />
              Read
            </label>
            <label className="flex items-center gap-1">
              <Checkbox
                checked={perms.write?.includes(role)}
                onCheckedChange={() =>
                  toggle(role, "write")
                }
              />
              Write
            </label>
          </div>
        </div>
      ))}
    </TabsContent>
  );
}
