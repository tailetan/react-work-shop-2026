import type { ComponentType } from "react";
import { ClockIcon, MapPinIcon, PhoneIcon, type IconProps } from "@/components/icons";

type InfoBlock = {
  Icon: ComponentType<IconProps>;
  title: string;
  lines: string[];
};

const blocks: InfoBlock[] = [
  {
    Icon: MapPinIcon,
    title: "Address",
    lines: ["236 5th SE Avenue, New York NY10000, United States"]
  },
  {
    Icon: PhoneIcon,
    title: "Phone",
    lines: ["Mobile: +(84) 546-6789", "Hotline: +(84) 456-6789"]
  },
  {
    Icon: ClockIcon,
    title: "Working Time",
    lines: ["Monday-Friday: 9:00 - 22:00", "Saturday-Sunday: 9:00 - 21:00"]
  }
];

export function ContactInfo() {
  return (
    <aside className="grid content-start gap-10 md:px-8">
      {blocks.map(({ Icon, lines, title }) => (
        <div className="flex gap-5" key={title}>
          <Icon className="mt-1 h-6 w-6 shrink-0" />
          <div>
            <h3 className="text-2xl font-medium">{title}</h3>
            <div className="mt-2 max-w-[240px]">
              {lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>
        </div>
      ))}
    </aside>
  );
}
