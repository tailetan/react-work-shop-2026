import { Fragment } from "react";
import { Link } from "react-router";
import type { BreadcrumbItem } from "@/types/api";
import { Container } from "./container";

/** Beige breadcrumb strip used at the top of the product detail page. */
export function BreadcrumbBar({ items }: { items: BreadcrumbItem[] }) {
  return (
    <section className="bg-beige py-8">
      <Container>
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-4 text-muted md:gap-6"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <Fragment key={`${item.label}-${index}`}>
                {item.href && !isLast ? (
                  <>
                    <Link className="transition-colors hover:text-brand" to={item.href}>
                      {item.label}
                    </Link>
                    <span aria-hidden="true">&gt;</span>
                  </>
                ) : (
                  <>
                    <span aria-hidden="true" className="hidden h-9 w-px bg-muted sm:block" />
                    <span className="text-black">{item.label}</span>
                  </>
                )}
              </Fragment>
            );
          })}
        </nav>
      </Container>
    </section>
  );
}
