import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { productDetailFixture } from "@/test/fixtures";
import { ProductTabs } from "./product-tabs";

describe("ProductTabs", () => {
  it("opens on the tab flagged active", () => {
    render(<ProductTabs detail={productDetailFixture} />);

    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent("Description");
    expect(screen.getByText("A calm silhouette.")).toBeInTheDocument();
  });

  it("shows the detail images under the description tab", () => {
    const { container } = render(<ProductTabs detail={productDetailFixture} />);

    expect(container.querySelectorAll("img")).toHaveLength(
      productDetailFixture.detailImages.length
    );
  });

  it("switches panels and hides the detail images", async () => {
    const user = userEvent.setup();
    const { container } = render(<ProductTabs detail={productDetailFixture} />);

    await user.click(screen.getByRole("tab", { name: "Additional Information" }));

    expect(screen.getByText("Frame: solid wood")).toBeInTheDocument();
    expect(screen.queryByText("A calm silhouette.")).not.toBeInTheDocument();
    expect(container.querySelectorAll("img")).toHaveLength(0);
  });

  it("falls back to the first tab when none is flagged", () => {
    render(
      <ProductTabs
        detail={{
          ...productDetailFixture,
          tabs: [{ key: "reviews", label: "Reviews [5]", content: ["Great sofa."] }]
        }}
      />
    );

    expect(screen.getByRole("tab", { selected: true })).toHaveTextContent("Reviews [5]");
  });

  it("renders nothing without tabs", () => {
    const { container } = render(
      <ProductTabs detail={{ ...productDetailFixture, tabs: [] }} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
