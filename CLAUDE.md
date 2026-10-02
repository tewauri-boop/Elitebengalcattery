# Elite Bengal Cattery — project instructions

React/Next.js App Router ecommerce site, Vercel ready, deployed via GitHub. Single-source-of-truth architecture.

## Non-negotiable: Ethical Breeding Compliance
- Zero tolerance for puppy/kitten mill associations. Always frame as: "TICA registered ethical hobby cattery", "In-home cage-free nursery", "Certified DNA health-tested parents".
- Never invent awards, fake customer quotes, or veterinary medical certifications.
- If a request would require breaking any of the above, stop and say so rather than complying.

## Architecture
`src/config/site.js` is the single source of truth. Adding one entry to PRODUCTS, CATEGORIES, or POSTS
generates the page, route, meta, JSON-LD, sitemap entry, nav links, and agent endpoints.
Never hand-write duplicate catalog data.
Never hand-edit generated files (llms.txt, .well-known/*, vercel.json) — edit the config and run `npm run gen`.

## Rules
- `npm run build && npm run crosscheck` must pass before every deployment.
- Exactly one `<h1>` per page. Meta descriptions in ~150 char band. Titles ≤60 chars.
- Product images: 4:3 frame ratio with `SmartImage` next/image wrapper and `referrerPolicy="no-referrer"`.
- Emails entity-encoded (&#64;) everywhere including JSON-LD and HTML text.
- Never commit node_modules/, .next/, or tracked secrets.
- Framework Preset on Vercel must be "Next.js".

## Live placeholders
- Domain: `DOMAIN.com` (domain pending — update in `src/config/site.js` when registered)
- Web3Forms Key: `pending` (forms fall back safely to thank-you redirect; WhatsApp concierge is primary)
- GSC Verification: `pending`

## Brand facts (truthful only)
- Founded: 2019 in North Carolina, USA
- Registration: TICA (The International Cat Association)
- Delivery: Nationwide in-cabin white-glove flight pet nanny delivery included
- Health Guarantee: 2-Year Congenital Warranty, PK-Def & PRA-b clear parentage, annual cardiologist HCM scans
- Payment: Zelle, Cash App, PayPal, Chime, crypto (10% discount on BTC/USDT), bank wire, gift cards
- Order Rules: $500 reservation deposit; free courier delivery
