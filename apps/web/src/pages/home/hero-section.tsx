import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";

export function HeroSection() {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-beige md:min-h-[716px]">
      <img
        alt="Furnished living room"
        className="absolute inset-0 h-full w-full object-cover"
        src="/images/home/home-22.jpg"
      />

      <Container className="relative grid min-h-[560px] items-center justify-items-end py-12 md:min-h-[716px]">
        <div className="w-full max-w-[643px] rounded-[10px] bg-cream px-8 py-12 md:px-14 md:py-16">
          <p className="mb-1 font-semibold tracking-[3px]">New Arrival</p>
          <h1 className="mb-4 text-[32px] font-bold leading-[1.25] text-brand sm:text-[40px] md:text-[52px]">
            Discover Our New Collection
          </h1>
          <p className="mb-11 text-lg font-medium leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis.
          </p>
          <Link
            className="inline-flex bg-brand px-10 py-5 font-bold uppercase text-white transition-colors hover:bg-brand-dark md:px-[72px] md:py-6"
            to={routes.shop}
          >
            Buy Now
          </Link>
        </div>
      </Container>
    </section>
  );
}
