import { cn } from "@react-workshop/ui/utils";
import { Container } from "@/components/container";

/**
 * The "#FuniroFurniture" collage from the Figma home page. Spans are literal
 * class strings so Tailwind can pick them up at build time.
 */
const shots = [
  { src: "/images/home/home-13.png", alt: "Styled corner seat", span: "md:row-span-2" },
  { src: "/images/home/home-17.png", alt: "Dining table detail", span: "" },
  { src: "/images/home/home-14.png", alt: "Living room set", span: "" },
  { src: "/images/home/home-15.png", alt: "Bedroom styling", span: "md:row-span-2" },
  { src: "/images/home/home-05.png", alt: "Shelf arrangement", span: "" },
  { src: "/images/home/home-18.png", alt: "Lounge chair detail", span: "" }
];

export function SetupGallerySection() {
  return (
    <section className="py-14">
      <Container max={1440}>
        <div className="mb-8 text-center">
          <p className="text-lg font-semibold text-[#616161] md:text-xl">
            Share your setup with
          </p>
          <h2 className="text-[32px] font-bold text-dark md:text-[40px]">#FuniroFurniture</h2>
        </div>

        <div className="grid grid-cols-2 gap-4 md:h-[560px] md:grid-cols-4 md:grid-rows-2">
          {shots.map((shot) => (
            <img
              alt={shot.alt}
              className={cn(
                "aspect-square h-full w-full rounded-[6px] object-cover md:aspect-auto",
                shot.span
              )}
              key={shot.src}
              loading="lazy"
              src={shot.src}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
