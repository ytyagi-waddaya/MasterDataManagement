"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  ChevronLeft } from "lucide-react";
import RoleDetail from "@/lib/role/components/Role-detail-page";

export default function RoleDetailsPage() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col gap-4 p-6 ">
      <div className="flex items-center gap-2">
        <Button
          className="h-8 w-8"
          onClick={() => window.history.back()}
          variant="outline"
        >
          <ChevronLeft/>
        </Button>
        <h1 className="text-2xl font-bold">Role Details</h1>
      </div>
      <div className="p-4">
      <RoleDetail id={id} />
      </div>
    </div>
  );
}
