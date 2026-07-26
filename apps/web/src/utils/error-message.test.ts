import { HttpError } from "@react-workshop/http-client";
import { describe, expect, it } from "vitest";
import { resolveErrorMessage } from "./error-message";

describe("resolveErrorMessage", () => {
  it("reports the status for HTTP errors", () => {
    expect(resolveErrorMessage(new HttpError("boom", { status: 503 }))).toBe(
      "Request failed with status 503. Please try again."
    );
  });

  it("falls back to a generic message for HTTP errors without a status", () => {
    expect(resolveErrorMessage(new HttpError("boom"))).toBe(
      "Something went wrong while loading this content."
    );
  });

  it("falls back to a generic message for unknown errors", () => {
    expect(resolveErrorMessage(new Error("nope"))).toBe(
      "Something went wrong while loading this content."
    );
    expect(resolveErrorMessage(null)).toBe(
      "Something went wrong while loading this content."
    );
  });
});
