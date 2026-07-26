import type { ComponentType } from "react";
import { Container } from "./container";
import {
  GuaranteeIcon,
  ShippingIcon,
  SupportIcon,
  TrophyIcon,
  type IconProps
} from "./icons";

type Feature = {
  Icon: ComponentType<IconProps>;
  title: string;
  description: string;
};

const features: Feature[] = [
  { Icon: TrophyIcon, title: "High Quality", description: "crafted from top materials" },
  { Icon: GuaranteeIcon, title: "Warranty Protection", description: "Over 2 years" },
  { Icon: ShippingIcon, title: "Free Shipping", description: "Order over 150 $" },
  { Icon: SupportIcon, title: "24 / 7 Support", description: "Dedicated support" }
];

/** Reassurance band repeated at the bottom of the inner pages. */
export function FeatureStrip() {
  return (
    <section className="bg-shell py-[38px]">
      <Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" max={1334}>
        {features.map(({ Icon, title, description }) => (
          <div className="flex items-center gap-3 text-[#242424]" key={title}>
            <Icon className="h-12 w-12 shrink-0" />
            <div>
              <h3 className="text-xl font-semibold leading-tight xl:text-[25px]">{title}</h3>
              <p className="text-base font-medium text-muted xl:text-xl">{description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}
