import { describe, expect, it } from "vitest";
import { categories, categorySlug, currentCategories, currentProducts, getCurrentProductsByCategory, getProduct, getProductsByCategory, products } from "./catalogue";
import { business } from "./business";
import { homeAnchorIds, siteNavigation } from "./navigation";

describe("public navigation routes", () => {
  it("keeps the primary routes, home anchors, and official catalogue destination explicit", () => {
    expect(siteNavigation.products.href).toBe("/catalogue");
    expect(siteNavigation.finder.href).toBe("/catalogue");
    expect(siteNavigation.catalogue).toMatchObject({ href: "/api/catalogue/download", download: true });
    expect(homeAnchorIds).toEqual(["categories", "about", "contact"]);
    expect(siteNavigation.categories.anchor).toBe("#categories");
    expect(siteNavigation.about.anchor).toBe("#about");
    expect(siteNavigation.contact.anchor).toBe("#contact");
  });

  it("resolves every visible product and category to its existing route data", () => {
    expect(currentProducts).toHaveLength(70);
    expect(currentProducts.every((product) => getProduct(product.slug)?.id === product.id)).toBe(true);
    expect(currentCategories.every((category) => categorySlug(category.category).length > 0 && getCurrentProductsByCategory(category.category).length > 0)).toBe(true);
    expect(products.every((product) => getProduct(product.slug)?.id === product.id)).toBe(true);
    expect(categories.every((category) => categorySlug(category.category).length > 0 && getProductsByCategory(category.category).length > 0)).toBe(true);
  });

  it("uses only the configured contact and PDF destinations for external quick actions", () => {
    expect(business.whatsappHref).toBe("https://wa.me/919385811577");
    expect(business.phoneHref).toBe("tel:+919385811577");
    expect(business.cataloguePdfUrl).toBe("/api/catalogue/download");
  });
});
