import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MobileQuickActionLinks } from "./MobileActionBar";

describe("MobileActionBar", () => {
  it("renders verified WhatsApp, requirement, and call quick actions", () => {
    const html = renderToStaticMarkup(<MobileQuickActionLinks itemCount={2} onRequirement={() => undefined} />);

    expect(html).toContain("https://wa.me/919385811577");
    expect(html).toContain("tel:+919385811577");
    expect(html).toContain("WhatsApp");
    expect(html).toContain("Requirement");
    expect(html).toContain("Call");
  });
});
