import type { Product } from "@/lib/catalogue";

export type RequirementItem = Product & { quantity: number; note: string };

export function addToRequirement(items: RequirementItem[], product: Product): RequirementItem[] {
  const existing = items.find((item) => item.id === product.id);
  return existing
    ? items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
    : [...items, { ...product, quantity: 1, note: "" }];
}

export function changeRequirementQuantity(items: RequirementItem[], id: string, delta: number): RequirementItem[] {
  return items
    .map((item) => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
    .filter((item) => item.quantity > 0);
}

export function changeRequirementNote(items: RequirementItem[], id: string, note: string): RequirementItem[] {
  return items.map((item) => item.id === id ? { ...item, note } : item);
}
