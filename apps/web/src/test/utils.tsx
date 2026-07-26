import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, type RenderResult } from "@testing-library/react";
import type { ReactElement } from "react";
import { MemoryRouter, Route, Routes } from "react-router";

export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false }
    }
  });
}

export type RenderOptions = {
  /** Initial history entry, e.g. "/product/asgaard-sofa?search=sofa". */
  route?: string;
  /** Route pattern to mount `ui` under, required when the page reads params. */
  path?: string;
};

/** Return type is explicit so it never leaks a pnpm store path. */
export type RenderWithProvidersResult = RenderResult & { queryClient: QueryClient };

export function renderWithProviders(
  ui: ReactElement,
  options: RenderOptions = {}
): RenderWithProvidersResult {
  const { path, route = "/" } = options;
  const queryClient = createTestQueryClient();

  const tree = path ? <Routes>{<Route element={ui} path={path} />}</Routes> : ui;

  return {
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{tree}</MemoryRouter>
      </QueryClientProvider>
    )
  };
}
