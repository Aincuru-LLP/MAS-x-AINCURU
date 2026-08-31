# Optional-Product RFQ QA Notes

With no selected products, the Request a Quote control opens the standard form rather than a blocking empty state. The dialog is labelled **RFQ / GENERAL ENQUIRY**, explains the optional product list, displays the required contact fields, and exposes an enabled **Send Quote Request** action.

The existing selected-product control continues to add a product to the in-memory My Requirement state; the desktop header count changed from 0 to 1 during interactive verification. No test submission was created in the business RFQ database or WhatsApp conversation. Automated server coverage verifies persistence for both a selected-product RFQ and a zero-item general RFQ, and formatter coverage verifies their corresponding WhatsApp summaries.

With a selected Safety Helmet, the form retained its **RFQ / SELECTED PRODUCTS** heading, displayed **Safety Helmet × 1**, and kept the **Send Quote Request** control enabled. The request was intentionally not submitted during QA, preventing any test data or test WhatsApp message from reaching the business.

## Mobile Sheet Correction QA

The RFQ now uses a `100dvh` mobile sheet, a bounded `overflow-y-auto` form region, and a separate safe-area submit footer. Runtime inspection confirmed the form has `overflow-y: auto`, is scroll-capable, and retains the submit footer within the sheet bounds. The phone preview at **390 × 844** maintained the safe-area-aware mobile layout; the desktop dialog was also opened after the change, where its centered layout retained a visible **Send Quote Request** footer.
