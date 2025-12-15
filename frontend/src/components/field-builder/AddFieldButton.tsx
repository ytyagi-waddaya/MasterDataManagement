// components/fieldBuilder/AddFieldButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddFieldButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="flex items-center gap-2">
      <Plus size={14} />
      Add Field
    </Button>
  );
}
