"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import apiClient from "@/lib/api/apiClient";
import { useDebounce } from "@/hooks/useDebounce";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: any;
}

export interface NotificationResponse {
  notifications: {
    data: NotificationItem[];
    total: number;
    page: number;
    pageSize: number;
  };
}

/* -------------------------------------------------------------
   GET NOTIFICATIONS WITH PAGINATION + SEARCH
-------------------------------------------------------------- */
export function useNotifications({
  userId,
  page,
  limit,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  userId: string;
  page: number;
  limit: number;
  search: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) {
  const debouncedSearch = useDebounce(search, 500);

  return useQuery<NotificationResponse>({
    queryKey: [
      "notifications",
      userId,
      page,
      limit,
      debouncedSearch,
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
      };

      const res = await apiClient.get(`/notifications/user/${userId}`, {
        params,
      });

      const notifications = res.data.data.notifications ?? [];

      return {
        notifications: {
          data: notifications,
          total: notifications.length,
          page,
          pageSize: limit,
        },
      };
    },
    placeholderData: (old) => old,
  });
}

/* -------------------------------------------------------------
   MARK SINGLE NOTIFICATION READ
-------------------------------------------------------------- */
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.patch(`/notifications/${id}/read`);
      return res.data;
    },
    onSuccess: (_, id) => {
      toast.success("Marked as read");

      // Update cache
      queryClient.setQueryData(["notifications"], (old: any) => {
        if (!old) return old;

        return {
          ...old,
          notifications: {
            ...old.notifications,
            data: old.notifications.data.map((n: any) =>
              n.id === id ? { ...n, read: true } : n
            ),
          },
        };
      });
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to mark notification read");
    },
  });
}

/* -------------------------------------------------------------
   MARK ALL READ
-------------------------------------------------------------- */
export function useMarkAllNotificationsRead(userId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // You can add bulk mark-read in backend later; for now do one-by-one
      const res = await apiClient.get(`/notifications/user/${userId}`);
      const items = res.data.data.notifications ?? [];

      await Promise.all(
        items.map((n: any) => apiClient.patch(`/notifications/${n.id}/read`))
      );

      return true;
    },
    onSuccess: () => {
      toast.success("All notifications marked read");

      queryClient.invalidateQueries({
        queryKey: ["notifications", userId],
      });
    },
  });
}
