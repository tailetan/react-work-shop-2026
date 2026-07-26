import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("renders nothing for a single page", () => {
    const { container } = render(<Pagination onChange={vi.fn()} page={1} totalPages={1} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("marks the current page and hides Prev on the first page", () => {
    render(<Pagination onChange={vi.fn()} page={1} totalPages={3} />);

    expect(screen.getByRole("button", { current: "page" })).toHaveTextContent("1");
    expect(screen.queryByRole("button", { name: "Prev" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
  });

  it("hides Next on the last page", () => {
    render(<Pagination onChange={vi.fn()} page={3} totalPages={3} />);

    expect(screen.getByRole("button", { name: "Prev" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Next" })).not.toBeInTheDocument();
  });

  it("reports the requested page", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(<Pagination onChange={onChange} page={2} totalPages={3} />);

    await user.click(screen.getByRole("button", { name: "3" }));
    expect(onChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "Prev" }));
    expect(onChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
