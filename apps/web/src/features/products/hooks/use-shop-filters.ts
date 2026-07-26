import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import {
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
  type ShopFilters,
  type SortOption
} from "../utils/filter-products";

export const DEFAULT_PER_PAGE = 8;

function parseSort(value: string | null): SortOption {
  return SORT_OPTIONS.some((option) => option.value === value)
    ? (value as SortOption)
    : "default";
}

function parsePerPage(value: string | null): number {
  const parsed = Number(value);

  return PER_PAGE_OPTIONS.includes(parsed as (typeof PER_PAGE_OPTIONS)[number])
    ? parsed
    : DEFAULT_PER_PAGE;
}

function parsePage(value: string | null): number {
  const parsed = Number(value);

  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

/**
 * Shop state lives in the URL so a filtered view is shareable and the back
 * button works. Defaults are removed from the query string to keep it short,
 * and changing anything other than the page returns to page 1.
 */
export function useShopFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo<ShopFilters>(
    () => ({
      search: searchParams.get("search") ?? "",
      category: searchParams.get("category") ?? "",
      sort: parseSort(searchParams.get("sort")),
      perPage: parsePerPage(searchParams.get("show")),
      page: parsePage(searchParams.get("page"))
    }),
    [searchParams]
  );

  const update = useCallback(
    (next: Partial<ShopFilters>) => {
      setSearchParams(
        (current) => {
          const params = new URLSearchParams(current);

          const apply = (name: string, value: string, isDefault: boolean) => {
            if (isDefault) {
              params.delete(name);
            } else {
              params.set(name, value);
            }
          };

          if (next.search !== undefined) {
            apply("search", next.search.trim(), next.search.trim() === "");
          }

          if (next.category !== undefined) {
            apply("category", next.category, next.category === "");
          }

          if (next.sort !== undefined) {
            apply("sort", next.sort, next.sort === "default");
          }

          if (next.perPage !== undefined) {
            apply("show", String(next.perPage), next.perPage === DEFAULT_PER_PAGE);
          }

          if (next.page === undefined) {
            params.delete("page");
          } else {
            apply("page", String(next.page), next.page <= 1);
          }

          return params;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );

  return { filters, update };
}
