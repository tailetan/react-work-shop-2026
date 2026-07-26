import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { NewsletterForm } from "./newsletter-form";

describe("NewsletterForm", () => {
  it("rejects an empty submission", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Email is required");
  });

  it("rejects a malformed address", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    await user.type(screen.getByLabelText(/email address/i), "not-an-email");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("valid email address");
  });

  it("confirms and clears a valid address", async () => {
    const user = userEvent.setup();
    render(<NewsletterForm />);

    const input = screen.getByLabelText(/email address/i);
    await user.type(input, "tai@example.com");
    await user.click(screen.getByRole("button", { name: /subscribe/i }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thanks for subscribing");
    expect(input).toHaveValue("");
  });
});
