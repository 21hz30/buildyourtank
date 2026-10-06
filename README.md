# Build Your Tank

A student passion project with a public introduction and an interactive aquarium workspace. React 19 + Vite, with original editable illustrations.

## Run locally

Node.js 22 or later is recommended.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. Keep the server terminal session running. To use another port, append `-- --port 5184`.

```sh
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 5184
```

## Pages and flows

- Home introduces the project before demo entry; nickname or guest entry opens My tanks.
- My tanks creates and switches multiple independent tanks. A room with fixed-scale furniture shows 60P, 120P and 150P sizes, all anchored to the same tabletop. Observe tank opens a close-up with 75–250% zoom, reset, and scroll/swipe navigation. Species, pH, temperature, hardness and nutrients appear alongside it.
- Tank idea explores example community setups and a local gallery of your selected tanks. Opening a tank is read-only; purchasing a copy creates a new tank.
- Fish store offers aquarium fish, 269 plants with real species/cultivar photographs, substrate, filters, glass finishes, tank upgrades and care supplies. Fish/plants go into the selected tank; food/water/fertilizer go into the shared bag.
- Fish and plant quantities have no stocking or per-species caps. Bioload remains an informational estimate and never blocks additions, setup changes or tank copies. Purchases use your available coins; saved tanks and shared snapshots preserve quantities above the former limits.
- Learn is a searchable encyclopedia with 121 fish entries organized into 18 aquarium groups, alongside plants, substrates, equipment and care supplies. Each fish group introduces characteristics, distribution, morphology and habits with reading sources, then lists all its fish and color varieties. Group and entry links survive refresh; fish details link back to their group and suggest related fish from the same group.
- Daily check-in grants 20 demo coins once per local date. Feeding consumes one food portion and grants 5 coins; water care consumes one refill and grants 8. Fertilizer consumes one dose and increments the educational nutrient index.
- Automatic browser saving preserves tanks, budget, supplies and care dates. Snapshot links remain read-only and can be copied into a new tank.

Hash routes: `#/home`, `#/login`, `#/my-tanks`, `#/ideas`, `#/store`, `#/learn`, `#/learn?entry=fish-betta`, and `#tank=…` snapshots. Refreshing each route works with a static Vercel deployment.

## Prototype boundaries

This demo uses versioned localStorage at `buildyourtank:workspace:v2`. It migrates the existing `buildyourtank:v1` aquarium and leaves the old storage record intact. It does not identify a person across browsers/devices.

The login page is a labeled demo entry, not account authentication. The gallery contains sample tanks and this browser's own selected tanks, not live users. Local display switches do not publish online. Snapshot links capture one configuration, not future edits. Localhost links only work on a computer running the server; a deployment uses the hosted URL.

Prices, species properties, pH/substrate effects, temperature and nutrient warnings, capacity and 30-day growth are provisional educational models. Species-specific chemistry and real market prices are not validated. Hardness is an editable saved setting, not a modeled chemical process. The original illustrations are prototype artwork. Encyclopedia care ranges are editorial starting points, pending species and manufacturer-source review; they are separate from the simulator’s simplified values.

No backend, Supabase connection or online deployment was performed in this design revision. Cloud accounts, server-owned balances/inventory and real public tanks require a subsequent backend implementation.

## Deployment

Vercel configuration: project root is this directory; framework Vite; build `npm run build`; output `dist`. No environment variables are required for this browser-storage demo.

GitHub: https://github.com/21hz30/buildyourtank. The branch is `main`.

[Design brief and validation notes](docs/design.md).

## First tank guide and demo recording

First-time nickname or guest entry offers a 12-step guide after login. Use **Guide** in the header to resume, replay, or edit it. Steps open real features, allow free navigation, and save reading progress separately from your tanks. Next step marks a step as reviewed; purchases and care remain manual.

**Edit guide & script** changes step order, descriptions, instructions, feature destinations, narration and recording notes. Export/import JSON preserves edits across browsers; export Markdown produces a recording script with cumulative timecodes. The default English narration and Chinese filming notes plan a 3:55 application demo.

- [Guide usage, project overview and editing instructions](docs/onboarding-guide.md)
- [Editable demo recording script](docs/demo-script.md)
- Default shared content: `src/content/guide.json`; regenerate the script with `npm run guide:script`.
