import { Link } from "react-router";
import { primaryNavigation } from "../app/routes";
import { Container } from "../components/container";
import { NewsletterForm } from "../components/newsletter-form";

const helpLinks = ["Payment Options", "Returns", "Privacy Policies"];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-white pt-12">
      <Container className="grid gap-10 pb-12 lg:grid-cols-[2fr_1fr_1fr_2fr]">
        <div>
          <h2 className="mb-12 text-2xl font-bold">Furniro.</h2>
          <p className="max-w-[285px] text-muted">
            364 Cong Hoa Street, Tan Binh District
          </p>
        </div>

        <nav aria-label="Footer links">
          <h3 className="mb-10 text-muted">Links</h3>
          <div className="grid gap-9 font-medium">
            {primaryNavigation.map((item) => (
              <Link className="transition-colors hover:text-brand" key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <div>
          <h3 className="mb-10 text-muted">Help</h3>
          <div className="grid gap-9 font-medium">
            {helpLinks.map((label) => (
              <span key={label}>{label}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-10 text-muted">Newsletter</h3>
          <NewsletterForm />
        </div>
      </Container>

      <Container className="border-t border-line py-9 text-sm">
        2026 Furniro by Tai Le Tan. All rights reserved
      </Container>
    </footer>
  );
}
