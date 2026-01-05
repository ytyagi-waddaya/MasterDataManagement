// D:\Raghav\MasterDataManagement\frontend\src\lib\workflow\builder\transitions\TransitionRow.tsx
"use client";

import React, { useEffect, useMemo } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, ArrowRight } from "lucide-react";
import { MultiSelect } from "../../multiselect";
import { cn } from "@/lib/utils";

/* -------------------------
   Normalizers
------------------------- */

function normalizeOptions(list: any[]) {
  return (list || [])
    .map((x) => ({
      label: String(x?.label ?? x?.name ?? x?.title ?? ""),
      value: String(x?.value ?? x?.id ?? x?._id ?? ""),
      roleIds: Array.isArray(x?.roleIds) ? x.roleIds.map(String) : undefined,
    }))
    .filter((o) => o.label && o.value);
}

function normalizeValueArray(v: any) {
  if (!Array.isArray(v)) return [];
  return v
    .map((x) => {
      if (typeof x === "string" || typeof x === "number") return String(x);
      return String(x?.value ?? x?.id ?? x?._id ?? "");
    })
    .filter((x) => Boolean(String(x).trim()));
}

/* -------------------------
   UI Components
------------------------- */

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border bg-white/70 backdrop-blur p-4 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          {description ? (
            <div className="text-xs text-muted-foreground">{description}</div>
          ) : null}
        </div>
      </div>
      {children}
    </div>
  );
}

/* -------------------------
   Sequential Levels Editor
------------------------- */

function ApprovalLevelsEditor({
  control,
  name,
  roleOptions,
  userOptions,
  errors,
  index,
}: any) {
  const { fields, append, remove } = useFieldArray({ control, name });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold">Approval Levels</Label>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="rounded-xl"
          onClick={() =>
            append({ order: fields.length + 1, roleIds: [], userIds: [] })
          }
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Level
        </Button>
      </div>

      {fields.map((lvl: any, i: number) => {
        const lvlErr =
          errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.message ||
          errors?.transitions?.[index]?.approvalConfig?.levels?.[i]?.type;

        return (
          <Card
            key={lvl.id}
            className="p-4 rounded-2xl border bg-gradient-to-b from-white to-slate-50 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Level {i + 1}</div>
              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => remove(i)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>

            <Controller
              name={`${name}.${i}.roleIds`}
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={roleOptions}
                  value={normalizeValueArray(field.value)}
                  onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                  placeholder="Approver roles"
                />
              )}
            />

            <Controller
              name={`${name}.${i}.userIds`}
              control={control}
              render={({ field }) => (
                <MultiSelect
                  options={userOptions}
                  value={normalizeValueArray(field.value)}
                  onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                  placeholder="Specific users"
                />
              )}
            />

            {lvlErr ? (
              <p className="text-xs text-destructive">{String(lvlErr)}</p>
            ) : null}
          </Card>
        );
      })}
    </div>
  );
}

/* -------------------------
   Main Row
------------------------- */

export function TransitionRow({
  index,
  control,
  register,
  setValue,
  remove,
  normalizedStages,
  roleList,
  userList,
  errors,
  onDelete, // Optional: panel-safe delete handler
}: any) {
  const transitionType = useWatch({
    control,
    name: `transitions.${index}.transitionType`,
  });

  const triggerStrategy = useWatch({
    control,
    name: `transitions.${index}.triggerStrategy`,
  });

  const fromStage = useWatch({
    control,
    name: `transitions.${index}.fromStageId`,
  });

  const toStage = useWatch({
    control,
    name: `transitions.${index}.toStageId`,
  });

  const approvalConfig = useWatch({
    control,
    name: `transitions.${index}.approvalConfig`,
  });

  const approvalMode = approvalConfig?.mode;

  const approvalRoleIds = useWatch({
    control,
    name: `transitions.${index}.approvalConfig.roleIds`,
  });

  const approvalUserIds = useWatch({
    control,
    name: `transitions.${index}.approvalConfig.userIds`,
  });

  const approvalLevels = useWatch({
    control,
    name: `transitions.${index}.approvalConfig.levels`,
  });

  const allowedRoleIdsRaw = useWatch({
    control,
    name: `transitions.${index}.allowedRoleIds`,
  });

  const allowedUserIdsRaw = useWatch({
    control,
    name: `transitions.${index}.allowedUserIds`,
  });

  const requiresApproval = transitionType === "APPROVAL";
  // const showTriggerStrategy =
  //   transitionType === "NORMAL" || transitionType === "REVIEW";
  // NOTE: Trigger rules section is currently disabled as per requirement.

  const roleOptions = useMemo(() => normalizeOptions(roleList), [roleList]);
  const allowedRoleIds = useMemo(
    () => normalizeValueArray(allowedRoleIdsRaw),
    [allowedRoleIdsRaw]
  );

  const filteredUsersRaw = useMemo(() => {
    const users = normalizeOptions(userList);
    if (!allowedRoleIds.length) return users;

    const hasRoleMeta = users.some((u: any) => Array.isArray(u?.roleIds));
    if (!hasRoleMeta) return users;

    return users.filter((u: any) =>
      (u.roleIds || []).some((rid: string) => allowedRoleIds.includes(String(rid)))
    );
  }, [userList, allowedRoleIds]);

  const userOptionsFiltered = useMemo(
    () => filteredUsersRaw.map((u: any) => ({ label: u.label, value: u.value })),
    [filteredUsersRaw]
  );

  const userOptionsAll = useMemo(
    () =>
      normalizeOptions(userList).map((u: any) => ({
        label: u.label,
        value: u.value,
      })),
    [userList]
  );

  // Prevent selecting the same From and To stage
  useEffect(() => {
    if (fromStage && toStage && fromStage === toStage) {
      setValue(`transitions.${index}.toStageId`, "");
    }
  }, [fromStage, toStage, index, setValue]);

  // Approval transitions must use APPROVER_ONLY
  useEffect(() => {
    if (transitionType === "APPROVAL") {
      setValue(`transitions.${index}.triggerStrategy`, "APPROVER_ONLY", {
        shouldDirty: true,
      });
    }
  }, [transitionType, index, setValue]);

  // Auto transitions must use SYSTEM_ONLY and autoTrigger = true
  useEffect(() => {
    if (transitionType === "AUTO") {
      setValue(`transitions.${index}.triggerStrategy`, "SYSTEM_ONLY", {
        shouldDirty: true,
      });
      setValue(`transitions.${index}.autoTrigger`, true, { shouldDirty: true });
    }
  }, [transitionType, index, setValue]);

  // Normal/Review transitions should not keep APPROVER_ONLY or SYSTEM_ONLY
  useEffect(() => {
    if (transitionType === "APPROVAL" || transitionType === "AUTO") return;
    if (triggerStrategy === "APPROVER_ONLY" || triggerStrategy === "SYSTEM_ONLY") {
      setValue(`transitions.${index}.triggerStrategy`, "ANY_ALLOWED", {
        shouldDirty: true,
      });
    }
  }, [transitionType, triggerStrategy, index, setValue]);

  // Initialize approvalConfig once when switching to APPROVAL
  useEffect(() => {
    if (transitionType === "APPROVAL" && !approvalConfig) {
      setValue(`transitions.${index}.approvalStrategy`, "ALL", { shouldDirty: true });
      setValue(
        `transitions.${index}.approvalConfig`,
        { mode: "PARALLEL", roleIds: [], userIds: [] },
        { shouldDirty: true }
      );
    }
  }, [transitionType, approvalConfig, index, setValue]);

  // Enforce strict fields for approval modes
  useEffect(() => {
    if (!requiresApproval) return;

    if (approvalMode === "PARALLEL") {
      setValue(`transitions.${index}.approvalConfig.levels`, undefined, {
        shouldDirty: true,
      });
      return;
    }

    if (approvalMode === "SEQUENTIAL") {
      setValue(`transitions.${index}.approvalConfig.roleIds`, [], { shouldDirty: true });
      setValue(`transitions.${index}.approvalConfig.userIds`, [], { shouldDirty: true });

      if (!Array.isArray(approvalLevels) || approvalLevels.length === 0) {
        setValue(
          `transitions.${index}.approvalConfig.levels`,
          [{ order: 1, roleIds: [], userIds: [] }],
          { shouldDirty: true }
        );
      }
    }
  }, [requiresApproval, approvalMode, approvalLevels, index, setValue]);

  // Cleanup selected users when role filter changes (only relevant if trigger rules section is enabled)
  useEffect(() => {
    if (!allowedRoleIds.length) return;

    const selected = normalizeValueArray(allowedUserIdsRaw);
    if (!selected.length) return;

    const allowedSet = new Set(userOptionsFiltered.map((u: any) => u.value));
    const cleaned = selected.filter((id) => allowedSet.has(String(id)));

    if (cleaned.length !== selected.length) {
      setValue(`transitions.${index}.allowedUserIds`, cleaned, { shouldDirty: true });
    }
  }, [allowedRoleIds, allowedUserIdsRaw, userOptionsFiltered, index, setValue]);

  const labelError =
    errors?.transitions?.[index]?.label?.message ||
    errors?.transitions?.[index]?.label?.type;

  const parallelErr =
    errors?.transitions?.[index]?.approvalConfig?.message ||
    errors?.transitions?.[index]?.approvalConfig?.type;

  return (
    <Card
      className={cn(
        "rounded-3xl border p-5 shadow-md space-y-5",
        "bg-gradient-to-br from-indigo-50/40 via-white to-rose-50/40",
        "hover:shadow-lg transition"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="text-sm font-semibold flex items-center gap-2">
            Transition <span className="text-muted-foreground">#{index + 1}</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full border bg-white/70">
              {transitionType || "NORMAL"}
            </span>
          </div>
          <div className="text-xs text-muted-foreground">
            Configure action, flow, and rules
          </div>
        </div>

        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={() => {
            // Use panel-safe delete when available
            if (typeof onDelete === "function") return onDelete();
            return remove(index);
          }}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </div>

      {/* Action */}
      <Section title="Action" description="Action label cannot be empty">
        <Input
          placeholder="e.g. Submit for approval"
          aria-invalid={!!labelError}
          className={cn("rounded-xl", !!labelError ? "border-destructive" : "")}
          {...register(`transitions.${index}.label`, {
            required: "Action label is required",
            validate: (v: any) =>
              String(v ?? "").trim().length > 0 || "Action label is required",
          })}
        />
        {labelError ? (
          <p className="text-xs text-destructive">{String(labelError)}</p>
        ) : null}
      </Section>

      {/* Flow */}
      <Section title="Flow" description="From → To + Transition Type">
        <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3">
          <Controller
            name={`transitions.${index}.fromStageId`}
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label className="text-xs">From</Label>
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-xl bg-white">
                    <SelectValue placeholder="From stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {normalizedStages.map((s: any) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <div className="pb-2">
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>

          <Controller
            name={`transitions.${index}.toStageId`}
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label className="text-xs">To</Label>
                <Select value={field.value ?? ""} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-xl bg-white">
                    <SelectValue placeholder="To stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {normalizedStages.map((s: any) => (
                      <SelectItem key={s.id} value={String(s.id)}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>

        <div className="mt-4">
          <Controller
            name={`transitions.${index}.transitionType`}
            control={control}
            render={({ field }) => (
              <div className="space-y-2">
                <Label className="text-xs">Transition Type</Label>
                <Select value={field.value ?? "NORMAL"} onValueChange={field.onChange}>
                  <SelectTrigger className="rounded-xl bg-white">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NORMAL">Normal</SelectItem>
                    <SelectItem value="APPROVAL">Approval</SelectItem>
                    <SelectItem value="SEND_BACK">Send Back</SelectItem>
                    <SelectItem value="REVIEW">Review</SelectItem>
                    <SelectItem value="AUTO">Automatic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
      </Section>

      {/*
        ---------------------------------------------------------
        Trigger Rules Section (Disabled)
        ---------------------------------------------------------
        This section is intentionally commented as per requirement.
        It controls who can trigger a NORMAL/REVIEW transition.
        ---------------------------------------------------------

      {showTriggerStrategy && (
        <Section title="Who can trigger this action" description="Selecting roles will filter users">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name={`transitions.${index}.allowedRoleIds`}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-xs">Allowed roles</Label>
                  <MultiSelect
                    options={roleOptions}
                    value={normalizeValueArray(field.value)}
                    onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                    placeholder="Select roles"
                  />
                </div>
              )}
            />

            <Controller
              name={`transitions.${index}.allowedUserIds`}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-xs">Specific users</Label>
                  <MultiSelect
                    options={userOptionsFiltered}
                    value={normalizeValueArray(field.value)}
                    onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                    placeholder={
                      allowedRoleIds.length
                        ? userOptionsFiltered.length
                          ? "Users (filtered by roles)"
                          : "No users for selected roles"
                        : "Select users"
                    }
                    className={cn(
                      allowedRoleIds.length && userOptionsFiltered.length === 0
                        ? "border-destructive/40"
                        : ""
                    )}
                  />
                </div>
              )}
            />
          </div>

          <div className="mt-3">
            <Controller
              name={`transitions.${index}.triggerStrategy`}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-xs">Trigger strategy</Label>
                  <Select value={field.value ?? "ANY_ALLOWED"} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-xl bg-white">
                      <SelectValue placeholder="Who can trigger this" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ANY_ALLOWED">Anyone</SelectItem>
                      <SelectItem value="CREATOR_ONLY">Creator only</SelectItem>
                      <SelectItem value="ASSIGNEE_ONLY">Assignee only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>
        </Section>
      )}
      */}

      {/* Approval Configuration */}
      {requiresApproval && approvalConfig && (
        <Section title="Approval Configuration" description="Parallel or Sequential approvals">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Controller
              name={`transitions.${index}.approvalStrategy`}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-xs">Approval strategy</Label>
                  <Select value={field.value ?? "ALL"} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-xl bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ALL">All</SelectItem>
                      <SelectItem value="ANY">Any</SelectItem>
                      <SelectItem value="MAJORITY">Majority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name={`transitions.${index}.approvalConfig.mode`}
              control={control}
              render={({ field }) => (
                <div className="space-y-2">
                  <Label className="text-xs">Mode</Label>
                  <Select value={field.value ?? "PARALLEL"} onValueChange={field.onChange}>
                    <SelectTrigger className="rounded-xl bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PARALLEL">Parallel</SelectItem>
                      <SelectItem value="SEQUENTIAL">Sequential</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />
          </div>

          {approvalMode === "PARALLEL" && (
            <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
              <Controller
                name={`transitions.${index}.approvalConfig.roleIds`}
                control={control}
                rules={{
                  validate: () => {
                    const r = normalizeValueArray(approvalRoleIds);
                    const u = normalizeValueArray(approvalUserIds);
                    return r.length || u.length
                      ? true
                      : "Parallel approval requires users or roles";
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="text-xs">Approver roles</Label>
                    <MultiSelect
                      options={roleOptions}
                      value={normalizeValueArray(field.value)}
                      onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                      placeholder="Approver roles"
                    />
                  </div>
                )}
              />

              <Controller
                name={`transitions.${index}.approvalConfig.userIds`}
                control={control}
                rules={{
                  validate: () => {
                    const r = normalizeValueArray(approvalRoleIds);
                    const u = normalizeValueArray(approvalUserIds);
                    return r.length || u.length
                      ? true
                      : "Parallel approval requires users or roles";
                  },
                }}
                render={({ field }) => (
                  <div className="space-y-2">
                    <Label className="text-xs">Specific users</Label>
                    <MultiSelect
                      options={userOptionsAll}
                      value={normalizeValueArray(field.value)}
                      onChange={(v: any) => field.onChange(normalizeValueArray(v))}
                      placeholder="Specific users"
                    />
                  </div>
                )}
              />

              {parallelErr ? (
                <p className="text-xs text-destructive">{String(parallelErr)}</p>
              ) : null}
            </div>
          )}

          {approvalMode === "SEQUENTIAL" && (
            <div className="mt-3">
              <Controller
                name={`transitions.${index}.approvalConfig.levels`}
                control={control}
                rules={{
                  validate: (levels: any) => {
                    if (!Array.isArray(levels) || levels.length === 0) {
                      return "Sequential approval requires approval levels";
                    }
                    for (let i = 0; i < levels.length; i++) {
                      const r = normalizeValueArray(levels[i]?.roleIds);
                      const u = normalizeValueArray(levels[i]?.userIds);
                      if (!r.length && !u.length) return `Level ${i + 1}: select role or user`;
                    }
                    return true;
                  },
                }}
                render={() => <></>}
              />

              <ApprovalLevelsEditor
                control={control}
                name={`transitions.${index}.approvalConfig.levels`}
                roleOptions={roleOptions}
                userOptions={userOptionsAll}
                errors={errors}
                index={index}
              />
            </div>
          )}
        </Section>
      )}
    </Card>
  );
}
