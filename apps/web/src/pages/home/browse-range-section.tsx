import { Link } from "react-router";
import { routes } from "@/app/routes";
import { Container } from "@/components/container";

const ranges = [
  { label: "Dining", image: "/images/home/home-04.png" },
  { label: "Living", image: "/images/home/home-08.png" },
  { label: "Bedroom", image: "/images/home/home-12.png" }
];

export function BrowseRangeSection() {
  return (
    <section className="py-14">
      <Container max={1183}>
        <div className="mb-12 text-center">
          <h2 className="text-[32px] font-bold text-[#333]">Browse The Range</h2>
          <p className="text-xl text-[#666]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {ranges.map((range) => (
            <Link className="group text-center" key={range.label} to={routes.shop}>
              <img
                alt={range.label}
                className="h-[320px] w-full rounded-[10px] object-cover transition-transform duration-300 group-hover:scale-[1.02] md:h-[480px]"
                loading="lazy"
                src={range.image}
              />
              <h3 className="mt-7 text-2xl font-semibold text-[#333]">{range.label}</h3>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
