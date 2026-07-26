import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QuantityStepper } from "./quantity-stepper";

describe("QuantityStepper", () => {
  it("shows the current value", () => {
    render(<QuantityStepper onChange={vi.fn()} value={3} />);

    expect(screen.getByLabelText("Quantity")).toHaveTextContent("3");
  });

  it("increments and decrements", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<QuantityStepper onChange={onChange} value={3} />);

    await user.click(screen.getByRole("button", { name: /increase quantity/i }));
    expect(onChange).toHaveBeenCalledWith(4);

    await user.click(screen.getByRole("button", { name: /decrease quantity/i }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it("disables the controls at the bounds", () => {
    const { unmount } = render(<QuantityStepper max={5} min={1} onChange={vi.fn()} value={1} />);
    expect(screen.getByRole("button", { name: /decrease/i })).toBeDisabled();
    unmount();

    render(<QuantityStepper max={5} min={1} onChange={vi.fn()} value={5} />);
    expect(screen.getByRole("button", { name: /increase/i })).toBeDisabled();
  });

  it("uses a custom label for assistive tech", () => {
    render(<QuantityStepper label="Quantity for Sofa" onChange={vi.fn()} value={1} />);

    expect(screen.getByLabelText("Quantity for Sofa")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Increase quantity for sofa" })
    ).toBeInTheDocument();
  });
});
