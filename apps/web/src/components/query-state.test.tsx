import { HttpError } from "@react-workshop/http-client";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { QueryState } from "./query-state";

describe("QueryState", () => {
  it("shows the loading label", () => {
    render(<QueryState isError={false} isLoading loadingLabel="Loading products..." />);

    expect(screen.getByRole("status")).toHaveTextContent("Loading products...");
  });

  it("shows the error message and retries", async () => {
    const onRetry = vi.fn();
    const user = userEvent.setup();

    render(
      <QueryState
        error={new HttpError("boom", { status: 500 })}
        isError
        isLoading={false}
        onRetry={onRetry}
      />
    );

    expect(screen.getByRole("alert")).toHaveTextContent("status 500");

    await user.click(screen.getByRole("button", { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledOnce();
  });

  it("omits the retry button when no handler is given", () => {
    render(<QueryState error={new Error("x")} isError isLoading={false} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("shows the empty label", () => {
    render(
      <QueryState emptyLabel="Nothing here" isEmpty isError={false} isLoading={false} />
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders nothing once data is ready", () => {
    const { container } = render(<QueryState isError={false} isLoading={false} />);

    expect(container).toBeEmptyDOMElement();
  });
});
