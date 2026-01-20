"use client";

import { useParams } from "next/navigation";
import RoleDetail from "@/lib/role/components/Role-detail-page";

export default function RoleDetailsPage() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col p-2">
      <div className="p-2">
      <RoleDetail id={id} />
      </div>
    </div>
  );
}
