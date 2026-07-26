import { BrowseRangeSection } from "./home/browse-range-section";
import { HeroSection } from "./home/hero-section";
import { InspirationSection } from "./home/inspiration-section";
import { OurProductsSection } from "./home/our-products-section";
import { SetupGallerySection } from "./home/setup-gallery-section";

export function HomePage() {
  return (
    <>
      <HeroSection />
      <BrowseRangeSection />
      <OurProductsSection />
      <InspirationSection />
      <SetupGallerySection />
    </>
  );
}
