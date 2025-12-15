"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/api/apiClient";
import {
  CreateStagesInput,
  CreateTransitionInput,
  CreateWorkflowInput,
  MoveInstanceInput,
  Stage,
  stageId,
  Transition,
  UpdateStageInput,
  UpdateTransitionInput,
  UpdateWorkflowInput,
  Workflow,
  WorkflowInstance,
  WorkflowListResponse,
  WorkflowQuery,
} from "../schema/workflow-schema";
import { serializeFiltersForApi } from "@/hooks/useServerDataTable";
import { useDebounce } from "@/hooks/useDebounce";
import { useMemo } from "react";
import { toast } from "sonner";
import { queryClient } from "@/lib/api/queryClient";

// workflow.query.ts
export interface WorkflowFilters {
  status?: "active" | "inactive" | "all";
  [key: string]: any;
}

export interface WorkflowResponse<T> {
  data: T[];
  total: number;
}

export function useWorkflows<T = any>({
  page,
  limit,
  search,
  filters = {},
  sortBy,
  sortOrder = "desc",
}: {
  page: number;
  limit: number;
  search: string;
  filters?: WorkflowFilters;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);
  const stableFilters = useMemo(() => JSON.stringify(filters), [filters]);

  return useQuery<{
    workflows: {
      data: T[];
      total: number;
      page: number;
      pageSize: number;
    };
  }>({
    queryKey: [
      "workflows",
      page,
      limit,
      debouncedSearch,
      stableFilters,
      sortBy,
      sortOrder,
    ],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const params = {
        search: debouncedSearch || undefined,
        skip,
        take: limit,
        sortBy,
        sortOrder,
        ...serializeFiltersForApi(filters),
      };

      const res = await apiClient.get("/workflow", { params });

      return {
        workflows: {
          data: res.data.data?.workflows.data ?? [],
          total: res.data.data?.workflows.total ?? 0,
          page: res.data.data?.workflows.page ?? page,
          pageSize: res.data.data?.workflows.pageSize ?? limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

export function useWorkflow(workflowId: string) {
  return useQuery({
    queryKey: ["workflows", workflowId],
    queryFn: async () => {
      const res = await apiClient.get(`/workflow/${workflowId}`);
      return res.data.data.workflow;
    },
    enabled: !!workflowId,
  });
}

export interface CreateFullWorkflowInput {
  name: string;
  description?: string;
  resourceId: string;

  stages: {
    name: string;
    isInitial: boolean;
    isFinal: boolean;
    order: number;
  }[];

  transitions: {
    label: string;
    fromStageId: string;
    toStageId: string;
    allowedRoleIds: string[];
    allowedUserIds: string[];
    requiresApproval: boolean;
    autoTrigger: boolean;
  }[];
}

export const useCreateFullWorkflow = () => {
  const qc = useQueryClient(); // correct ref

  return useMutation({
    mutationFn: async (payload: CreateFullWorkflowInput) => {
      const response = await apiClient.post("/workflow/full", payload);
      return response.data;
    },

    onSuccess: () => {
      toast.success("Workflow created successfully");

      qc.invalidateQueries({ queryKey: ["workflows"] });
      qc.invalidateQueries({ queryKey: ["workflow-list"] }); // optional: if you list workflows elsewhere
    },

    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create workflow");
    },
  });
};

export const useCreateWorkflow = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: CreateWorkflowInput) => {
      const res = await apiClient.post("/workflow", payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workflow created successfully");
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create Workflow");
    },
  });
};

export function useUpdateWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      workflowId,
      payload,
    }: {
      workflowId: string;
      payload: UpdateWorkflowInput;
    }) => {
      const res = await apiClient.patch(`/workflow/${workflowId}`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workflow updated successfully");
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update workflow");
    },
  });
}

export function useDeleteWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workflowId: string) => {
      const res = await apiClient.delete(`/workflow/${workflowId}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workflow deleted");
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete workflow");
    },
  });
}

export function useArchiveWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workflowId: string) => {
      const res = await apiClient.patch(`/workflow/${workflowId}/archive`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workflow(s) archived");
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to archive workflows");
    },
  });
}

export function useRestoreWorkflow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (workflowId: string) => {
      const res = await apiClient.patch(`/workflow/${workflowId}/restore`);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Workflow(s) restored");
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to restore workflows");
    },
  });
}

//stages.query.ts
export const useStages = (workflowId: string) =>
  useQuery({
    queryKey: ["stages", workflowId],
    queryFn: async () => {
      const res = await apiClient.get(`/workflow/${workflowId}/stages`);
      return res.data.data.stages;
    },
    enabled: !!workflowId,
  });

export const useStage = (workflowId: string) =>
  useQuery({
    queryKey: ["stages", workflowId],
    queryFn: async () =>
      (await apiClient.get(`/workflow/${workflowId}/stage`)).data.stages,
    enabled: !!workflowId,
  });

export const useCreateStages = (workflowId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (stages: CreateStagesInput) => {
      const res = await apiClient.post(
        `/workflow/${workflowId}/stages`,
        stages
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Stages created successfully");
      qc.invalidateQueries({ queryKey: ["stages", workflowId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create stages");
    },
  });
};

export const useUpdateStage = (workflowId: string, stageId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateStageInput | UpdateStageInput[]) => {
      const res = await apiClient.patch(
        `/workflow/${workflowId}/stage/${stageId}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Stage updated successfully");
      qc.invalidateQueries({ queryKey: ["stages", workflowId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update stage");
    },
  });
};

export const useDeleteStage = (workflowId: string, stageId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: stageId | stageId[]) => {
      const res = await apiClient.delete(
        `/workflow/${workflowId}/stage/${stageId}`,
        { data: payload }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Stage deleted successfully");
      qc.invalidateQueries({ queryKey: ["stages", workflowId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete stage");
    },
  });
};

// transitions.query.ts
export const useTransitions = (workflowId: string) =>
  useQuery({
    queryKey: ["transitions", workflowId],
    queryFn: async () => {
      const res = await apiClient.get(`/workflow/${workflowId}/transitions`);
      return res.data.data.transitions; // correct response path
    },
    enabled: !!workflowId,
  });

export const useTransition = (workflowId: string, transitionId: string) =>
  useQuery({
    queryKey: ["transition", workflowId, transitionId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/workflow/${workflowId}/transition/${transitionId}`
      );
      return res.data.data.transition;
    },
    enabled: !!workflowId && !!transitionId,
  });

export const useCreateTransitions = (workflowId: string) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateTransitionInput[]) => {
      const res = await apiClient.post(
        `/workflow/${workflowId}/transitions`,
        payload
      );
      return res.data.data.createdTransitions;
    },
    onSuccess: () => {
      toast.success("Transitions created successfully");
      qc.invalidateQueries({ queryKey: ["transitions", workflowId] });
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.message || "Failed to create transitions"
      );
    },
  });
};

export const useUpdateTransition = (
  workflowId: string,
  transitionId: string
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpdateTransitionInput) => {
      const res = await apiClient.patch(
        `/workflow/${workflowId}/transition/${transitionId}`,
        payload
      );
      return res.data.data.updatedTransition;
    },
    onSuccess: () => {
      toast.success("Transition updated successfully");
      qc.invalidateQueries({ queryKey: ["transitions", workflowId] });
      qc.invalidateQueries({
        queryKey: ["transition", workflowId, transitionId],
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to update transition");
    },
  });
};

export const useDeleteTransition = (
  workflowId: string,
  transitionId: string
) => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(
        `/workflow/${workflowId}/transition/${transitionId}`
      );
      return res.data.data.deletedTransitions;
    },
    onSuccess: () => {
      toast.success("Transition deleted successfully");
      qc.invalidateQueries({ queryKey: ["transitions", workflowId] });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to delete transition");
    },
  });
};

// instance.query.ts

// export const useGetInstance = (workflowId: string, instanceId: string) =>
//   useQuery<WorkflowInstance>({
//     queryKey: ["instance", workflowId, instanceId],
//     queryFn: async () => {
//       const res = await apiClient.get(
//         `/workflow/${workflowId}/instance/${instanceId}`
//       );
//       return res.data.instance;
//     },
//     enabled: !!workflowId && !!instanceId,
//   });

// export const useListInstances = (workflowId: string, params?: any) =>
//   useQuery({
//     queryKey: ["instances", workflowId, params],
//     queryFn: async () => {
//       const res = await apiClient.get(`/workflow/${workflowId}/instances`, {
//         params,
//       });
//       return res.data;
//     },
//     enabled: !!workflowId,
//   });

// export const useStartInstance = (workflowId: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: any) => {
//       const res = await apiClient.post(
//         `/workflow/${workflowId}/instance`,
//         data
//       );
//       return res.data.instance;
//     },
//     onSuccess: () =>
//       queryClient.invalidateQueries({ queryKey: ["instances", workflowId] }),
//   });
// };

// export const useMoveInstance = (workflowId: string, instanceId: string) => {
//   const qc = useQueryClient();
//   return useMutation({
//     mutationFn: async (data: MoveInstanceInput) =>
//       (
//         await apiClient.patch(
//           `/workflow/${workflowId}/instance/${instanceId}/move`,
//           data
//         )
//       ).data,
//     onSuccess: () => {
//       qc.invalidateQueries({ queryKey: ["instance", workflowId, instanceId] });
//       qc.invalidateQueries({ queryKey: ["instances", workflowId] });
//     },
//   });
// };

// export const useCloseInstance = (workflowId: string, instanceId: string) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: async () => {
//       const res = await apiClient.delete(
//         `/workflow/${workflowId}/instance/${instanceId}`
//       );
//       return res.data.closed;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["instances", workflowId] });
//     },
//   });
// };

export const useGetInstance = (workflowId: string, instanceId: string) =>
  useQuery<WorkflowInstance>({
    queryKey: ["instance", workflowId, instanceId],
    queryFn: async () => {
      const res = await apiClient.get(
        `/workflow/${workflowId}/instance/${instanceId}`
      );
      return res.data.data.instance; // FIXED
    },
    enabled: !!workflowId && !!instanceId,
  });

export const useListInstances = (workflowId: string, params?: any) =>
  useQuery({
    queryKey: ["instances", workflowId, params],
    queryFn: async () => {
      const res = await apiClient.get(`/workflow/${workflowId}/instances`, {
        params,
      });
      return res.data.data; // FIXED
    },
    enabled: !!workflowId,
  });

export const useStartInstance = (workflowId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post(
        `/workflow/${workflowId}/instance`,
        data
      );
      console.log("Instance:", data);
      
      return res.data.data.instance; 
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["instances", workflowId] }),
  });
};

export const useMoveInstance = (workflowId: string, instanceId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: MoveInstanceInput) => {
      const res = await apiClient.patch(
        `/workflow/${workflowId}/instance/${instanceId}/move`,
        data
      );
      return res.data.data.updated; // FIXED
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["instance", workflowId, instanceId] });
      qc.invalidateQueries({ queryKey: ["instances", workflowId] });
    },
  });
};

export const useCloseInstance = (workflowId: string, instanceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await apiClient.delete(
        `/workflow/${workflowId}/instance/${instanceId}`
      );
      return res.data.data.closed; // FIXED
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["instances", workflowId] });
    },
  });
};

export const useApproveInstance = (workflowId: string, instanceId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post(
        `/workflow/${workflowId}/instance/${instanceId}/approve`,
        data
      );
      return res.data.data.updated;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["instance", workflowId, instanceId] });
      qc.invalidateQueries({ queryKey: ["instances", workflowId] });
    },
  });
};

export const useRejectInstance = (workflowId: string, instanceId: string) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      const res = await apiClient.post(
        `/workflow/${workflowId}/instance/${instanceId}/reject`,
        data
      );
      return res.data.data.updated;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["instance", workflowId, instanceId] });
      qc.invalidateQueries({ queryKey: ["instances", workflowId] });
    },
  });
};
