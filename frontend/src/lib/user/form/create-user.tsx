"use client";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

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

export function UserForm({
  form,
  errors,
  touched,
  setValue,
  onBlur,
}: {
  form: {
    name: string;
    email: string;
    password?: string;
    type: "INTERNAL" | "EXTERNAL" | "SERVICE";
  };
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setValue: (field: any, value: any) => void;
  onBlur: (field: any) => void;
}) {
  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Full Name</label>

        <Input
          value={form.name}
          onChange={(e) => setValue("name", e.target.value)}
          onBlur={() => onBlur("name")}
        />

        {touched.name && errors.name && (
          <p className="text-xs text-red-600">{errors.name}</p>
        )}

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Enter the user's complete name.
        </p>
      </div>
      
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Email</label>

        <Input
          value={form.email}
          onChange={(e) => setValue("email", e.target.value)}
          onBlur={() => onBlur("email")}
        />

        {touched.email && errors.email && (
          <p className="text-xs text-red-600">{errors.email}</p>
        )}

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="w-3 h-3" />
          Must be a valid email address.
        </p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Password</label>

        <Input
          type="password"
          value={form.password ?? ""}
          onChange={(e) => setValue("password", e.target.value)}
          onBlur={() => onBlur("password")}
        />

        {touched.password && errors.password && (
          <p className="text-xs text-red-600">{errors.password}</p>
        )}

        <div className="text-xs text-muted-foreground flex flex-col gap-1 mt-1">
          <p className="flex items-center gap-1">
            <Info className="w-3 h-3" /> Must include:
          </p>

          <ul className="list-disc ml-5 space-y-0.5">
            <li>At least 8 characters</li>
            <li>1 uppercase letter (A–Z)</li>
            <li>1 lowercase letter (a–z)</li>
            <li>1 number (0–9)</li>
            <li>1 special character (! @ # $ % etc.)</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium">Type</label>

        <Select
          value={form.type}
          onValueChange={(val) => setValue("type", val as any)}
        >
          <SelectTrigger className="w-full flex flex-col items-start text-left py-2">
            <span className="font-medium text-sm">
              {userTypes[form.type]?.label ?? "Select type"}
            </span>
            <SelectValue className="hidden" />
          </SelectTrigger>

          <SelectContent>
            {Object.entries(userTypes).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                <div className="flex flex-col">
                  <span className="font-medium">{value.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {value.desc}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
          <Info className="w-3 h-3" />
          The user category determines access and visibility.
        </p>
      </div>
    </div>
  );
}
