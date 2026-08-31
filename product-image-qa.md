# Product Finder Image QA Record

**Scope:** The current Product Finder presents the 68 products explicitly approved in the image brief. The legacy 141-product set is retained only in the underlying catalogue reference and is not displayed in the Product Finder.

**Asset and source records:** Final managed asset paths are defined in `client/src/lib/catalogue.ts` through `productImages`. Original web-research filenames are recorded in `product-image-sources.tsv`, with subsequent verified corrections recorded in `product-image-failover.tsv` and `product-image-quality-replacements.tsv`. All final cards use a dedicated mapped asset, `loading="lazy"`, fixed intrinsic dimensions, and `object-fit: contain`.

| Category | Product | Final mapping | QA |
|---|---|---|---|
| Safety Equipment | Safety Shoe | Dedicated WebP | Pass |
| Safety Equipment | Safety Helmet | Dedicated WebP | Pass |
| Safety Equipment | Safety Jerkin | Dedicated WebP | Pass |
| Safety Equipment | Safety Gloves | Dedicated WebP | Pass |
| Building Damping / Waterproofing | Dr. Fixit | Dedicated WebP | Pass |
| Building Damping / Waterproofing | Fosroc | Dedicated WebP | Pass |
| Building Damping / Waterproofing | Sika | Dedicated WebP | Pass |
| Adhesives / Tapes | Silicon | Dedicated WebP | Pass |
| Adhesives / Tapes | Fevicol | Dedicated WebP | Pass |
| Adhesives / Tapes | Araldite | Dedicated WebP | Pass |
| Adhesives / Tapes | PU Foams | Dedicated WebP | Pass |
| Fasteners | MS Nails | Dedicated WebP | Pass |
| Fasteners | MS Bolt Nuts | Dedicated WebP | Pass |
| Fasteners | Anchor Bolts | Dedicated WebP | Pass |
| Fasteners | Foundation Bolts | Dedicated WebP | Pass |
| Abrasive & Rotary Tools | Cutting Wheels | Dedicated WebP | Pass |
| Abrasive & Rotary Tools | Grinding Wheel | Dedicated WebP | Pass |
| Abrasive & Rotary Tools | Polishing Wheels | Dedicated WebP | Pass |
| Abrasive & Rotary Tools | Flap Disc | Dedicated WebP | Pass |
| Wheel Items | Wheel Barrow Wheels | Dedicated WebP | Pass |
| Wheel Items | Fast Food Vehicle Wheels | Dedicated WebP | Pass |
| Wheel Items | Desk Wheels | Dedicated WebP | Pass |
| Power Tools | Drill Machines | Dedicated WebP | Pass |
| Power Tools | Cut-Off Machines | Dedicated WebP | Pass |
| Power Tools | Angle Grinder Machines | Dedicated WebP | Pass |
| Power Tools | Tiles Cutter | Dedicated WebP | Pass |
| Measurement Tools | Measurement Tapes | Dedicated WebP | Pass |
| Gate Designing & Fittings | Hinges | Dedicated WebP | Pass |
| Gate Designing & Fittings | Sheet Metals | Dedicated WebP | Pass |
| Gate Designing & Fittings | Tower Bolts | Dedicated WebP | Pass |
| Gate Designing & Fittings | Aldrops | Dedicated WebP | Pass |
| MS Plates | All sizes available | Dedicated WebP | Pass |
| Hand Tools | Hammer | Dedicated WebP | Pass |
| Hand Tools | Screw Drivers | Dedicated WebP | Pass |
| Hand Tools | Cutting Pliers | Dedicated WebP | Pass |
| Hand Tools | Adjustable Wrench | Dedicated WebP | Pass |
| Gas Welding Sets | Oxygen Regulator | Dedicated WebP | Pass |
| Gas Welding Sets | LPG Regulator | Dedicated WebP | Pass |
| Gas Welding Sets | Gas Cutting Torch | Dedicated WebP | Pass |
| Gas Welding Sets | Flash Back Arrestors | Dedicated WebP | Pass |
| Bits | Star Bits | Dedicated WebP | Pass |
| Bits | Concrete Drill Bits | Dedicated WebP | Pass |
| Bits | Granite Core Bits | Dedicated WebP | Pass |
| Bits | Steel Hole Bits | Dedicated WebP | Pass |
| Ropes | Heavy Duty Yellow Ropes | Dedicated WebP | Pass |
| Ropes | Tie Ropes | Dedicated WebP | Pass |
| Ropes | Cable Tags | Dedicated WebP | Pass |
| Ropes | Lifting Ropes | Dedicated WebP | Pass |
| Construction Materials | Masonry Trowel/Karni | Dedicated WebP | Pass |
| Construction Materials | Wheel Barrows | Dedicated WebP | Pass |
| Construction Materials | Spirit Level | Dedicated WebP | Pass |
| Construction Materials | Man Hole Covers | Dedicated WebP | Pass |
| Disinfectant | Termiguard Liquid | Dedicated WebP | Pass |
| Disinfectant | Termiguard Spray | Dedicated WebP | Pass |
| Rust Remover | WD-40 | Dedicated WebP | Pass |
| Rust Remover | G1 | Dedicated WebP | Pass |
| Electrodes | Welding Electrodes | Dedicated WebP | Pass |
| Electrodes | Brass Electrodes | Dedicated WebP | Pass |
| Electrodes | MS Welding Electrodes | Dedicated WebP | Pass |
| Paint | Red Oxide | Dedicated WebP | Pass |
| Paint | Yellow Primer | Dedicated WebP | Pass |
| Paint | Grey Primer | Dedicated WebP | Pass |
| Paint | Spray Paint | Dedicated WebP | Pass |
| Brushes | Paint Brush | Dedicated WebP | Pass |
| Brushes | Paint Roller | Dedicated WebP | Pass |
| Locks | Beehive/Beerow Locks | Dedicated WebP | Pass |
| Locks | Gate Locks | Dedicated WebP | Pass |
| Locks | Shutter Locks | Dedicated WebP | Pass |

## New Product Additions — 2026-08-31

| Product | Category | Managed image | Source verification | Manual flow check |
|---|---|---|---|---|
| Venus Padlock 67mm | Locks | `/manus-storage/venus-padlock-67mm-online-reference_4fa36998.webp` | Palam source page title: “Palam Padlock Venus D/L 67mm 4k”; the catalogue name was aligned to the verified Venus spelling. | Opened the product route, added the item to My Requirement, and confirmed it appeared in the RFQ summary. |
| Blue Plastic Sheet Roll | Construction Materials | `/manus-storage/blue-poly-sheet-roll-online-reference_bb6be6e5.jpg` | [Farm Plastic Supply source page](https://farmplasticsupply.com/Blue-7Mil-Poly), “UV Resistant 7 Mil Poly Cover Blue Polyethylene Plastic Sheeting - Cut To Length”; selected image clearly shows a blue rolled plastic sheet. | Opened the product route, added the item to My Requirement, and confirmed it appeared in the RFQ summary together with the padlock. |

No unsupported price, size, availability, or performance claims were added to the catalogue product copy.

## Verification summary

- All 70 current product cards resolve to a mapped managed asset.
- Desktop category views and mobile representative category views were checked after the final source corrections, including both new product routes.
- The Product Finder, category routes, detail routes, requirement controls, and catalogue download route remain in place.
