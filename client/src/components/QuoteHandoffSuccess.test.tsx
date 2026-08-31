import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Dialog } from "@/components/ui/dialog";
import { QuoteHandoffSuccess } from "./QuoteHandoffSuccess";

describe("QuoteHandoffSuccess", () => {
  it("renders the recorded reference, WhatsApp fallback, and selected attachment guidance", () => {
    const html = renderToStaticMarkup(<Dialog open><QuoteHandoffSuccess reference="RFQ-2026-ABC123" whatsAppUrl="https://wa.me/919385811577?text=quote" selectedAttachmentNames={["site-photo.jpg"]} onContinue={() => undefined} /></Dialog>);
    expect(html).toContain("RFQ-2026-ABC123");
    expect(html).toContain("https://wa.me/919385811577?text=quote");
    expect(html).toContain("Before sending in WhatsApp, attach:");
    expect(html).toContain("site-photo.jpg");
  });
});
