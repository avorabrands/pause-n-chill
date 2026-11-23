# Pause n Chill — Sips, Scoops & Snacks

Single-page restaurant website built with **Vite + React + TypeScript** (plain CSS, no animation libraries, 2D motion only).

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Add the food photos (one-time, no account or key needed)

```bash
npm run fetch-images
```

This downloads one hand-picked Pexels photo per menu item (102 items + 6 combos + 3 hero shots) (listed in `scripts/photos.json`, named after the item, e.g. `paneer-pizza.webp`), optimises them to WebP in `public/images/` and writes `CREDITS.md` with the photographer for each. Photos are stored locally; the site never hot-links images. Until they exist, cards show an emoji placeholder.

To swap a photo, change its `id` in `photos.json` (the number at the end of a Pexels photo URL) and run `npm run fetch-images -- --force`, or drop your own WebP with the same name into `public/images/menu/`. Pexels photos are free for commercial use ([licence](https://www.pexels.com/license/)).

## Edit content

| What | Where |
|---|---|
| Menu items, prices, combos, best sellers | `src/data/menu.ts` (single file) |
| Address, phone, WhatsApp number, hours, Maps link, socials | `src/data/site.ts` |
| Colours, spacing, fonts | CSS variables at the top of `src/styles/global.css` |

**Before launch:** replace the placeholder phone / WhatsApp / address / Maps link in `src/data/site.ts`. The WhatsApp number must be digits only with country code (e.g. `919876543210`).

## How ordering works

"Add to Order" fills an on-page order list. "Send order on WhatsApp" opens WhatsApp with the items, quantities and total pre-filled. There is **no payment gateway** — payment is handled directly with the shop.

## Structure

```
src/
  components/   Header, Hero, Combos, Menu, MenuCard, Featured, Why, Contact, Footer, CartModal, FoodImage, …
  context/      CartContext (order state + WhatsApp message)
  data/         menu.ts, site.ts, types.ts
  hooks/        useReveal (scroll fade/slide)
  styles/       global.css
scripts/        fetch-images.mjs
public/         logo.png, favicon, og-image, images/
```

## Notes

- Motion: gentle fade/slide reveals, hover/press feedback, smooth scrolling. No 3D, WebGL, parallax or tilt. Reduced-motion users get no animation; small screens get simplified motion.
- Accessibility: skip link, keyboard-navigable tabs/filters, focus-trapped order dialog (Esc closes), labelled controls, veg/non-veg shown by symbol *and* text for screen readers.
- Fonts (Baloo 2, DM Sans) are bundled locally via `@fontsource`.
# pause-n-chill
