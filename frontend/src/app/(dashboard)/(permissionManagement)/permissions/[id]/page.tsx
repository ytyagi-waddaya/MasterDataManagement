"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PermissionDetailsPage() {
  const params = useParams();
  const { id } = params; 

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Permission Details</h1>
      <p>
        You are viewing details for permission with ID:{" "}
        <span className="font-mono text-orange-600">{id}</span>
      </p>

      {/* Example back button */}
      <Button
        className="mt-4"
        onClick={() => window.history.back()}
        variant="outline"
      >
        Go Back
      </Button>
    </div>
  );
}
