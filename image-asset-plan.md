# M.A.S. Traders Current Product Image Scope

The current Product Finder image project covers **68 specified products** across 21 categories. The prompt refers to approximately 67 products; the enumerated list runs from 1 through 68. The prior 141-product catalogue must not be processed for image work.

## Existing image audit

- The existing `productImage()` helper maps only a small set of categories to a few shared industrial images and falls back to a generic hero image.
- Product cards currently reuse these category-level images, creating incorrect visual associations across unrelated products.
- The image refactor must introduce product-level asset references, keep existing routes and product-card behavior, use `object-fit: contain`, and retain lazy loading.

## Approved categories and product counts

| Category | Products to process |
|---|---:|
| Safety Equipment | 4 |
| Building Damping / Waterproofing | 3 |
| Adhesives / Tapes | 4 |
| Fasteners | 4 |
| Abrasive & Rotary Tools | 4 |
| Wheel Items | 3 |
| Power Tools | 4 |
| Measurement Tools | 1 |
| Gate Designing & Fittings | 4 |
| MS Plates | 1 |
| Hand Tools | 4 |
| Gas Welding Sets | 4 |
| Bits | 4 |
| Ropes | 4 |
| Construction Materials | 4 |
| Disinfectant | 2 |
| Rust Remover | 2 |
| Electrodes | 3 |
| Paint | 4 |
| Brushes | 2 |
| Locks | 3 |

## Image sourcing rules

- Use accurate real brand imagery for Dr. Fixit, Fosroc, Sika, Fevicol, Araldite, Termiguard, WD-40, and G1 when a reliable image can be sourced.
- Use real product photography first for generic products; create neutral AI product studies only where real licensed-quality imagery cannot be sourced.
- Never generate or alter branded packaging, labels, or brand names.
- Assets use lowercase kebab-case names following `mas-product-[category]-[product].webp`.
