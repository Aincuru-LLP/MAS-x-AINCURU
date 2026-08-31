import React from "react";
import { ClipboardList, MessageCircle, Phone, Plus, Send } from "lucide-react";
import { useRequirement } from "@/components/RequirementProvider";
import { business } from "@/lib/business";

export function MobileActionBar() {
  const { items, setOpen } = useRequirement();

  return <MobileQuickActionLinks itemCount={items.length} onRequirement={() => setOpen(true)} />;
}

export function MobileQuickActionLinks({ itemCount, onRequirement }: { itemCount: number; onRequirement: () => void }) {
  return (
    <nav className="mobile-action-bar" aria-label="Mobile quick actions">
      <a href={business.whatsappHref} target="_blank" rel="noreferrer" aria-label="Start a WhatsApp enquiry with M.A.S. Traders">
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>
      <button onClick={onRequirement} aria-label={`Open My Requirement with ${itemCount} selected item${itemCount === 1 ? "" : "s"}`}>
        <ClipboardList size={18} />
        <span>Requirement</span>
        <strong>{itemCount}</strong>
      </button>
      <a href={business.phoneHref} aria-label="Call M.A.S. Traders">
        <Phone size={18} />
        <span>Call</span>
      </a>
    </nav>
  );
}

export function MobileProductActionBar({ onAdd, onQuote }: { onAdd: () => void; onQuote: () => void }) {
  return (
    <nav className="mobile-product-action-bar" aria-label="Product actions">
      <button onClick={onAdd} className="mobile-product-action-bar__secondary"><Plus size={18} /> Add to Requirement</button>
      <button onClick={onQuote} className="mobile-product-action-bar__primary"><Send size={17} /> Request Quote</button>
    </nav>
  );
}
