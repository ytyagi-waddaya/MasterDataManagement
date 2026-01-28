import { useFormBuilderStore } from "../../state/useFormBuilderStore";

export function PermissionTab({ field }: any) {
  const updateField = useFormBuilderStore((s) => s.updateField);
  const permissions = field.permissions ?? {};

  function update(patch: any) {
    updateField(field.meta.key, {
      permissions: { ...permissions, ...patch },
    });
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Permissions</h4>

      <input
        className="border p-2 w-full"
        placeholder="Read roles (comma separated)"
        value={(permissions.read?.roles ?? []).join(",")}
        onChange={(e) =>
          update({
            read: {
              roles: e.target.value.split(",").filter(Boolean),
            },
          })
        }
      />

      <input
        className="border p-2 w-full"
        placeholder="Write roles (comma separated)"
        value={(permissions.write?.roles ?? []).join(",")}
        onChange={(e) =>
          update({
            write: {
              roles: e.target.value.split(",").filter(Boolean),
            },
          })
        }
      />
    </div>
  );
}
