import { useMemo, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { useRequirement } from "@/components/RequirementProvider";
import { business } from "@/lib/business";
import { getRfqPresentation } from "@/lib/rfq";
import { buildWhatsAppQuoteUrl, navigateWhatsAppPopup } from "@/lib/whatsapp";
import { QuoteHandoffSuccess } from "@/components/QuoteHandoffSuccess";

const formSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  phone: z.string().trim().min(5, "Please enter a phone number."),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().optional(),
  notes: z.string().trim().optional(),
});

type FormData = z.infer<typeof formSchema>;
type Attachment = { filename: string; mimeType: string; base64: string };

const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

export default function QuoteDialog() {
  const { items, quoteOpen, setQuoteOpen, clear } = useRequirement();
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [reference, setReference] = useState<string | null>(() => typeof window === "undefined" ? null : localStorage.getItem("mas-last-rfq"));
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);
  const [selectedAttachmentNames, setSelectedAttachmentNames] = useState<string[]>([]);
  const mutation = trpc.rfq.create.useMutation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const hasItems = items.length > 0;
  const summary = useMemo(() => items.map((item) => `${item.name} × ${item.quantity}`).join(" · "), [items]);
  const presentation = getRfqPresentation(hasItems, summary);

  const uploadFiles = async (fileList: FileList | null) => {
    if (!fileList) return;
    const files = Array.from(fileList).slice(0, 2);
    if (files.some((file) => file.size > 2_000_000)) {
      toast.error("Each attachment must be 2 MB or smaller.");
      return;
    }
    try {
      setAttachments(await Promise.all(files.map(async (file) => ({ filename: file.name, mimeType: file.type || "application/octet-stream", base64: await toBase64(file) }))));
    } catch {
      toast.error("One of the files could not be prepared.");
    }
  };

  const submit = async (values: FormData) => {
    const whatsAppPopup = window.open("about:blank", "_blank");
    try {
      const result = await mutation.mutateAsync({
        ...values,
        items: items.map(({ id, name, category, quantity, note }) => ({ id, name, category, quantity, note: note || undefined })),
        attachments: attachments.length ? attachments : undefined,
      });
      setReference(result.reference);
      const attachmentNames = attachments.map((attachment) => attachment.filename);
      setSelectedAttachmentNames(attachmentNames);
      const handoffUrl = buildWhatsAppQuoteUrl(business.whatsappNumber, {
        reference: result.reference,
        ...values,
        items: items.map(({ name, quantity, note }) => ({ name, quantity, note: note || undefined })),
        attachmentNames,
      });
      setWhatsAppUrl(handoffUrl);
      const didOpenWhatsApp = navigateWhatsAppPopup(whatsAppPopup, handoffUrl);
      if (!didOpenWhatsApp) toast.message("WhatsApp was blocked by your browser. Use the Open WhatsApp button below.");
      localStorage.setItem("mas-last-rfq", result.reference);
      clear();
      reset();
      setAttachments([]);
    } catch (error) {
      whatsAppPopup?.close();
      toast.error(error instanceof Error ? error.message : "Your requirement could not be sent. Please try again.");
    }
  };

  const close = (open: boolean) => {
    setQuoteOpen(open);
    if (!open && reference) {
      setReference(null);
      setWhatsAppUrl(null);
      setSelectedAttachmentNames([]);
    }
  };

  return (
    <Dialog open={quoteOpen} onOpenChange={close}>
      <DialogContent className="quote-sheet !top-0 !bottom-0 !left-0 !flex !h-[100dvh] !max-h-[100dvh] !w-full !max-w-none !translate-x-0 !translate-y-0 !flex-col !gap-0 !overflow-hidden rounded-none border-0 bg-[#f8fafc] p-0 shadow-none sm:!top-1/2 sm:!bottom-auto sm:!left-1/2 sm:!h-auto sm:!max-h-[92vh] sm:!max-w-[720px] sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:rounded-[1rem] sm:border sm:border-slate-200 sm:shadow-lg">
        <div className="mx-auto mt-2 h-1 w-9 shrink-0 rounded-full bg-slate-300 sm:hidden" aria-hidden="true" />
        {reference ? (
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            <QuoteHandoffSuccess reference={reference} whatsAppUrl={whatsAppUrl} selectedAttachmentNames={selectedAttachmentNames} onContinue={() => close(false)} />
          </div>
        ) : (
          <div className="flex min-h-0 flex-1 flex-col">
            <DialogHeader className="shrink-0 border-b border-slate-200 px-5 pb-4 pt-3 sm:px-7 sm:py-6">
              <p className="technical-label text-blue-700">{presentation.label}</p>
              <DialogTitle className="mt-1.5 text-[1.75rem] font-bold tracking-[-0.05em] text-slate-950 sm:mt-2 sm:text-3xl">Request a quote</DialogTitle>
              <DialogDescription className="mt-1.5 text-sm leading-5 text-slate-600 sm:mt-2 sm:leading-6">{presentation.description}</DialogDescription>
            </DialogHeader>
            <form id="quote-request-form" onSubmit={handleSubmit(submit)} className="grid min-h-0 flex-1 content-start gap-4 overflow-y-auto overscroll-contain px-5 py-4 sm:gap-6 sm:p-7">
              <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 sm:p-4">
                <p className="technical-label text-blue-700">MY REQUIREMENT</p>
                <p className="mt-1.5 text-sm font-semibold leading-5 text-slate-900 sm:mt-2">{presentation.summary}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <Field label="Name" error={errors.name?.message}><input {...register("name")} autoComplete="name" /></Field>
                <Field label="Phone" error={errors.phone?.message}><input {...register("phone")} inputMode="tel" autoComplete="tel" /></Field>
                <Field label="Email" error={errors.email?.message}><input {...register("email")} type="email" autoComplete="email" /></Field>
                <Field label="Company (optional)"><input {...register("company")} autoComplete="organization" /></Field>
              </div>
              <Field label="Requirement notes (optional)"><textarea {...register("notes")} rows={4} placeholder="Add handling, quantity, or material notes." /></Field>
              <label className="group flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white p-4 transition hover:border-blue-400 hover:bg-blue-50/40">
                <span className="rounded-lg bg-slate-100 p-2 text-blue-700 transition group-hover:bg-blue-100"><FileUp size={18} /></span>
                <span className="min-w-0 flex-1"><span className="block text-sm font-semibold text-slate-900">Add a photo or material list</span><span className="mt-0.5 block text-xs text-slate-500">Up to two files, 2 MB each.</span></span>
                <input onChange={(event) => uploadFiles(event.target.files)} type="file" accept="image/*,.pdf,.csv,.txt" multiple className="sr-only" />
              </label>
              {attachments.length ? <p className="text-xs font-medium text-slate-600">Attached: {attachments.map((file) => file.filename).join(", ")}</p> : null}
              <p className="pb-2 text-center text-xs leading-5 text-slate-500 sm:pb-0">After submission, WhatsApp will open with your quote summary. Attach any selected files manually in WhatsApp, then tap Send. For direct product enquiries, call {business.phoneDisplay} or email {business.email}.</p>
            </form>
            <div className="quote-sheet__submit shrink-0 border-t border-slate-200 bg-[#f8fafc] px-5 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:px-7 sm:py-4">
              <Button type="submit" form="quote-request-form" disabled={mutation.isPending} className="h-12 w-full rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700">
                {mutation.isPending ? <><Loader2 className="animate-spin" size={16} /> Sending quote request…</> : "Send Quote Request"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return <label className="grid gap-2 text-sm font-semibold text-slate-800"><span>{label}</span><span className="form-control">{children}</span>{error ? <span className="text-xs font-medium text-red-600">{error}</span> : null}</label>;
}
