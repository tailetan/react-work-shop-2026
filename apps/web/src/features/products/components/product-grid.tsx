import { ProductCard, type ProductCardItem } from "./product-card";

export type ProductGridProps = {
  items: ProductCardItem[];
  onAddToCart?: (item: ProductCardItem) => void;
};

/** The 4-up product grid shared by Home, Shop and Related Products. */
export function ProductGrid({ items, onAddToCart }: ProductGridProps) {
  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <ProductCard item={item} key={item.slug} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}
