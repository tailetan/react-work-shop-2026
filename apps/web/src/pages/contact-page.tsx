import { Container } from "@/components/container";
import { FeatureStrip } from "@/components/feature-strip";
import { PageBanner } from "@/components/page-banner";
import { ContactForm } from "@/features/contact/components/contact-form";
import { ContactInfo } from "@/features/contact/components/contact-info";

export function ContactPage() {
  return (
    <>
      <PageBanner image="/images/common/common-09.png" title="Contact" />

      <section className="py-16 md:py-24">
        <Container max={1058}>
          <div className="mx-auto mb-14 max-w-[644px] text-center md:mb-20">
            <h2 className="text-3xl font-semibold md:text-4xl">Get In Touch With Us</h2>
            <p className="mt-2 text-muted">
              For more information about our product and services, please feel free to drop us an
              email. Our staff will always be there to help you out.
            </p>
          </div>

          <div className="grid gap-14 lg:grid-cols-[393px_1fr]">
            <ContactInfo />
            <ContactForm />
          </div>
        </Container>
      </section>

      <FeatureStrip />
    </>
  );
}
