# Navigation Overlay QA Notes

The mobile navigation was opened in the interactive preview after forcing the compact navigation presentation for inspection. The portal-based overlay occupied the full viewport with an opaque deep-navy surface; the hero, technical grid, product imagery, sticky action bar, and desktop header did not show through the menu. The menu retained only its own logo, close control, six route actions, requirement control, and quote action.

The visible menu links were independently readable, with white text and restrained blue index marks rather than large blue background rectangles. The verified layering order keeps the page content and sticky action bar below the mobile menu, with dialogs explicitly above it. The new implementation also captures focus, supports Escape, locks the background at its current scroll position, and restores that position and trigger focus when closed.

At **390 × 844** and **834 × 1112**, the normal header showed a single compact navigation state with readable logo, requirement trigger, and menu trigger. The industrial grid remained subtle beneath high-contrast hero copy, while the safe-area-aware action bar stayed below the content and did not obscure the controls above it.

An interactive keyboard verification confirmed that, once the overlay is open, **Escape** closes it, removes the fixed-body scroll lock, and restores focus to the original menu trigger. Direct route screenshots for the finder, Safety Equipment category, and Safety Helmet detail page also rendered normally at the phone breakpoint.
