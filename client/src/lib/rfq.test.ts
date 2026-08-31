import { describe, expect, it } from "vitest";
import { getRfqPresentation } from "./rfq";

describe("RFQ presentation", () => {
  it("shows a send-ready general enquiry state when no products are selected", () => {
    expect(getRfqPresentation(false, "")).toEqual({
      label: "RFQ / GENERAL ENQUIRY",
      description: "Send a general product or material enquiry now, or add products to My Requirement first for a prefilled product summary.",
      summary: "No products selected — this will be sent as a general enquiry.",
    });
  });

  it("retains the selected-product summary for requirement-based requests", () => {
    expect(getRfqPresentation(true, "Safety Helmet × 1")).toEqual({
      label: "RFQ / SELECTED PRODUCTS",
      description: "Your selected products are included automatically. Complete the contact information below so the request can be reviewed.",
      summary: "Safety Helmet × 1",
    });
  });
});
