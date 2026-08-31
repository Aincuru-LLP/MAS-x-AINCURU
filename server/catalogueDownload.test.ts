import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ storageGetSignedUrl: vi.fn() }));
vi.mock("./storage", () => ({ storageGetSignedUrl: mocks.storageGetSignedUrl }));

import { fetchOfficialCatalogue } from "./catalogueDownload";

describe("official catalogue download", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    mocks.storageGetSignedUrl.mockResolvedValue("https://signed-storage.example/catalogue.pdf");
  });

  it("retrieves the official PDF through the server-side storage proxy path", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(new Response(new Uint8Array([37, 80, 68, 70]), { status: 200 }));
    const file = await fetchOfficialCatalogue();
    expect(mocks.storageGetSignedUrl).toHaveBeenCalledOnce();
    expect(fetchMock).toHaveBeenCalledWith("https://signed-storage.example/catalogue.pdf");
    expect(file.toString("ascii")).toBe("%PDF");
  });
});
