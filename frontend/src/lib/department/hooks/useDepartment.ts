"use client";

import apiClient from "@/lib/api/apiClient";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  CreateDepartmentInput,
  UpdateDepartmentInput,
} from "../schema/department-schema";

/* -------------------- GET ALL -------------------- */
export function useDepartments() {
  return useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await apiClient.get("/department");
      return res.data.data?.departments ?? [];
    },
  });
}

/* -------------------- GET ONE -------------------- */
export function useDepartment(departmentId: string) {
  return useQuery({
    queryKey: ["department", departmentId],
    queryFn: async () => {
      const res = await apiClient.get(`/department/${departmentId}`);
      console.log("Department API Response:", res.data);
      return res.data.data?.department;
    },
    enabled: !!departmentId,
  });
}

/* -------------------- CREATE -------------------- */
export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateDepartmentInput) => {
      const res = await apiClient.post("/department", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Department created successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create department");
    },
  });
}

/* -------------------- UPDATE -------------------- */
export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      departmentId,
      payload,
    }: {
      departmentId: string;
      payload: UpdateDepartmentInput;
    }) => {
      const res = await apiClient.put(
        `/department/${departmentId}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Department updated successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update department");
    },
  });
}

/* -------------------- DELETE -------------------- */
export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (departmentId: string) => {
      const res = await apiClient.delete(`/department/${departmentId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Department deleted");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete department");
    },
  });
}

/* -------------------- ARCHIVE -------------------- */
export function useArchiveDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (departmentId: string) => {
      const res = await apiClient.patch(
        `/department/${departmentId}/archive`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Department archived");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

/* -------------------- RESTORE -------------------- */
export function useRestoreDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (departmentId: string) => {
      const res = await apiClient.patch(
        `/department/${departmentId}/restore`
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Department restored");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
    },
  });
}

/* -------------------- ASSIGN ROLES -------------------- */
export const useAssignDepartmentRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      departmentId,
      roleIds,
    }: {
      departmentId: string;
      roleIds: string[];
    }) => {
      const res = await apiClient.post("/department/assign-role", {
        departmentId,
        roleIds,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Roles assigned successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({
        queryKey: ["department", variables.departmentId],
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to assign roles");
    },
  });
};

/* -------------------- REMOVE ROLES -------------------- */
export const useRemoveDepartmentRoles = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      departmentId,
      roleIds,
    }: {
      departmentId: string;
      roleIds: string[];
    }) => {
      const res = await apiClient.post("/department/remove-role", {
        departmentId,
        roleIds,
      });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success("Roles removed successfully");
      queryClient.invalidateQueries({ queryKey: ["departments"] });
      queryClient.invalidateQueries({
        queryKey: ["department", variables.departmentId],
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to remove roles");
    },
  });
};



export function useDepartmentRoles(departmentId?: string) {
  return useQuery({
    queryKey: ["department-roles", departmentId],
    queryFn: async () => {
      if (!departmentId) return [];

      const res = await apiClient.get(
        `/department/${departmentId}/roles`
      );

      return res.data.data?.roles ?? [];
    },
    enabled: !!departmentId,
  });
}






