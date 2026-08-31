import React from "react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { business } from "@/lib/business";

type Props = {
  reference: string;
  whatsAppUrl: string | null;
  selectedAttachmentNames: string[];
  onContinue: () => void;
};

export function QuoteHandoffSuccess({ reference, whatsAppUrl, selectedAttachmentNames, onContinue }: Props) {
  return <div className="px-7 py-12 text-center sm:px-14">
    <CheckCircle2 className="mx-auto text-blue-600" size={48} strokeWidth={1.5} />
    <p className="technical-label mt-6 text-blue-700">QUOTE REQUEST RECORDED</p>
    <DialogTitle className="mt-2 text-3xl font-bold tracking-[-0.05em] text-slate-950">Your requirement has been received.</DialogTitle>
    <DialogDescription className="mx-auto mt-4 max-w-md text-base leading-7 text-slate-600">Your request is recorded. WhatsApp opens automatically when possible; use the button below if your browser blocks it.</DialogDescription>
    <div className="mx-auto mt-7 inline-flex rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 font-mono text-sm font-bold text-blue-800">{reference}</div>
    <a href={whatsAppUrl ?? business.whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mx-auto mt-6 inline-flex h-12 items-center justify-center gap-2 px-6"><MessageCircle size={18} /> Open WhatsApp to send</a>
    {selectedAttachmentNames.length ? <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">Before sending in WhatsApp, attach: <strong>{selectedAttachmentNames.join(", ")}</strong>.</p> : <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-600">If you need to share photos or material lists, attach them in the WhatsApp chat before sending.</p>}
    <div className="mt-7 flex flex-wrap justify-center gap-3"><a href={business.phoneHref} className="btn-secondary">Call {business.phoneDisplay}</a><a href={business.emailHref} className="btn-secondary">Email M.A.S. Traders</a></div><Button onClick={onContinue} className="mt-4 h-12 rounded-xl bg-blue-600 px-7 font-bold text-white hover:bg-blue-700">Continue browsing</Button>
  </div>;
}
