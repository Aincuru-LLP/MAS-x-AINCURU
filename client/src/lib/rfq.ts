export function getRfqPresentation(hasItems: boolean, summary: string) {
  if (hasItems) {
    return {
      label: "RFQ / SELECTED PRODUCTS",
      description: "Your selected products are included automatically. Complete the contact information below so the request can be reviewed.",
      summary,
    };
  }

  return {
    label: "RFQ / GENERAL ENQUIRY",
    description: "Send a general product or material enquiry now, or add products to My Requirement first for a prefilled product summary.",
    summary: "No products selected — this will be sent as a general enquiry.",
  };
}
