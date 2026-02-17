"use client";

import DepartmentsTable from "@/lib/department/table/DepartmentsTable";

export default function DepartmentPage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Departments
      </h1>

      <DepartmentsTable />
    </div>
  );
}
