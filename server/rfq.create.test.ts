import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  createQuoteRequest: vi.fn(),
  storagePut: vi.fn(),
}));

vi.mock("./db", () => ({ createQuoteRequest: mocks.createQuoteRequest }));
vi.mock("./storage", () => ({ storagePut: mocks.storagePut }));

import { appRouter } from "./routers";

describe("rfq.create", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.storagePut.mockResolvedValue({ key: "rfq/example/site.jpg", url: "https://storage.example/site.jpg" });
    mocks.createQuoteRequest.mockResolvedValue(undefined);
  });

  it("persists a valid quote request and its selected image metadata before the client hands off to WhatsApp", async () => {
    const caller = appRouter.createCaller({} as never);
    const result = await caller.rfq.create({
      name: "Asha Kumar",
      phone: "9876543210",
      email: "asha@example.com",
      items: [{ id: "safety-helmet", name: "Safety Helmet", category: "Safety Equipment", quantity: 4 }],
      attachments: [{ filename: "site.jpg", mimeType: "image/jpeg", base64: "aGVsbG8=" }],
    });

    expect(result.reference).toMatch(/^RFQ-\d{4}-[A-Z0-9_-]{6}$/);
    expect(mocks.storagePut).toHaveBeenCalledOnce();
    expect(mocks.createQuoteRequest).toHaveBeenCalledWith(expect.objectContaining({
      reference: result.reference,
      name: "Asha Kumar",
      attachmentsJson: [{ filename: "site.jpg", mimeType: "image/jpeg", key: "rfq/example/site.jpg", url: "https://storage.example/site.jpg" }],
    }));
  });

  it("persists a general quote request when the customer has not selected any products", async () => {
    const caller = appRouter.createCaller({} as never);
    const result = await caller.rfq.create({
      name: "Asha Kumar",
      phone: "9876543210",
      email: "asha@example.com",
      items: [],
    });
    expect(result.reference).toMatch(/^RFQ-\d{4}-[A-Z0-9_-]{6}$/);
    expect(mocks.createQuoteRequest).toHaveBeenCalledWith(expect.objectContaining({
      reference: result.reference,
      itemsJson: [],
    }));
    expect(mocks.storagePut).not.toHaveBeenCalled();
  });
});
