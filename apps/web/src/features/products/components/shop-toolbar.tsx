import { cn } from "@react-workshop/ui/utils";
import { useId, useState } from "react";
import { Container } from "@/components/container";
import { FilterIcon, GridViewIcon, ListViewIcon } from "@/components/icons";
import type { Category } from "@/types/api";
import {
  PER_PAGE_OPTIONS,
  SORT_OPTIONS,
  type ShopFilters,
  type SortOption
} from "../utils/filter-products";

export type ShopToolbarProps = {
  filters: ShopFilters;
  categories: Category[];
  from: number;
  to: number;
  total: number;
  onChange: (next: Partial<ShopFilters>) => void;
};

export function ShopToolbar({
  categories,
  filters,
  from,
  onChange,
  to,
  total
}: ShopToolbarProps) {
  const showId = useId();
  const sortId = useId();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <section className="bg-beige py-8">
      <Container className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap items-center gap-6">
          <button
            aria-expanded={isFilterOpen}
            className="flex items-center gap-3 text-xl transition-colors hover:text-brand"
            onClick={() => setIsFilterOpen((open) => !open)}
            type="button"
          >
            <FilterIcon className="h-6 w-6" />
            Filter
          </button>

          {/* Static in the design; kept for layout parity. */}
          <GridViewIcon aria-hidden="true" className="h-6 w-6 text-dark" />
          <ListViewIcon aria-hidden="true" className="h-6 w-6 text-dark" />

          <span aria-hidden="true" className="hidden h-9 w-px bg-[#9f9f9f] sm:block" />
          <span>
            {total === 0 ? "No results" : `Showing ${from}-${to} of ${total} results`}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-4" htmlFor={showId}>
            Show
            <select
              className="h-[55px] w-[80px] bg-white px-3 text-xl text-muted"
              id={showId}
              onChange={(event) => onChange({ perPage: Number(event.target.value) })}
              value={filters.perPage}
            >
              {PER_PAGE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-4" htmlFor={sortId}>
            Sort by
            <select
              className="h-[55px] w-[188px] bg-white px-5 text-lg text-muted"
              id={sortId}
              onChange={(event) => onChange({ sort: event.target.value as SortOption })}
              value={filters.sort}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </Container>

      {isFilterOpen ? (
        <Container className="mt-6 flex flex-wrap items-center gap-3">
          <CategoryChip
            isActive={filters.category === ""}
            label="All"
            onClick={() => onChange({ category: "" })}
          />
          {categories.map((category) => (
            <CategoryChip
              isActive={filters.category === category.slug}
              key={category.slug}
              label={`${category.name} (${category.productCount})`}
              onClick={() => onChange({ category: category.slug })}
            />
          ))}
        </Container>
      ) : null}
    </section>
  );
}

function CategoryChip({
  isActive,
  label,
  onClick
}: {
  isActive: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-pressed={isActive}
      className={cn(
        "rounded-[8px] border px-4 py-2 text-sm font-medium transition-colors",
        isActive
          ? "border-brand bg-brand text-white"
          : "border-line bg-white text-dark hover:border-brand hover:text-brand"
      )}
      onClick={onClick}
      type="button"
    >
      {label}
    </button>
  );
}
