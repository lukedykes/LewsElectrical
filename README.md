# Lews Electrical Ltd · Concept website

A concept website for [Lews Electrical Ltd](https://www.lewselectrical.co.uk), electrical contractors for homes,
businesses and the rail industry across Essex and London. Designed and built by
[Own Time Studios](https://www.owntimestudios.com) as a "see it before you spend a penny" demo.

**Demo link (once GitHub Pages is switched on):** https://lukedykes.github.io/LewsElectrical/

A slim strip at the top says it is a concept by Own Time Studios, and a `noindex` tag keeps it out of search results
until the client signs off.

## Design approach

The site is built from the client's own printed flyers rather than a generic template, so it looks like their business:

- **Their colours and type.** Deep navy, signal red and white, with heavy italic condensed capitals for headlines
  (Barlow Condensed) and the slanted red banner behind key words, as on the flyers. Body text is Barlow.
- **Their words.** Headlines, checklists and offers come from the flyers: "Expert electrical solutions", "Do you need
  your home rewired?", "Got a shop or salon that needs modernising?", "Refer a friend and be rewarded!", the red tick
  lists and the round "A safer, brighter home starts here" badge.
- **Local photography.** Southend Pier at sunset, Leigh-on-Sea, Westcliff, Rayleigh, Southend High Street and Chappel
  Viaduct, all from Wikimedia Commons with credits in the footer. No trains or stations, at the client's request.
- **Plain and practical.** No animation tricks. Phone number on every screen, a sticky call bar on phones, a simple
  contact form and fast pages (about 1.2 MB of images in total).

## Sections

1. Header with accreditations, phone, email and a sticky menu
2. Hero: "Expert electrical solutions" for homes, businesses and the rail industry
3. Domestic, commercial and rail panels
4. Services (the seven services from the flyer)
5. Home rewires, with warning signs and fuse board photos
6. Shops, salons and workplaces
7. Rail infrastructure
8. How it works and why choose Lews
9. Refer a friend (£50 / £150)
10. Areas covered
11. FAQs
12. Contact form and details

## Stack

- React 19 + TypeScript 7
- [Panda CSS](https://panda-css.com) 2 for styling (design tokens in `panda.config.ts`)
- Vite 8 (Rolldown) on Node.js
- `server.mjs`: a zero-dependency Node server that serves the build and accepts enquiries

## Getting the GitHub link

1. Make sure Pages is available for the repository. Pages on a **private** repo needs a paid GitHub plan; on the free
   plan, make the repo public first (Settings → General → Danger zone → Change visibility).
2. Settings → Pages → Build and deployment → Source: **GitHub Actions**.
3. Merge this branch into `main`. The `GitHub Pages` workflow builds and deploys, and the site appears at
   https://lukedykes.github.io/LewsElectrical/. You can also deploy any branch by hand from the Actions tab
   (GitHub Pages → Run workflow); if GitHub refuses with "environment protection rules", add the branch under
   Settings → Environments → github-pages.

## Single-file demo

`demo/lews-electrical-demo.html` is the whole site in one self-contained HTML file, with images and fonts included.
Open it straight from disk, send it as an attachment, or host it anywhere static. Rebuild it with
`npm run build:single`.

## Running locally

```bash
npm install          # also generates the Panda styled-system
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # type-check and build to dist/
npm start            # serve dist/ with the Node server at http://localhost:4173
npm run build:single # rebuild demo/lews-electrical-demo.html
```

When the site is served by `npm start`, the contact form posts to `POST /api/enquiry` and enquiries are stored in
`data/enquiries.ndjson`. On static hosting (GitHub Pages, the single file) the form runs in demo mode and says so.

## Project layout

```
src/
  App.tsx              page composition
  data/site.ts         all business details and wording (phone, services, checklists, FAQs, areas)
  sections/            one file per page section
  components/          header, logo, shared UI (buttons, tick lists, red highlight)
  lib/contact.tsx      "get a quote" buttons that jump to the form with the service picked
  assets/images/       Essex and London photography (see CREDITS.md)
  assets/fonts/        Barlow and Barlow Condensed (SIL OFL)
panda.config.ts        colours, type styles
server.mjs             production server + enquiry endpoint
scripts/inline-build.mjs  builds the single-file demo
```

## Before going live

- Replace the stock photos with real job photos, and the drawn wordmark with the client's logo files.
- Add genuine Google or Checkatrade reviews (none are shown, so nothing is invented).
- Connect `/api/enquiry` to email or a CRM, or point the form at a form service.
- Remove the concept strip, the `noindex` meta tag and the `robots.txt` rule, then point www.lewselectrical.co.uk at
  the host.
- Confirm the areas covered, the FAQ answers, the rail wording and the referral terms with the client.
