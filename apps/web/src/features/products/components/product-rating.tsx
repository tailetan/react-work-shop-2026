import { StarIcon } from "@/components/icons";

export type ProductRatingProps = {
  rating: number;
  reviewLabel: string;
};

const MAX_STARS = 5;

export function ProductRating({ rating, reviewLabel }: ProductRatingProps) {
  const filledStars = Math.round(rating);

  return (
    <div className="mt-4 flex flex-wrap items-center gap-4">
      <span
        aria-label={`Rated ${rating} out of ${MAX_STARS}`}
        className="flex items-center gap-1 text-[#ffc700]"
        role="img"
      >
        {Array.from({ length: MAX_STARS }, (_, index) => (
          <StarIcon className="h-5 w-5" filled={index < filledStars} key={index} />
        ))}
      </span>

      <span aria-hidden="true" className="h-8 w-px bg-muted" />
      <span className="text-sm text-muted">{reviewLabel}</span>
    </div>
  );
}
