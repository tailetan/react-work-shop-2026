import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";

export function NotFoundPage() {
  return (
    <Container className="grid place-items-center gap-6 py-32 text-center">
      <p className="font-semibold tracking-[3px] text-brand">404</p>
      <h1 className="text-[32px] font-bold text-dark md:text-[42px]">Page not found</h1>
      <p className="max-w-[420px] text-muted">
        The page you are looking for has moved or never existed. Browse the shop to find your next
        piece.
      </p>
      <Link
        className="inline-flex rounded-[15px] border border-black px-12 py-3 text-xl transition-colors hover:bg-black hover:text-white"
        to={routes.shop}
      >
        Back to shop
      </Link>
    </Container>
  );
}
