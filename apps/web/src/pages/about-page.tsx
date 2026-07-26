import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";
import { FeatureStrip } from "@/components/feature-strip";
import { PageBanner } from "@/components/page-banner";

const pillars = [
  {
    title: "Premium Material",
    description: "Durable surfaces and textiles made for daily use."
  },
  {
    title: "Room Collections",
    description: "Coordinated pieces for fast and confident styling."
  },
  {
    title: "Reliable Support",
    description: "Delivery, warranty, and care help when you need it."
  }
];

export function AboutPage() {
  return (
    <>
      <PageBanner image="/images/home/home-20.png" title="About" />

      <section className="py-16 md:py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2" max={1180}>
          <img
            alt="Furniro showroom"
            className="h-[360px] w-full rounded-[10px] object-cover md:h-[520px]"
            src="/images/home/home-07.jpg"
          />

          <div>
            <p className="mb-3 font-semibold tracking-[3px] text-brand">Furniro Studio</p>
            <h2 className="mb-6 text-[32px] font-bold leading-tight md:text-[42px]">
              Designed around calm, useful rooms.
            </h2>
            <p className="mb-5 leading-8 text-muted">
              Furniro brings together room-ready furniture, soft materials, and simple silhouettes
              inspired by the original interior commerce design.
            </p>
            <p className="leading-8 text-muted">
              The collection covers living, dining, bedroom, and decorative essentials with
              consistent quality and support.
            </p>
            <Link
              className="mt-8 inline-flex bg-brand px-9 py-3 font-semibold text-white transition-colors hover:bg-brand-dark"
              to={routes.shop}
            >
              Explore the collection
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-beige py-16">
        <Container className="grid gap-8 md:grid-cols-3" max={1180}>
          {pillars.map((pillar) => (
            <article className="bg-white p-8" key={pillar.title}>
              <h3 className="mb-3 text-2xl font-semibold">{pillar.title}</h3>
              <p className="text-muted">{pillar.description}</p>
            </article>
          ))}
        </Container>
      </section>

      <FeatureStrip />
    </>
  );
}
