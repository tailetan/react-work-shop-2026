import { cn } from "@react-workshop/ui/utils";
import { useState } from "react";
import { Link } from "react-router";
import { routes } from "@/app/routes";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  type IconProps
} from "@/components/icons";
import { QuantityStepper } from "@/components/quantity-stepper";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { detailToCartInput } from "@/features/cart/utils/to-cart-input";
import type { ProductDetail } from "@/types/api";
import { formatPrice } from "@/utils/format";
import { ProductRating } from "./product-rating";

const shareIcons: Record<string, (props: IconProps) => React.JSX.Element> = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon
};

/**
 * Size, colour and quantity are transient UI state, so they stay local. The
 * page remounts this component per slug (`key`), which resets the selection.
 */
export function ProductSummary({ detail }: { detail: ProductDetail }) {
  const addLine = useCartStore((state) => state.addLine);

  const [size, setSize] = useState(
    () => detail.sizes.find((option) => option.selected)?.value ?? detail.sizes[0]?.value ?? null
  );
  const [color, setColor] = useState(
    () => detail.colors.find((option) => option.selected)?.name ?? detail.colors[0]?.name ?? null
  );
  const [quantity, setQuantity] = useState(detail.quantity.default);
  const [justAdded, setJustAdded] = useState(false);

  function handleAddToCart() {
    addLine(detailToCartInput(detail, { size, color, quantity }));
    setJustAdded(true);
  }

  return (
    <div>
      <h1 className="text-[32px] font-normal md:text-[42px]">{detail.name}</h1>
      <p className="mt-2 text-2xl font-medium text-muted">{detail.priceText}</p>
      {detail.originalPrice && detail.originalPrice > detail.price ? (
        <p className="mt-1 text-lg text-strike line-through">
          {formatPrice(detail.originalPrice)}
        </p>
      ) : null}

      <ProductRating rating={detail.rating} reviewLabel={detail.reviewLabel} />

      <p className="mt-5 max-w-[424px] text-sm leading-6">{detail.shortDescription}</p>

      {detail.sizes.length > 0 ? (
        <div className="mt-6">
          <p className="mb-3 text-sm text-muted" id="size-label">
            Size
          </p>
          <div aria-labelledby="size-label" className="flex gap-4" role="group">
            {detail.sizes.map((option) => (
              <button
                aria-pressed={size === option.value}
                className={cn(
                  "h-[30px] w-[30px] rounded text-sm transition-colors",
                  size === option.value ? "bg-brand text-white" : "bg-beige hover:bg-cream"
                )}
                key={option.value}
                onClick={() => setSize(option.value)}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {detail.colors.length > 0 ? (
        <div className="mt-5">
          <p className="mb-3 text-sm text-muted" id="color-label">
            Color
          </p>
          <div aria-labelledby="color-label" className="flex gap-4" role="group">
            {detail.colors.map((option) => (
              <button
                aria-label={option.name}
                aria-pressed={color === option.name}
                className={cn(
                  "h-[30px] w-[30px] rounded-full transition-all",
                  color === option.name && "ring-2 ring-dark ring-offset-2"
                )}
                key={option.name}
                onClick={() => setColor(option.name)}
                style={{ backgroundColor: option.value }}
                type="button"
              />
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap gap-5 border-b border-line pb-14">
        <QuantityStepper
          label={`Quantity for ${detail.name}`}
          max={detail.quantity.max}
          min={detail.quantity.min}
          onChange={setQuantity}
          value={quantity}
        />

        <button
          className="inline-flex h-16 items-center rounded-[15px] border border-black px-8 text-lg transition-colors hover:bg-black hover:text-white md:px-12 md:text-xl"
          onClick={handleAddToCart}
          type="button"
        >
          Add To Cart
        </button>

        <Link
          className="inline-flex h-16 items-center rounded-[15px] border border-black px-8 text-lg transition-colors hover:bg-black hover:text-white md:px-12 md:text-xl"
          to={routes.shop}
        >
          + Compare
        </Link>
      </div>

      {justAdded ? (
        <p className="mt-4 text-sm font-medium text-fresh" role="status">
          Added to your cart.{" "}
          <Link className="underline" to={routes.cart}>
            View cart
          </Link>
        </p>
      ) : null}

      <dl className="mt-10 grid gap-3 text-muted">
        <div className="flex gap-2">
          <dt className="min-w-[86px]">SKU</dt>
          <dd>: {detail.meta.sku}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="min-w-[86px]">Category</dt>
          <dd>: {detail.meta.category}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="min-w-[86px]">Tags</dt>
          <dd>: {detail.meta.tags.join(", ")}</dd>
        </div>
        <div className="flex items-center gap-2">
          <dt className="min-w-[86px]">Share</dt>
          <dd className="flex items-center gap-3">
            <span aria-hidden="true">:</span>
            {detail.share.map((target) => {
              const ShareIcon = shareIcons[target.platform];

              return ShareIcon ? (
                <span key={target.platform} title={target.label}>
                  <ShareIcon aria-label={target.label} className="h-5 w-5 text-black" />
                </span>
              ) : null;
            })}
          </dd>
        </div>
      </dl>
    </div>
  );
}
