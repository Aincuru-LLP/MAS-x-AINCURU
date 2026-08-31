import { describe, expect, it } from "vitest";
import { buildWhatsAppQuoteUrl, navigateWhatsAppPopup } from "./whatsapp";

describe("WhatsApp quote handoff", () => {
  it("creates a prefilled quote summary for the verified business number", () => {
    const url = buildWhatsAppQuoteUrl("919385811577", {
      reference: "MAS-20260827-001",
      name: "Asha Kumar",
      phone: "9876543210",
      email: "asha@example.com",
      items: [{ name: "Safety Helmet", quantity: 4, note: "Blue" }],
      attachmentNames: ["site-photo.jpg"],
    });
    expect(url).toContain("https://wa.me/919385811577?text=");
    const message = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(message).toContain("Reference: MAS-20260827-001");
    expect(message).toContain("Safety Helmet × 4 — Blue");
    expect(message).toContain("Please attach these files in this WhatsApp chat before sending.");
  });

  it("labels an RFQ without selected products as a general enquiry", () => {
    const url = buildWhatsAppQuoteUrl("919385811577", {
      reference: "MAS-20260827-002",
      name: "Asha Kumar",
      phone: "9876543210",
      email: "asha@example.com",
      items: [],
      attachmentNames: [],
    });
    const message = decodeURIComponent(url.split("?text=")[1] ?? "");
    expect(message).toContain("No products selected — general enquiry.");
  });

  it("navigates the user-initiated popup and reports a blocked-popup fallback", () => {
    const popup = { location: { href: "about:blank" } } as unknown as Window;
    expect(navigateWhatsAppPopup(popup, "https://wa.me/919385811577?text=hello")).toBe(true);
    expect(popup.location.href).toContain("wa.me/919385811577");
    expect(navigateWhatsAppPopup(null, "https://wa.me/919385811577?text=hello")).toBe(false);
  });
});
