import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import type { DynamicField } from "./types/DynamicField";

import { BasicTab } from "./tab/BasicTab";
import { ValidationTab } from "./tab/ValidationTab";
import { VisibilityTab } from "./tab/VisibilityTab";
import { PermissionsTab } from "./tab/PermissionsTab";
import { FormulaTab } from "./tab/FormulaTab";
import { IntegrationTab } from "./tab/IntegrationTab";

export function FieldEditSheet({
  field,
  userRoles,
  onClose,
  onUpdate,
}: {
  field: DynamicField | null;
  userRoles: string[];
  onClose: () => void;
  onUpdate: (f: DynamicField) => void;
}) {
  const [draft, setDraft] = useState<DynamicField | null>(null);

  useEffect(() => {
    setDraft(field);
  }, [field]);

  if (!draft) return null;

  const update = (next: DynamicField) => {
    setDraft(next);
    onUpdate(next); // 🔥 instant propagation
  };

  return (
    <Sheet open={!!field} onOpenChange={onClose}>
      <SheetContent side="right" className="min-w-[420px] p-4">
        <SheetHeader>
          <SheetTitle>{draft.label}</SheetTitle>
        </SheetHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="basic">Basic</TabsTrigger>
            <TabsTrigger value="validation">Validation</TabsTrigger>
            <TabsTrigger value="visibility">Visibility</TabsTrigger>
            <TabsTrigger value="permissions">Access</TabsTrigger>
            <TabsTrigger value="formula">Formula</TabsTrigger>
            <TabsTrigger value="integration">Integration</TabsTrigger>
          </TabsList>

          <BasicTab field={draft} onUpdate={update} />
          <ValidationTab field={draft} onUpdate={update} />
          <VisibilityTab field={draft} onUpdate={update} />
          <PermissionsTab
            field={draft}
            roles={userRoles}
            onUpdate={update}
          />
          <FormulaTab field={draft} onUpdate={update} />
          <IntegrationTab field={draft} onUpdate={update} />
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}
