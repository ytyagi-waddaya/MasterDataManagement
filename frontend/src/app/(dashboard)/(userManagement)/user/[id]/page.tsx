"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {  ChevronLeft } from "lucide-react";
import UserDetail from "@/lib/user/components/User-detail-page";

export default function UserDetailsPage() {
  const { id } = useParams() as { id: string };

  return (
    <div className="flex flex-col gap-4 p-2 ">
      <div className="p-2">
      <UserDetail userId={id} />
      </div>
    </div>
  );
}
