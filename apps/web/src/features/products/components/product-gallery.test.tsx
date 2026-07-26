import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ProductGallery } from "./product-gallery";

const gallery = {
  active: "/images/product/product-01.png",
  thumbnails: ["/images/product/product-01.png", "/images/product/product-07.png"]
};

describe("ProductGallery", () => {
  it("starts on the active image", () => {
    render(<ProductGallery gallery={gallery} name="Asgaard Sofa" />);

    expect(screen.getByRole("img", { name: "Asgaard Sofa" })).toHaveAttribute(
      "src",
      "/images/product/product-01.png"
    );
    expect(screen.getByRole("button", { name: /show image 1/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("switches the main image when a thumbnail is picked", async () => {
    const user = userEvent.setup();
    render(<ProductGallery gallery={gallery} name="Asgaard Sofa" />);

    await user.click(screen.getByRole("button", { name: /show image 2/i }));

    expect(screen.getByRole("img", { name: "Asgaard Sofa" })).toHaveAttribute(
      "src",
      "/images/product/product-07.png"
    );
    expect(screen.getByRole("button", { name: /show image 2/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
  });

  it("renders one control per thumbnail", () => {
    render(<ProductGallery gallery={gallery} name="Asgaard Sofa" />);

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });
});
