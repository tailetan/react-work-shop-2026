import { Fragment } from "react";
import { Link } from "react-router";
import { routes } from "../app/routes";

export type BannerTrailItem = {
  label: string;
  to?: string;
};

export type PageBannerProps = {
  title: string;
  image: string;
  trail?: BannerTrailItem[];
};

/**
 * Shared hero used by every inner page: a washed-out room photo with the
 * Furniro mark, the page title and a breadcrumb.
 */
export function PageBanner({ image, title, trail }: PageBannerProps) {
  const items: BannerTrailItem[] = trail ?? [
    { label: "Home", to: routes.home },
    { label: title }
  ];

  return (
    <section className="relative grid min-h-[220px] place-items-center overflow-hidden md:min-h-[316px]">
      <img alt="" className="absolute inset-0 h-full w-full object-cover" src={image} />
      <div className="absolute inset-0 bg-white/55 backdrop-blur-[1px]" />

      <div className="relative px-4 text-center">
        <img
          alt=""
          className="mx-auto mb-1 h-12 w-12 object-contain"
          height={48}
          src="/images/common/common-01.png"
          width={48}
        />
        <h1 className="text-4xl font-medium md:text-5xl">{title}</h1>

        <nav aria-label="Breadcrumb" className="mt-3 font-medium">
          {items.map((item, index) => (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? (
                <span aria-hidden="true" className="mx-2">
                  &gt;
                </span>
              ) : null}
              {item.to ? (
                <Link className="transition-colors hover:text-brand" to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className="font-light">{item.label}</span>
              )}
            </Fragment>
          ))}
        </nav>
      </div>
    </section>
  );
}
