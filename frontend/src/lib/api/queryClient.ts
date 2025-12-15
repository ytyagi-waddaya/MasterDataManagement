import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // Data is fresh for 1 min
      gcTime:2 * 60 * 1000, // Data is cached for 2 min
      refetchOnWindowFocus: true, // Refetch when tab is focused
      refetchOnReconnect: true, // Refetch on reconnect
      retry: 2, // Retry twice if failed
    },
    mutations: {
      retry: 1, // Retry once on failure
    },
  },
});
