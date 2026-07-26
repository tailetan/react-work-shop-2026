import { cn } from "@react-workshop/ui/utils";
import { MinusIcon, PlusIcon } from "./icons";

export type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  /** Names the control for assistive tech, e.g. "Quantity for Asgaard Sofa". */
  label?: string;
};

export function QuantityStepper({
  className,
  label = "Quantity",
  max = 99,
  min = 1,
  onChange,
  value
}: QuantityStepperProps) {
  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div
      className={cn(
        "flex h-16 items-center rounded-[10px] border border-muted",
        className
      )}
    >
      <button
        aria-label={`Decrease ${label.toLowerCase()}`}
        className="grid h-full place-items-center px-4 transition-colors hover:text-brand disabled:opacity-40"
        disabled={value <= min}
        onClick={decrease}
        type="button"
      >
        <MinusIcon className="h-4 w-4" />
      </button>

      <output aria-label={label} className="min-w-8 px-3 text-center font-medium">
        {value}
      </output>

      <button
        aria-label={`Increase ${label.toLowerCase()}`}
        className="grid h-full place-items-center px-4 transition-colors hover:text-brand disabled:opacity-40"
        disabled={value >= max}
        onClick={increase}
        type="button"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
