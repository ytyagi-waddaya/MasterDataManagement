"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  ChevronLeft } from "lucide-react";
import MasterObjectDetailPage from "@/lib/masterObject/MasterObjectDetailPage";

export default function MasterObjectDetailsPage() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col gap-4 p-2 ">

      <div className="p-4">
      <MasterObjectDetailPage params={{ id }} />
      </div>
    </div>
  );
}

