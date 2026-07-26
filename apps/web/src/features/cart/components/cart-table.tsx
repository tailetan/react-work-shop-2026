import { Link } from "react-router";
import { routes } from "@/app/routes";
import { TrashIcon } from "@/components/icons";
import { formatPrice } from "@/utils/format";
import type { CartLine } from "../stores/cart-store";
import { MAX_LINE_QUANTITY, MIN_LINE_QUANTITY } from "../stores/cart-store";

export type CartTableProps = {
  lines: CartLine[];
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

function describeVariant(line: CartLine): string | null {
  const parts = [line.size ? `Size ${line.size.toUpperCase()}` : null, line.color].filter(
    Boolean
  );

  return parts.length > 0 ? parts.join(" / ") : null;
}

export function CartTable({ lines, onQuantityChange, onRemove }: CartTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px]">
        <thead className="bg-beige">
          <tr>
            <th className="px-6 py-4 text-left font-medium">Product</th>
            <th className="px-6 py-4 text-left font-medium">Price</th>
            <th className="px-6 py-4 text-left font-medium">Quantity</th>
            <th className="px-6 py-4 text-left font-medium">Subtotal</th>
            <th className="px-6 py-4">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {lines.map((line) => {
            const variant = describeVariant(line);

            return (
              <tr key={line.id}>
                <td className="px-6 py-10">
                  <div className="flex items-center gap-6">
                    <img
                      alt={line.name}
                      className="h-[105px] w-[105px] shrink-0 rounded-[10px] bg-beige object-cover"
                      src={line.image}
                    />
                    <div>
                      <Link
                        className="text-muted transition-colors hover:text-brand"
                        to={routes.product(line.slug)}
                      >
                        {line.name}
                      </Link>
                      {variant ? (
                        <p className="mt-1 text-sm text-muted">{variant}</p>
                      ) : null}
                    </div>
                  </div>
                </td>

                <td className="px-6 py-10 text-muted">{formatPrice(line.price)}</td>

                <td className="px-6 py-10">
                  <label className="sr-only" htmlFor={`quantity-${line.id}`}>
                    Quantity for {line.name}
                  </label>
                  <input
                    className="h-10 w-14 rounded border border-muted text-center"
                    id={`quantity-${line.id}`}
                    max={MAX_LINE_QUANTITY}
                    min={MIN_LINE_QUANTITY}
                    onChange={(event) => {
                      const next = Number(event.target.value);

                      // Ignore empty or non-numeric input instead of dropping the line.
                      if (Number.isInteger(next) && next >= MIN_LINE_QUANTITY) {
                        onQuantityChange(line.id, next);
                      }
                    }}
                    type="number"
                    value={line.quantity}
                  />
                </td>

                <td className="px-6 py-10">{formatPrice(line.price * line.quantity)}</td>

                <td className="px-6 py-10">
                  <button
                    aria-label={`Remove ${line.name} from cart`}
                    className="text-brand transition-colors hover:text-brand-dark"
                    onClick={() => onRemove(line.id)}
                    type="button"
                  >
                    <TrashIcon className="h-6 w-6" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
