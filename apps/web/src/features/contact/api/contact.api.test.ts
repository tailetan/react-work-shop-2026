import { beforeEach, describe, expect, it, vi } from "vitest";
import { endpoints } from "@/services/endpoints";
import { httpClient } from "@/services/http";
import { mockApiResponses } from "@/test/http-mock";
import { sendContactMessage } from "./contact.api";

vi.mock("@/services/http", () => import("@/test/http-mock"));

const message = {
  name: "Tai",
  email: "tai@example.com",
  subject: "Delivery",
  message: "When will my sofa arrive?"
};

describe("sendContactMessage", () => {
  beforeEach(() => {
    mockApiResponses();
  });

  it("posts the message to the contact endpoint", async () => {
    await expect(sendContactMessage(message)).resolves.toBeUndefined();
    expect(httpClient.post).toHaveBeenCalledWith(endpoints.contact, message);
  });

  it("propagates request failures", async () => {
    vi.mocked(httpClient.post).mockRejectedValue(new Error("nope"));

    await expect(sendContactMessage(message)).rejects.toThrow("nope");
  });
});
