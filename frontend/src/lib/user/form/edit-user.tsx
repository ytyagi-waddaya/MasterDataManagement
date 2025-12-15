// "use client";

// import * as React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { UpdateUserInput, updateUserSchema } from "../schema/user-schema";
// import { useZodForm } from "@/hooks/useZodForm";

// interface Props {
//   initialValues: UpdateUserInput;
//   onSubmit: (data: UpdateUserInput) => void;
//   onClose: () => void;
//   disabled?: boolean;
// }

// export const EditUserForm: React.FC<Props> = ({ initialValues, onSubmit, onClose, disabled }) => {
//   const { form, errors, touched, setValue, onBlur, validateForm, reset } = useZodForm(updateUserSchema, initialValues);

//   React.useEffect(() => {
//     reset();
//   }, [initialValues, reset]);

//   const handleSave = () => {
//     const result = validateForm();
//     if (!result.success) return;
//     onSubmit(result.data);
//     onClose();
//   };

//   return (
//     <div className="space-y-5 py-2">
//       <div className="space-y-2">
//         <Label htmlFor="name">Full Name</Label>
//         <Input id="name" value={form.name ?? ""} onChange={(e) => setValue("name", e.target.value)} onBlur={() => onBlur("name")} disabled={disabled} />
//         {touched.name && errors.name && <p className="text-xs text-red-600">{errors.name}</p>}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="password">Password (leave empty to keep)</Label>
//         <Input id="password" type="password" value={form.password ?? ""} onChange={(e) => setValue("password", e.target.value)} onBlur={() => onBlur("password")} disabled={disabled} />
//         {touched.password && errors.password && <p className="text-xs text-red-600">{errors.password}</p>}
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="type">Type</Label>
//         <Select value={form.type ?? "INTERNAL"} onValueChange={(val) => setValue("type", val as any)} disabled={disabled}>
//           <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="INTERNAL">Internal</SelectItem>
//             <SelectItem value="EXTERNAL">External</SelectItem>
//             <SelectItem value="SERVICE">Service</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="status">Status</Label>
//         <Select value={form.status ?? "ACTIVE"} onValueChange={(val) => setValue("status", val as any)} disabled={disabled}>
//           <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
//           <SelectContent>
//             <SelectItem value="ACTIVE">Active</SelectItem>
//             <SelectItem value="INACTIVE">Inactive</SelectItem>
//             <SelectItem value="SUSPENDED">Suspended</SelectItem>
//             <SelectItem value="LOCKED">Locked</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="department">Department</Label>
//         <Input id="department" value={form.department ?? ""} onChange={(e) => setValue("department", e.target.value || null)} onBlur={() => onBlur("department")} disabled={disabled} />
//       </div>

//       <div className="space-y-2">
//         <Label htmlFor="location">Location</Label>
//         <Input id="location" value={form.location ?? ""} onChange={(e) => setValue("location", e.target.value || null)} onBlur={() => onBlur("location")} disabled={disabled} />
//       </div>

//       <div className="flex justify-end gap-2 pt-4">
//         <Button variant="outline" onClick={onClose}>Cancel</Button>
//         <Button onClick={handleSave}>Save Changes</Button>
//       </div>
//     </div>
//   );
// };

"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { UpdateUserInput, updateUserSchema } from "../schema/user-schema";
import { useZodForm } from "@/hooks/useZodForm";

interface Props {
  initialValues: UpdateUserInput;
  onSubmit: (data: UpdateUserInput) => void;
  onClose: () => void;
  disabled?: boolean;
}

const userTypes = {
  INTERNAL: {
    label: "Internal",
    desc: "Employees or core team members inside the organization.",
  },
  EXTERNAL: {
    label: "External",
    desc: "Clients, partners or external collaborators.",
  },
  SERVICE: {
    label: "Service",
    desc: "System or automated service accounts.",
  },
} as const;

const userStatus = {
  ACTIVE: {
    label: "Active",
    desc: "User is active and able to access the system.",
  },
  INACTIVE: {
    label: "Inactive",
    desc: "User account is disabled temporarily.",
  },
  SUSPENDED: {
    label: "Suspended",
    desc: "User account is suspended due to policy violations.",
  },
  LOCKED: {
    label: "Locked",
    desc: "User failed too many login attempts or security lockout.",
  },
} as const;

export const EditUserForm: React.FC<Props> = ({ initialValues, onSubmit, onClose, disabled }) => {
  const { form, errors, touched, setValue, onBlur, validateForm, reset } =
    useZodForm(updateUserSchema, initialValues);

  React.useEffect(() => {
    reset();
  }, [initialValues, reset]);

  const handleSave = () => {
    const result = validateForm();
    if (!result.success) return;
    onSubmit(result.data);
    onClose();
  };

  return (
    <div className="space-y-5 py-2">

      <div className="space-y-2">
        <Label>Full Name</Label>
        <Input
          value={form.name ?? ""}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
          disabled={disabled}
        />
        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          User's full display name.
        </p>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <Label>Type</Label>

        <Select
          value={form.type ?? "INTERNAL"}
          onValueChange={(val) => setValue("type", val as any)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full flex flex-col items-start py-2">
            <span className="font-medium text-sm">
              {userTypes[form.type ?? "INTERNAL"].label}
            </span>
            <SelectValue className="hidden" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(userTypes).map(([value, obj]) => (
              <SelectItem key={value} value={value}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{obj.label}</span>
                  <span className="text-xs text-muted-foreground">{obj.desc}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Determines whether the user is internal, external, or system service.
        </p>
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label>Status</Label>

        <Select
          value={form.status ?? "ACTIVE"}
          onValueChange={(val) => setValue("status", val as any)}
          disabled={disabled}
        >
          <SelectTrigger className="w-full flex flex-col items-start py-2">
            <span className="font-medium text-sm">
              {userStatus[form.status ?? "ACTIVE"].label}
            </span>
            <SelectValue className="hidden" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(userStatus).map(([value, obj]) => (
              <SelectItem key={value} value={value}>
                <div className="flex flex-col gap-0.5">
                  <span className="font-medium">{obj.label}</span>
                  <span className="text-xs text-muted-foreground">{obj.desc}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Controls the user's account availability and access.
        </p>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={disabled}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};
