"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import {
  Building,
  Shield,
  Calendar,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RoleDetails from "./role-details";

interface Props {
  department: any;
  loading?: boolean;
}

export default function DepartmentDetail({
  department,
  loading,
}: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "roles">("overview");

  if (loading) return <div className="p-6">Loading...</div>;
  if (!department) return <div className="p-6">Department not found</div>;

  const statusColor =
    department.status === "ACTIVE"
      ? "bg-green-50 text-green-700 border border-green-200"
      : "bg-gray-50 text-gray-700 border border-gray-200";

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div className="bg-white border-b px-6 py-6">
        <div className="flex justify-between items-center">

          <div className="flex items-start gap-4">
            <div className="h-14 w-14 bg-gray-900 text-white rounded-xl flex items-center justify-center">
              <Building className="h-6 w-6" />
            </div>

            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-semibold">
                  {department.name}
                </h1>

                <div
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}
                >
                  {department.status}
                </div>
              </div>

              <div className="text-sm text-gray-600 mt-1">
                Code: {department.code}
              </div>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => window.history.back()}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        </div>

        {/* TABS */}
        <div className="flex gap-8 mt-6 border-t pt-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`text-sm font-medium ${
              activeTab === "overview"
                ? "text-black border-b-2 border-black pb-2"
                : "text-gray-500"
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab("roles")}
            className={`text-sm font-medium ${
              activeTab === "roles"
                ? "text-black border-b-2 border-black pb-2"
                : "text-gray-500"
            }`}
          >
            Role Management
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-8 max-w-6xl mx-auto">

        {activeTab === "overview" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl border">
              <div className="text-xs text-gray-500 mb-2">
                Department ID
              </div>
              <div className="font-mono text-sm">
                {department.id}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="text-xs text-gray-500 mb-2">
                Created At
              </div>
              <div>
                {new Date(department.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="text-xs text-gray-500 mb-2">
                Assigned Roles
              </div>
              <div className="text-lg font-semibold">
                {department.departmentRoles?.length || 0}
              </div>
            </div>

            <div className="md:col-span-3 bg-white p-6 rounded-xl border">
              <div className="text-xs text-gray-500 mb-2">
                Description
              </div>
              <div>
                {department.description || "No description"}
              </div>
            </div>
          </div>
        ) : (
          <RoleDetails department={department} />
        )}
      </div>
    </div>
  );
}
