// components/fieldBuilder/AddSectionButton.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function AddSectionButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="ghost" className="flex items-center gap-2">
      <Plus size={14} />
      Add Section
    </Button>
  );
}
