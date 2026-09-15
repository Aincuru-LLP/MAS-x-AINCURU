import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");
const SITEMAP_PATH = path.join(PROJECT_ROOT, "client", "public", "sitemap.xml");

const BASE_URL = "https://mas-traders.com";
const TODAY = new Date().toISOString().split("T")[0];

const sourceCatalogue = [
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

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const urls = [];

// Static Pages
urls.push({
  loc: `${BASE_URL}/`,
  lastmod: TODAY,
  changefreq: "daily",
  priority: "1.0",
});

urls.push({
  loc: `${BASE_URL}/catalogue`,
  lastmod: TODAY,
  changefreq: "daily",
  priority: "0.9",
});

// Category Pages
for (const group of sourceCatalogue) {
  const catSlug = slugify(group.category);
  urls.push({
    loc: `${BASE_URL}/category/${catSlug}`,
    lastmod: TODAY,
    changefreq: "weekly",
    priority: "0.8",
  });
}

// Product Pages
for (const group of sourceCatalogue) {
  const catSlug = slugify(group.category);
  for (const item of group.items) {
    const itemSlug = slugify(item);
    urls.push({
      loc: `${BASE_URL}/product/${catSlug}-${itemSlug}`,
      lastmod: TODAY,
      changefreq: "weekly",
      priority: "0.7",
    });
  }
}

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

fs.writeFileSync(SITEMAP_PATH, sitemapXml, "utf-8");
console.log(`Successfully generated sitemap with ${urls.length} URLs at ${SITEMAP_PATH}`);
