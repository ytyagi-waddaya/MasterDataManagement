"use client";

import DepartmentDetail from "@/lib/department/components/department-detail";
import { useDepartment } from "@/lib/department/hooks/useDepartment";
import { useParams } from "next/navigation";

export default function DepartmentPage() {
  const params = useParams();
 
   console.log("Params:", params);
  const id = params?.id as string;

  const { data, isLoading } = useDepartment(id);
  
  return (
    <DepartmentDetail
      department={data}
      loading={isLoading}
    />
  );
}
