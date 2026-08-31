import { describe, expect, it } from "vitest";
import { categories, currentProducts, featuredCategoryNames, findProducts, getCategoryCardImage, getProductsByCategory, getRepresentativeProducts, productImage, productImages, products } from "./catalogue";
import { addToRequirement, changeRequirementNote, changeRequirementQuantity } from "./requirement";

describe("catalogue search", () => {
  it("finds product names and limits category results to verified catalogue items", () => {
    expect(findProducts("helmet").map((product) => product.name)).toContain("Safety Helmet");
    expect(findProducts("Venus Padlock").map((product) => product.name)).toContain("Venus Padlock 67mm");
    expect(findProducts("blue plastic sheet roll").map((product) => product.name)).toContain("Blue Plastic Sheet Roll");
    const fasteners = findProducts("", "Fasteners");
    expect(fasteners).toHaveLength(6);
    expect(fasteners.every((product) => product.category === "Fasteners")).toBe(true);
  });

  it("retains all 141 verified products in 21 categories and exposes every product through its category", () => {
    expect(products).toHaveLength(143);
    expect(categories).toHaveLength(21);
    expect(products.every((product) => product.category.length > 0)).toBe(true);
    expect(categories.reduce((total, category) => total + getProductsByCategory(category.category).length, 0)).toBe(143);
  });

  it("uses a maximum of four representative products for every category preview", () => {
    for (const category of categories) {
      const preview = getRepresentativeProducts(category.category);
      expect(preview.length).toBeGreaterThan(0);
      expect(preview.length).toBeLessThanOrEqual(4);
      expect(preview.every((product) => product.category === category.category)).toBe(true);
    }
  });

  it("maps each approved current Product Finder product to a product-specific image asset", () => {
    expect(currentProducts).toHaveLength(70);
    expect(Object.keys(productImages)).toHaveLength(70);
    expect(currentProducts.every((product) => productImages[product.id] === productImage(product))).toBe(true);
    expect(currentProducts.find((product) => product.name === "Venus Padlock 67mm")).toMatchObject({ category: "Locks", slug: "locks-venus-padlock-67mm" });
    expect(currentProducts.find((product) => product.name === "Blue Plastic Sheet Roll")).toMatchObject({ category: "Construction Materials", slug: "construction-materials-blue-plastic-sheet-roll" });
  });

  it("uses a unique mapped product image for each homepage featured category card", () => {
    const images = featuredCategoryNames.map(getCategoryCardImage);
    expect(new Set(images).size).toBe(featuredCategoryNames.length);
  });
});

describe("requirement list", () => {
  it("adds a product, aggregates repeat additions, retains notes, and removes an item at zero", () => {
    const product = products.find((item) => item.name === "Safety Helmet");
    expect(product).toBeDefined();
    const initial = addToRequirement([], product!);
    const doubled = addToRequirement(initial, product!);
    const noted = changeRequirementNote(doubled, product!.id, "For site team");
    expect(noted[0]).toMatchObject({ quantity: 2, note: "For site team" });
    expect(changeRequirementQuantity(noted, product!.id, -2)).toEqual([]);
  });
});
