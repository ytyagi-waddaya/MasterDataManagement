"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function ModuleDetailsPage() {
  const params = useParams();
  const { id } = params; 

  return (
    <div className="p-6 space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Module Details</h1>
        <p className="text-sm text-muted-foreground">
          View information about the selected module.
        </p>
      </header>

      <div className="rounded-lg border p-4 bg-card shadow-sm">
        <p className="text-sm">
          You are viewing details for module with ID:
          <span className="font-mono text-orange-600">{id}</span>
        </p>
      </div>

      <Button
        className="mt-2"
        onClick={() => window.history.back()}
        variant="outline"
      >
        Go Back
      </Button>
    </div>
  );
}
