import { cn } from "@react-workshop/ui/utils";

export type PaginationProps = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

const buttonClass =
  "grid h-[60px] min-w-[60px] place-items-center rounded-[10px] px-6 text-xl transition-colors";

export function Pagination({ onChange, page, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="mt-16 flex flex-wrap justify-center gap-4 md:gap-9">
      {page > 1 ? (
        <button
          className={cn(buttonClass, "bg-beige px-7 hover:bg-brand hover:text-white")}
          onClick={() => onChange(page - 1)}
          type="button"
        >
          Prev
        </button>
      ) : null}

      {pages.map((item) => (
        <button
          aria-current={item === page ? "page" : undefined}
          className={cn(
            buttonClass,
            item === page ? "bg-brand text-white" : "bg-beige hover:bg-brand hover:text-white"
          )}
          key={item}
          onClick={() => onChange(item)}
          type="button"
        >
          {item}
        </button>
      ))}

      {page < totalPages ? (
        <button
          className={cn(buttonClass, "bg-beige px-7 hover:bg-brand hover:text-white")}
          onClick={() => onChange(page + 1)}
          type="button"
        >
          Next
        </button>
      ) : null}
    </nav>
  );
}
