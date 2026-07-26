import { cn } from "@react-workshop/ui/utils";
import { useState } from "react";
import type { ProductGallery as Gallery } from "@/types/api";

export type ProductGalleryProps = {
  gallery: Gallery;
  name: string;
};

export function ProductGallery({ gallery, name }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(gallery.active);

  return (
    <div className="grid gap-8 sm:grid-cols-[76px_1fr]">
      <div className="grid grid-cols-4 gap-4 sm:grid-cols-1 sm:gap-8">
        {gallery.thumbnails.map((thumbnail, index) => (
          <button
            aria-label={`Show image ${index + 1} of ${name}`}
            aria-pressed={thumbnail === activeImage}
            className={cn(
              "overflow-hidden rounded-[10px] bg-beige transition-all",
              thumbnail === activeImage
                ? "ring-2 ring-brand ring-offset-2"
                : "opacity-80 hover:opacity-100"
            )}
            key={`${thumbnail}-${index}`}
            onClick={() => setActiveImage(thumbnail)}
            type="button"
          >
            <img alt="" className="h-20 w-full object-cover" src={thumbnail} />
          </button>
        ))}
      </div>

      <div className="grid min-h-[340px] place-items-center rounded-[10px] bg-beige p-6 md:min-h-[500px] md:p-8">
        <img
          alt={name}
          className="max-h-[300px] w-full object-contain md:max-h-[430px]"
          src={activeImage}
        />
      </div>
    </div>
  );
}
