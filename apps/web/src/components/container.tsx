import { cn } from "@react-workshop/ui/utils";
import type { ReactNode } from "react";

/**
 * The Figma pages are built on fixed content columns that keep a 16px gutter on
 * narrow viewports. The max width is passed as a number because Tailwind cannot
 * generate arbitrary classes from runtime values.
 */
export type ContainerProps = {
  children: ReactNode;
  className?: string;
  max?: number;
};

export function Container({ children, className, max = 1240 }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto", className)}
      style={{ width: `min(${max}px, calc(100% - 32px))` }}
    >
      {children}
    </div>
  );
}
