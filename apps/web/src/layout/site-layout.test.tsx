import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Route, Routes } from "react-router";
import { renderWithProviders } from "@/test/utils";
import { SiteLayout } from "./site-layout";

function renderLayout() {
  return renderWithProviders(
    <Routes>
      <Route element={<SiteLayout />} path="/">
        <Route element={<p>Routed page content</p>} index />
      </Route>
    </Routes>
  );
}

describe("SiteLayout", () => {
  it("wraps the routed page in the header and footer", () => {
    renderLayout();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: "Main" })).toBeInTheDocument();

    expect(screen.getByRole("main")).toHaveTextContent("Routed page content");

    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Furniro." })).toBeInTheDocument();
    expect(
      screen.getByText("2026 Furniro by Tai Le Tan. All rights reserved")
    ).toBeInTheDocument();
  });

  it("renders the footer link columns and newsletter form", () => {
    renderLayout();

    const footer = screen.getByRole("contentinfo");

    expect(footer).toHaveTextContent("364 Cong Hoa Street, Tan Binh District");
    expect(footer).toHaveTextContent("Links");
    expect(footer).toHaveTextContent("Help");
    expect(footer).toHaveTextContent("Payment Options");
    expect(footer).toHaveTextContent("Privacy Policies");

    expect(screen.getByRole("button", { name: /subscribe/i })).toBeInTheDocument();
  });
});
