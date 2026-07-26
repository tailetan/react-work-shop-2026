import { QueryClient } from "@tanstack/react-query";

/**
 * Factory rather than a module-level singleton so each test (and each render
 * root) gets an isolated cache.
 */
export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        staleTime: 60_000,
        refetchOnWindowFocus: false
      }
    }
  });
}
