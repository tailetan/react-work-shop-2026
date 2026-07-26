import { Link } from "react-router";
import { routes } from "@/app/routes";
import { formatPrice } from "@/utils/format";

export type CartTotalsProps = {
  subtotal: number;
  total: number;
};

export function CartTotals({ subtotal, total }: CartTotalsProps) {
  return (
    <aside className="self-start bg-beige px-8 py-8 md:px-12">
      <h2 className="mb-10 text-center text-[28px] font-semibold md:mb-14 md:text-[32px]">
        Cart Totals
      </h2>

      <div className="grid gap-8">
        <div className="flex justify-between gap-4">
          <span className="font-medium">Subtotal</span>
          <span className="text-muted">{formatPrice(subtotal)}</span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="font-medium">Total</span>
          <span className="text-xl font-medium text-brand">{formatPrice(total)}</span>
        </div>

        <Link
          className="mx-auto mt-4 inline-flex rounded-[15px] border border-black px-10 py-3 text-xl transition-colors hover:bg-black hover:text-white md:px-14"
          to={routes.checkout}
        >
          Check Out
        </Link>
      </div>
    </aside>
  );
}
