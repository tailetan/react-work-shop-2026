import { cn } from "@react-workshop/ui/utils";
import type { ReactNode } from "react";
import { Link } from "react-router";
import { routes } from "@/app/routes";
import { badgeToneClass, type ProductBadge } from "../utils/product-badge";

/**
 * Presentation-only card. Both the catalogue (`Product`) and the related-product
 * rows map onto this shape, and prices arrive pre-formatted so the card never
 * has to know about currency rules.
 */
export type ProductCardItem = {
  slug: string;
  name: string;
  description?: string;
  image: string;
  priceText: string;
  originalPriceText?: string;
  badge?: ProductBadge | null;
};

export type ProductCardProps = {
  item: ProductCardItem;
  onAddToCart?: (item: ProductCardItem) => void;
  /** Replaces the default Share / Compare / Like row in the hover overlay. */
  actions?: ReactNode;
};

export function ProductCard({ actions, item, onAddToCart }: ProductCardProps) {
  const href = routes.product(item.slug);

  return (
    <article className="group relative overflow-hidden bg-product">
      {/* Hidden from assistive tech: the heading below links to the same page. */}
      <Link aria-hidden="true" className="block" tabIndex={-1} to={href}>
        <img
          alt={item.name}
          className="h-[301px] w-full object-cover"
          loading="lazy"
          src={item.image}
        />
      </Link>

      {item.badge ? (
        <span
          className={cn(
            "absolute right-6 top-6 grid h-12 w-12 place-items-center rounded-full text-base font-medium text-white",
            badgeToneClass[item.badge.tone]
          )}
        >
          {item.badge.label}
        </span>
      ) : null}

      <div className="p-4">
        <h3 className="text-2xl font-semibold text-dark">
          <Link className="outline-offset-4" to={href}>
            {item.name}
          </Link>
        </h3>
        {item.description ? (
          <p className="mt-2 font-medium text-muted">{item.description}</p>
        ) : null}
        <div className="mt-2 flex flex-wrap items-center gap-4">
          <strong className="text-xl font-semibold text-dark">{item.priceText}</strong>
          {item.originalPriceText ? (
            <span className="text-base text-strike line-through">{item.originalPriceText}</span>
          ) : null}
        </div>
      </div>

      {/* Opacity rather than `hidden` so the overlay also opens on keyboard focus. */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center bg-dark/70 opacity-0 transition-opacity duration-200 group-focus-within:pointer-events-auto group-focus-within:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100">
        <div className="grid justify-items-center gap-6">
          <button
            className="bg-white px-14 py-3 font-semibold text-brand transition-colors hover:bg-beige"
            onClick={() => onAddToCart?.(item)}
            type="button"
          >
            Add to cart
          </button>
          {actions ?? (
            <div className="flex gap-5 font-semibold text-white">
              <span>Share</span>
              <span>Compare</span>
              <span>Like</span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
