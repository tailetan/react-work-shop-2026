import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";
import { ArrowRightIcon } from "@/components/icons";

export function InspirationSection() {
  return (
    <section className="bg-sand py-11">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <h2 className="text-[32px] font-bold leading-tight text-dark md:text-[40px]">
            50+ Beautiful rooms inspiration
          </h2>
          <p className="mt-2 max-w-[370px] font-medium leading-6 text-[#616161]">
            Our designer already made a lot of beautiful prototype of rooms that inspire you.
          </p>
          <Link
            className="mt-6 inline-flex bg-brand px-9 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
            to={routes.shop}
          >
            Explore More
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-[404px_1fr]">
          <div className="relative">
            <img
              alt="Bed room inspiration"
              className="h-[420px] w-full object-cover md:h-[582px]"
              loading="lazy"
              src="/images/home/home-10.png"
            />
            <div className="absolute bottom-6 left-6 flex">
              <div className="bg-white/80 px-6 py-6 md:px-8 md:py-8">
                <p className="text-[#616161]">01 - Bed Room</p>
                <h3 className="mt-2 text-2xl font-semibold text-dark md:text-[28px]">
                  Inner Peace
                </h3>
              </div>
              <Link
                aria-label="View bed room inspiration"
                className="grid w-12 shrink-0 place-items-center self-end bg-brand py-4 text-white transition-colors hover:bg-brand-dark"
                to={routes.shop}
              >
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <img
            alt="Room inspiration"
            className="hidden h-[486px] w-full object-cover md:block"
            loading="lazy"
            src="/images/home/home-11.png"
          />
        </div>
      </Container>
    </section>
  );
}
