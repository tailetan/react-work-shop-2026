import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockApiResponses } from "@/test/http-mock";
import { renderWithProviders } from "@/test/utils";
import { AboutPage } from "./about-page";
import { ContactPage } from "./contact-page";
import { NotFoundPage } from "./not-found-page";

vi.mock("@/services/http", () => import("@/test/http-mock"));

describe("ContactPage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("renders the banner, contact details and form", () => {
    renderWithProviders(<ContactPage />, { route: "/contact" });

    expect(screen.getByRole("heading", { level: 1, name: "Contact" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Get In Touch With Us" })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Address" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Phone" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Working Time" })).toBeInTheDocument();
    expect(screen.getByText(/236 5th SE Avenue/)).toBeInTheDocument();

    expect(screen.getByLabelText("Your name")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("shows the reassurance strip", () => {
    renderWithProviders(<ContactPage />, { route: "/contact" });

    expect(screen.getByRole("heading", { name: "High Quality" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "24 / 7 Support" })).toBeInTheDocument();
  });
});

describe("AboutPage", () => {
  it("renders the story and pillars", () => {
    renderWithProviders(<AboutPage />, { route: "/about" });

    expect(screen.getByRole("heading", { level: 1, name: "About" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /designed around calm, useful rooms/i })
    ).toBeInTheDocument();

    expect(screen.getByRole("heading", { name: "Premium Material" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Room Collections" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Reliable Support" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Explore the collection" })).toHaveAttribute(
      "href",
      "/shop"
    );
  });
});

describe("NotFoundPage", () => {
  it("links back to the shop", () => {
    renderWithProviders(<NotFoundPage />, { route: "/nope" });

    expect(screen.getByRole("heading", { name: "Page not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to shop" })).toHaveAttribute(
      "href",
      "/shop"
    );
  });
});
