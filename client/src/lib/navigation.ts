import { business } from "@/lib/business";

export const siteNavigation = {
  products: { label: "Products", href: "/catalogue" },
  categories: { label: "Categories", anchor: "#categories" },
  finder: { label: "Product Finder", href: "/catalogue" },
  about: { label: "About", anchor: "#about" },
  contact: { label: "Contact", anchor: "#contact" },
  catalogue: { label: "Catalogue", href: business.cataloguePdfUrl, download: true },
} as const;

export const homeAnchorIds = ["categories", "about", "contact"] as const;
