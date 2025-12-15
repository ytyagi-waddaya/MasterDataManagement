"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMasterObject } from "./hook";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"; // ← import icon

export default function MasterObjectDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: masterObjectData, isLoading } = useMasterObject(params.id);
 
  if (isLoading) return <div>Loading Master Object...</div>;
  if (!masterObjectData) return <div>MasterObject not found.</div>;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="rounded-lg border p-4 bg-gray-50">
        <div className="flex mb-2 items-center">
          <h3 className="text-lg font-semibold mb-2">MasterObject Details</h3>

          <Button
            onClick={() => router.push(`/create-master-object/${params.id}`)}
            className="ml-auto flex items-center gap-2"
          >
            <Plus size={18} /> 
            Add Fields
          </Button>
        </div>

        <pre className="bg-gray-900 text-green-400 p-4 rounded-md text-sm overflow-auto">
          {JSON.stringify(masterObjectData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
