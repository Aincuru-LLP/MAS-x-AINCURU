export type WhatsAppQuoteItem = { name: string; quantity: number; note?: string };

export type WhatsAppQuotePayload = {
  reference: string;
  name: string;
  phone: string;
  email: string;
  company?: string;
  notes?: string;
  items: WhatsAppQuoteItem[];
  attachmentNames: string[];
};

export function buildWhatsAppQuoteUrl(recipient: string, payload: WhatsAppQuotePayload) {
  const itemLines = payload.items.length
    ? payload.items.map((item) => `• ${item.name} × ${item.quantity}${item.note ? ` — ${item.note}` : ""}`)
    : ["No products selected — general enquiry."];
  const lines = [
    "*NEW M.A.S. TRADERS QUOTE REQUEST*",
    `Reference: ${payload.reference}`,
    "",
    `Customer: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    ...(payload.company ? [`Company: ${payload.company}`] : []),
    "",
    "*Requirement*",
    ...itemLines,
    ...(payload.notes ? ["", `Notes: ${payload.notes}`] : []),
    ...(payload.attachmentNames.length ? ["", `Reference files selected on website: ${payload.attachmentNames.join(", ")}`, "Please attach these files in this WhatsApp chat before sending."] : []),
  ];
  return `https://wa.me/${recipient}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function navigateWhatsAppPopup(popup: Window | null, url: string) {
  if (!popup) return false;
  popup.location.href = url;
  return true;
}
