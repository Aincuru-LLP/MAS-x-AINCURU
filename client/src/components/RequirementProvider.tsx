import React, { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Product } from "@/lib/catalogue";
import { addToRequirement, changeRequirementNote, changeRequirementQuantity, type RequirementItem } from "@/lib/requirement";
import QuoteDialog from "@/components/QuoteDialog";

export type { RequirementItem } from "@/lib/requirement";

type RequirementContextValue = {
  items: RequirementItem[];
  isOpen: boolean;
  quoteOpen: boolean;
  add: (product: Product) => void;
  adjust: (id: string, delta: number) => void;
  remove: (id: string) => void;
  note: (id: string, value: string) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  setQuoteOpen: (open: boolean) => void;
};

const RequirementContext = createContext<RequirementContextValue | null>(null);
const storageKey = "mas-traders-requirement";

function getInitialItems(): RequirementItem[] {
  try {
    const stored = localStorage.getItem(storageKey);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function RequirementProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RequirementItem[]>(getInitialItems);
  const [isOpen, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  }, [items]);

  const value = useMemo<RequirementContextValue>(() => ({
    items,
    isOpen,
    quoteOpen,
    add: (product) => {
      setItems((current) => addToRequirement(current, product));
      toast.success(`${product.name} added to My Requirement`);
    },
    adjust: (id, delta) => setItems((current) => changeRequirementQuantity(current, id, delta)),
    remove: (id) => setItems((current) => current.filter((item) => item.id !== id)),
    note: (id, note) => setItems((current) => changeRequirementNote(current, id, note)),
    clear: () => setItems([]),
    setOpen,
    setQuoteOpen,
  }), [items, isOpen, quoteOpen]);

  return <RequirementContext.Provider value={value}>{children}<RequirementDrawer /><QuoteDialog /></RequirementContext.Provider>;
}

export function useRequirement() {
  const context = useContext(RequirementContext);
  if (!context) throw new Error("useRequirement must be used inside RequirementProvider");
  return context;
}

function RequirementDrawer() {
  const { items, isOpen, setOpen, adjust, remove, note, setQuoteOpen } = useRequirement();
  const total = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="requirement-sheet !top-auto !bottom-0 !left-0 !max-h-[88vh] !w-full !max-w-none !translate-x-0 !translate-y-0 rounded-b-none rounded-t-[1.6rem] border-white/30 bg-[#f8fafc]/95 p-0 shadow-[0_-18px_60px_rgba(11,18,32,0.2)] backdrop-blur-xl sm:!top-1/2 sm:!bottom-auto sm:!left-1/2 sm:!max-h-[92vh] sm:!max-w-[520px] sm:!translate-x-[-50%] sm:!translate-y-[-50%] sm:rounded-[1rem] sm:shadow-[0_28px_90px_rgba(11,18,32,0.24)]">
        <div className="mx-auto mt-3 h-1.5 w-10 rounded-full bg-slate-300 sm:hidden" aria-hidden="true" />
        <div className="border-b border-slate-200 px-5 pb-5 pt-4 sm:px-6 sm:py-5">
          <DialogHeader>
            <div className="flex items-center justify-between gap-4 pr-8">
              <div>
                <p className="technical-label text-blue-700">WORKING LIST / {String(items.length).padStart(2, "0")}</p>
                <DialogTitle className="mt-1 text-2xl font-bold tracking-[-0.04em] text-slate-950">My Requirement</DialogTitle>
              </div>
              <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-bold text-white">{total} units</span>
            </div>
            <DialogDescription className="mt-2 text-sm text-slate-600">Adjust quantities and notes before sending a quote request.</DialogDescription>
          </DialogHeader>
        </div>
        <div className="space-y-4 px-5 py-5 sm:px-6">
          {items.length ? items.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="pt-1 font-mono text-xs text-blue-700">{String(index + 1).padStart(2, "0")}</span>
                <div className="min-w-0 flex-1">
                  <p className="technical-label text-slate-500">{item.category}</p>
                  <p className="mt-1 font-semibold text-slate-950">{item.name}</p>
                </div>
                <button onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="min-h-11 min-w-11 rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-red-600"><Trash2 size={16} /></button>
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-1">
                  <button onClick={() => adjust(item.id, -1)} className="min-h-10 min-w-10 rounded-lg p-2 text-slate-700 transition hover:bg-white"><Minus size={15} /></button>
                  <span className="min-w-9 text-center text-sm font-bold text-slate-950">{item.quantity}</span>
                  <button onClick={() => adjust(item.id, 1)} className="min-h-10 min-w-10 rounded-lg p-2 text-slate-700 transition hover:bg-white"><Plus size={15} /></button>
                </div>
                <input value={item.note} onChange={(event) => note(item.id, event.target.value)} aria-label={`Note for ${item.name}`} placeholder="Add a note" className="min-w-0 flex-1 border-b border-slate-200 bg-transparent px-1 py-2 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600" />
              </div>
            </div>
          )) : <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><p className="font-semibold text-slate-950">Your working list is empty.</p><p className="mt-2 text-sm text-slate-600">Add products from the catalogue to build a clear requirement.</p></div>}
        </div>
        <div className="border-t border-slate-200 bg-white/70 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] pt-5 sm:px-6 sm:py-5">
          <Button onClick={() => { setOpen(false); setQuoteOpen(true); }} disabled={!items.length} className="h-12 w-full rounded-xl bg-blue-600 text-sm font-bold text-white transition hover:bg-blue-700">Request a Quote</Button>
          <button onClick={() => setOpen(false)} className="mt-3 w-full text-sm font-semibold text-slate-600 transition hover:text-blue-700">Continue browsing</button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
