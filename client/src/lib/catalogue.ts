export type Product = {
  id: string;
  name: string;
  category: string;
  slug: string;
};

type CatalogueGroup = {
  category: string;
  items: string[];
};

const sourceCatalogue: CatalogueGroup[] = [
  { category: "Safety Equipment", items: ["Safety Shoe", "Safety Helmet", "Safety Jerkin", "Safety Belt", "Safety Gloves", "Safety Mask", "Gumboots", "Reflective Road Studs", "PPE Kit", "Fire Extinguisher", "Goggles", "Safety Cones", "Barrication Tapes"] },
  { category: "Building Damping / Waterproofing", items: ["Dr. Fixit", "Fosroc", "Sika"] },
  { category: "Adhesives / Tapes", items: ["Silicon", "Fevicol", "Araldite", "Anabond", "Double Side Tapes", "Shuttering Tapes", "Paper Tapes", "PU Foams", "Leakage Arresting Tapes", "Masking Tapes", "743", "Wudfil", "Insulation Tape"] },
  { category: "Fasteners", items: ["MS Nails", "MS Bolt Nuts", "Screws", "Anchor Bolts", "Foundation Bolts", "Concrete Nails"] },
  { category: "Abrasive & Rotary Tools", items: ["Cutting Wheels", "Grinding Wheel", "Polishing Wheels", "Emery Paper", "Flap Disc", "CD Paper"] },
  { category: "Wheel Items", items: ["Wheel Barrow Wheels", "Fast Food Vehicle Wheels", "Desk Wheels"] },
  { category: "Power Tools", items: ["Drill Machines", "Cut-Off Machines", "Angle Grinder Machines", "Tiles Cutter", "Hammer Machine", "Breaker Machines", "Welding Machines"] },
  { category: "Measurement Tools", items: ["Measurement Tapes"] },
  { category: "Gate Designing & Fittings", items: ["Hinges", "Sheet Metals", "Tower Bolts", "Aldrops"] },
  { category: "MS Plates", items: ["All sizes available"] },
  { category: "Hand Tools", items: ["Hammer", "Chisels", "Hoe/Manvetti", "Crowbars", "Screw Drivers", "Line Testers", "Crimping Tools", "Bolt Cutters", "Tin Cutters", "Wire Strippers", "Cutting Pliers", "Nose Pliers", "Side Cutters", "Water Pump Pliers", "Adjustable Wrench", "Pipe Wrench", "Circlip Pliers", "Socket Wrench", "Spanners", "Allen Key", "D-Shackles", "Crane Belt", "Loading Belt", "T-Spanner", "Vernier Caliper", "Bench Vice", "Hydraulic Bottle Jack", "Air Foot Pump", "Hack Saw Frames & Blades", "Files"] },
  { category: "Gas Welding Sets", items: ["Oxygen Regulator", "LPG Regulator", "Acetylene Regulator", "Nozzles", "Gas Cutting Torch", "Hoses", "Flash Back Arrestors"] },
  { category: "Bits", items: ["Star Bits", "Concrete Drill Bits", "Granite Core Bits", "Steel Hole Bits", "Wooden Holesaw Bits", "Socket Bits"] },
  { category: "Ropes", items: ["Heavy Duty Yellow Ropes", "Tie Ropes", "Cable Tags", "Lifting Ropes"] },
  { category: "Construction Materials", items: ["Concrete Paper Rolls", "Love Birds Net", "Shade Nets", "Masonry Trowel/Karni", "Matta Palagai", "MS Satti", "Plastic Satti", "Wheel Barrows", "Fiber Mesh", "Level Tube", "Try Square", "Spirit Level", "Cover Blocks", "Sponge", "MS Wire", "GI Wire", "Expansion Joint Pad", "Man Hole Covers", "Concrete Sheet Paper", "Blue Plastic Sheet Roll", "Plumbobs", "Levers & Pins"] },
  { category: "Disinfectant", items: ["Termiguard Liquid", "Termiguard Spray"] },
  { category: "Rust Remover", items: ["WD-40", "G1"] },
  { category: "Electrodes", items: ["Welding Electrodes", "Brass Electrodes", "MS Welding Electrodes"] },
  { category: "Paint", items: ["Red Oxide", "Yellow Primer", "Grey Primer", "Spray Paint"] },
  { category: "Brushes", items: ["Paint Brush", "Paint Roller"] },
  { category: "Locks", items: ["Beehive/Beerow Locks", "Gate Locks", "Shutter Locks", "Venus Padlock 67mm"] },
];

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const products: Product[] = sourceCatalogue.flatMap(({ category, items }) => items.map((name) => ({ id: `${slugify(category)}-${slugify(name)}`, name, category, slug: `${slugify(category)}-${slugify(name)}` })));
export const categories = sourceCatalogue.map(({ category, items }) => ({ category, count: items.length }));
export const categorySlug = (category: string) => slugify(category);
export const getCategoryBySlug = (slug: string) => categories.find((category) => categorySlug(category.category) === slug);
export const categoryDescription = (category: string) => `Browse the listed ${category.toLowerCase()} products in the M.A.S. Traders catalogue.`;
export const featuredCategoryNames = ["Safety Equipment", "Power Tools", "Fasteners", "Hand Tools", "Construction Materials", "Adhesives / Tapes"];

const representativeProductNames: Record<string, string[]> = {
  "Safety Equipment": ["Safety Shoe", "Safety Helmet", "Safety Jerkin", "Safety Gloves"],
  "Building Damping / Waterproofing": ["Dr. Fixit", "Fosroc", "Sika"],
  "Adhesives / Tapes": ["Silicon", "Fevicol", "Araldite", "PU Foams"],
  Fasteners: ["MS Nails", "MS Bolt Nuts", "Anchor Bolts", "Foundation Bolts"],
  "Abrasive & Rotary Tools": ["Cutting Wheels", "Grinding Wheel", "Polishing Wheels", "Flap Disc"],
  "Wheel Items": ["Wheel Barrow Wheels", "Fast Food Vehicle Wheels", "Desk Wheels"],
  "Power Tools": ["Drill Machines", "Cut-Off Machines", "Angle Grinder Machines", "Tiles Cutter"],
  "Measurement Tools": ["Measurement Tapes"],
  "Gate Designing & Fittings": ["Hinges", "Sheet Metals", "Tower Bolts", "Aldrops"],
  "MS Plates": ["All sizes available"],
  "Hand Tools": ["Hammer", "Screw Drivers", "Cutting Pliers", "Adjustable Wrench"],
  "Gas Welding Sets": ["Oxygen Regulator", "LPG Regulator", "Gas Cutting Torch", "Flash Back Arrestors"],
  Bits: ["Star Bits", "Concrete Drill Bits", "Granite Core Bits", "Steel Hole Bits"],
  Ropes: ["Heavy Duty Yellow Ropes", "Tie Ropes", "Cable Tags", "Lifting Ropes"],
  "Construction Materials": ["Masonry Trowel/Karni", "Wheel Barrows", "Spirit Level", "Blue Plastic Sheet Roll"],
  Disinfectant: ["Termiguard Liquid", "Termiguard Spray"],
  "Rust Remover": ["WD-40", "G1"],
  Electrodes: ["Welding Electrodes", "Brass Electrodes", "MS Welding Electrodes"],
  Paint: ["Red Oxide", "Yellow Primer", "Grey Primer", "Spray Paint"],
  Brushes: ["Paint Brush", "Paint Roller"],
  Locks: ["Beehive/Beerow Locks", "Gate Locks", "Shutter Locks", "Venus Padlock 67mm"],
};

export const catalogueImages: Record<string, string> = {
  "Safety Equipment": "/manus-storage/mas-safety-equipment_7c4c359e.jpg",
  "Power Tools": "/manus-storage/mas-power-tools_abba00a4.jpg",
  Fasteners: "/manus-storage/mas-fasteners_71f93007.jpg",
  "Hand Tools": "/manus-storage/mas-power-tools_abba00a4.jpg",
  "Construction Materials": "/manus-storage/mas-fasteners_71f93007.jpg",
  "Adhesives / Tapes": "/manus-storage/mas-safety-equipment_7c4c359e.jpg",
};

export const productImages: Record<string, string> = {
  "safety-equipment-safety-shoe": "/manus-storage/mas-product-safety-safety-shoe_478c8f3c.webp",
  "safety-equipment-safety-helmet": "/manus-storage/s-product-safety-safety-helmet_a8e711fb.webp",
  "safety-equipment-safety-jerkin": "/manus-storage/-product-safety-safety-jerkin_5e372e8c.webp",
  "safety-equipment-safety-gloves": "/manus-storage/s-product-safety-safety-gloves_672d8b27.webp",
  "building-damping-waterproofing-dr-fixit": "/manus-storage/mas-product-waterproofing-dr-fixit_65716038.webp",
  "building-damping-waterproofing-fosroc": "/manus-storage/s-product-waterproofing-fosroc_1a79941e.webp",
  "building-damping-waterproofing-sika": "/manus-storage/s-product-waterproofing-sika_094ee57c.webp",
  "adhesives-tapes-silicon": "/manus-storage/s-product-adhesives-silicon_44388735.webp",
  "adhesives-tapes-fevicol": "/manus-storage/s-product-adhesives-fevicol_aa7f72d3.webp",
  "adhesives-tapes-araldite": "/manus-storage/s-product-adhesives-araldite_e27ffa2e.webp",
  "adhesives-tapes-pu-foams": "/manus-storage/s-product-adhesives-pu-foams_e77602db.webp",
  "fasteners-ms-nails": "/manus-storage/s-product-fasteners-ms-nails_2619aee5.webp",
  "fasteners-ms-bolt-nuts": "/manus-storage/s-product-fasteners-ms-bolt-nuts_dcc2100d.webp",
  "fasteners-anchor-bolts": "/manus-storage/s-product-fasteners-anchor-bolts_8da92e80.webp",
  "fasteners-foundation-bolts": "/manus-storage/s-product-fasteners-foundation-bolts_580b132d.webp",
  "abrasive-rotary-tools-cutting-wheels": "/manus-storage/s-product-abrasives-cutting-wheels_69a93510.webp",
  "abrasive-rotary-tools-grinding-wheel": "/manus-storage/s-product-abrasives-grinding-wheel_4d75c271.webp",
  "abrasive-rotary-tools-polishing-wheels": "/manus-storage/s-product-abrasives-polishing-wheels_b268789b.webp",
  "abrasive-rotary-tools-flap-disc": "/manus-storage/s-product-abrasives-flap-disc_fda95308.webp",
  "wheel-items-wheel-barrow-wheels": "/manus-storage/s-product-wheels-wheel-barrow-wheels_bc8979cd.webp",
  "wheel-items-fast-food-vehicle-wheels": "/manus-storage/s-product-wheels-fast-food-vehicle-wheels_f0accaa7.webp",
  "wheel-items-desk-wheels": "/manus-storage/mas-product-wheels-desk-wheels_6e7b4281.webp",
  "power-tools-drill-machines": "/manus-storage/mas-product-power-tools-drill-machines_9b93c052.webp",
  "power-tools-cut-off-machines": "/manus-storage/s-product-power-tools-cut-off-machines_fe3879ec.webp",
  "power-tools-angle-grinder-machines": "/manus-storage/s-product-power-tools-angle-grinder-machines_0ca1fa01.webp",
  "power-tools-tiles-cutter": "/manus-storage/s-product-power-tools-tiles-cutter_5b748b18.webp",
  "measurement-tools-measurement-tapes": "/manus-storage/s-product-measurement-measurement-tapes_cf3a180c.webp",
  "gate-designing-fittings-hinges": "/manus-storage/mas-product-gate-hinges_04008f50.webp",
  "gate-designing-fittings-sheet-metals": "/manus-storage/s-product-gate-sheet-metals_5b17021e.webp",
  "gate-designing-fittings-tower-bolts": "/manus-storage/mas-product-gate-tower-bolts_88f37c23.webp",
  "gate-designing-fittings-aldrops": "/manus-storage/mas-product-gate-aldrops_3257e234.webp",
  "ms-plates-all-sizes-available": "/manus-storage/s-product-ms-plates-all-sizes-available_843d0abe.webp",
  "hand-tools-hammer": "/manus-storage/s-product-hand-tools-hammer_d0840fbd.webp",
  "hand-tools-screw-drivers": "/manus-storage/mas-product-hand-tools-screw-drivers_717d1de2.webp",
  "hand-tools-cutting-pliers": "/manus-storage/s-product-hand-tools-cutting-pliers_5960386e.webp",
  "hand-tools-adjustable-wrench": "/manus-storage/s-product-hand-tools-adjustable-wrench_cfb97f12.webp",
  "gas-welding-sets-oxygen-regulator": "/manus-storage/s-product-gas-welding-oxygen-regulator_d442ca3b.webp",
  "gas-welding-sets-lpg-regulator": "/manus-storage/mas-product-gas-welding-lpg-regulator_a64a173a.webp",
  "gas-welding-sets-gas-cutting-torch": "/manus-storage/mas-product-gas-welding-gas-cutting-torch_28fbf211.webp",
  "gas-welding-sets-flash-back-arrestors": "/manus-storage/s-product-gas-welding-flash-back-arrestors_f5a43b8c.webp",
  "bits-star-bits": "/manus-storage/s-product-bits-star-bits_bd171642.webp",
  "bits-concrete-drill-bits": "/manus-storage/s-product-bits-concrete-drill-bits_f9de4797.webp",
  "bits-granite-core-bits": "/manus-storage/s-product-bits-granite-core-bits_6561cc46.webp",
  "bits-steel-hole-bits": "/manus-storage/s-product-bits-steel-hole-bits_aef039f2.webp",
  "ropes-heavy-duty-yellow-ropes": "/manus-storage/s-product-ropes-heavy-duty-yellow-ropes_f19e028a.webp",
  "ropes-tie-ropes": "/manus-storage/s-product-ropes-tie-ropes_f87a2c8c.webp",
  "ropes-cable-tags": "/manus-storage/s-product-ropes-cable-tags_1c1a2616.webp",
  "ropes-lifting-ropes": "/manus-storage/s-product-ropes-lifting-ropes_c98d6e83.webp",
  "construction-materials-masonry-trowel-karni": "/manus-storage/s-product-construction-masonry-trowel-karni_7805be8f.webp",
  "construction-materials-wheel-barrows": "/manus-storage/s-product-construction-wheel-barrows_ec8a7210.webp",
  "construction-materials-spirit-level": "/manus-storage/s-product-construction-spirit-level_347ca3cf.webp",
  "construction-materials-man-hole-covers": "/manus-storage/s-product-construction-man-hole-covers_aa05b952.webp",
  "disinfectant-termiguard-liquid": "/manus-storage/s-product-disinfectant-termiguard-liquid_8c662540.webp",
  "disinfectant-termiguard-spray": "/manus-storage/s-product-disinfectant-termiguard-spray_32f601e6.webp",
  "rust-remover-wd-40": "/manus-storage/s-product-rust-wd-40_79bb6589.webp",
  "rust-remover-g1": "/manus-storage/s-product-rust-g1_7a524c91.webp",
  "electrodes-welding-electrodes": "/manus-storage/s-product-electrodes-welding-electrodes_fd647c50.webp",
  "electrodes-brass-electrodes": "/manus-storage/s-product-electrodes-brass-electrodes_184c01ce.webp",
  "electrodes-ms-welding-electrodes": "/manus-storage/s-product-electrodes-ms-welding-electrodes_03151a51.webp",
  "paint-red-oxide": "/manus-storage/s-product-paint-red-oxide_50e0e1d8.webp",
  "paint-yellow-primer": "/manus-storage/s-product-paint-yellow-primer_50674eac.webp",
  "paint-grey-primer": "/manus-storage/mas-product-paint-grey-primer_f067648d.webp",
  "paint-spray-paint": "/manus-storage/s-product-paint-spray-paint_5bebeff5.webp",
  "brushes-paint-brush": "/manus-storage/s-product-brushes-paint-brush_5131e4e2.webp",
  "brushes-paint-roller": "/manus-storage/mas-product-brushes-paint-roller_8f717ca1.webp",
  "locks-beehive-beerow-locks": "/manus-storage/mas-product-locks-beehive-beerow-locks_94219b4e.webp",
  "locks-gate-locks": "/manus-storage/mas-product-locks-gate-locks_d5b7012e.webp",
  "locks-shutter-locks": "/manus-storage/mas-product-locks-shutter-locks_37f95701.webp",
  "locks-venus-padlock-67mm": "/manus-storage/venus-padlock-67mm-online-reference_4fa36998.webp",
  "construction-materials-blue-plastic-sheet-roll": "/manus-storage/blue-poly-sheet-roll-online-reference_bb6be6e5.jpg",
};

const currentProductIds = new Set(Object.keys(productImages));
export const currentProducts = products.filter((product) => currentProductIds.has(product.id));
export const currentCategories = categories.flatMap((category) => {
  const count = currentProducts.filter((product) => product.category === category.category).length;
  return count ? [{ ...category, count }] : [];
});

export function productImage(product: Product) {
  return productImages[product.id] ?? catalogueImages[product.category] ?? "/manus-storage/mas-hero-industrial-supply_d41860d6.jpg";
}

export function findProducts(query: string, category = "All") {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return products.filter((product) => {
    if (category !== "All" && product.category !== category) return false;
    if (!terms.length) return true;
    const haystack = `${product.name} ${product.category}`.toLowerCase();
    return terms.every((term) => haystack.includes(term) || haystack.split(/[^a-z0-9]+/).some((word) => word.startsWith(term)));
  });
}

export function getProductsByCategory(category: string) { return products.filter((product) => product.category === category); }
export function getCurrentProductsByCategory(category: string) { return currentProducts.filter((product) => product.category === category); }
export function findCurrentProducts(query: string, category = "All") {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return currentProducts.filter((product) => {
    if (category !== "All" && product.category !== category) return false;
    if (!terms.length) return true;
    const haystack = `${product.name} ${product.category}`.toLowerCase();
    return terms.every((term) => haystack.includes(term) || haystack.split(/[^a-z0-9]+/).some((word) => word.startsWith(term)));
  });
}
export function getRepresentativeProducts(category: string) {
  const categoryProducts = getCurrentProductsByCategory(category);
  const selected = (representativeProductNames[category] ?? []).map((name) => categoryProducts.find((product) => product.name === name)).filter((product): product is Product => Boolean(product));
  return [...selected, ...categoryProducts.filter((product) => !selected.some((selectedProduct) => selectedProduct.id === product.id))].slice(0, 4);
}

export function getCategoryCardImage(category: string) {
  const representative = getRepresentativeProducts(category)[0];
  return representative ? productImage(representative) : catalogueImages[category] ?? "/manus-storage/mas-hero-industrial-supply_d41860d6.jpg";
}
export function getProduct(slug: string) { return products.find((product) => product.slug === slug); }
