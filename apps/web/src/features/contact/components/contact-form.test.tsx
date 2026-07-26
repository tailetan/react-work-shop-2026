import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { httpClient } from "@/services/http";
import { mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { ContactForm } from "./contact-form";

vi.mock("@/services/http", () => import("@/test/http-mock"));

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText("Your name"), "Tai Le");
  await user.type(screen.getByLabelText("Email address"), "tai@example.com");
  await user.type(screen.getByLabelText("Message"), "When will my sofa arrive?");
}

describe("ContactForm", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("blocks submission and reports missing fields", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Submit" }));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts.length).toBeGreaterThanOrEqual(2);
    expect(httpClient.post).not.toHaveBeenCalled();
  });

  it("validates the email format", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText("Email address"), "nope");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByText("Enter a valid email address")).toBeInTheDocument();
  });

  it("rejects a message that is too short", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await user.type(screen.getByLabelText("Message"), "hi");
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(
      await screen.findByText("Message must be at least 10 characters")
    ).toBeInTheDocument();
  });

  it("submits the message and confirms", async () => {
    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("status")).toHaveTextContent("Thanks for reaching out");
    expect(httpClient.post).toHaveBeenCalledWith(expect.any(String), {
      name: "Tai Le",
      email: "tai@example.com",
      subject: "",
      message: "When will my sofa arrive?"
    });
  });

  it("surfaces a request failure", async () => {
    vi.mocked(httpClient.post).mockRejectedValue(new Error("offline"));

    const user = userEvent.setup();
    renderWithProviders(<ContactForm />);

    await fillValidForm(user);
    await user.click(screen.getByRole("button", { name: "Submit" }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Something went wrong");
  });
});
