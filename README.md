# Build Your Tank

A student passion project with a working aquarium builder. Built with React + Vite and local artwork.

## Repository

GitHub: [21hz30/buildyourtank](https://github.com/21hz30/buildyourtank).

The main branch is `main`. After making and checking changes in this directory:

```sh
git add .
git commit -m "feat(tank): describe the change"
git push
```

Dependencies, build output, local environment files, and administrative contracts are excluded from version control.

## Run

Node.js 22 or later is recommended.

```sh
npm ci
npm run dev -- --port 5184
```

Open http://127.0.0.1:5184. The server runs while its terminal session is alive. The default configured port is 5173; the preview uses 5184 to avoid another local app.

```sh
npm test
npm run build
npm run preview -- --host 127.0.0.1 --port 5184
```

## What works

- Six fish species, three plants, three tank sizes, substrates, and filters.
- Coin purchases and refunds, with budget checks.
- One feeding and one water-change reward per browser-local day.
- Automatic browser saving, editable names, and restoration after reload.
- Read-only snapshot URLs; visitors can copy a shared tank into their own browser.
- A calculated 30-day educational preview and three starter ideas.
- Responsive layout, keyboard-accessible store tabs, native accessible dialogs, and reduced-motion support.

## Prototype boundaries

Browser saving uses `buildyourtank:v1`. It does not identify users across devices. Snapshot URLs contain the configuration in the URL fragment, not a database record, and do not update after editing. A localhost snapshot is only reachable on the computer running the server; after deployment the same sharing flow uses the hosted site URL.

Prices, bioload, pH, and growth are a simplified toy model. They need validated product rules and species data before being used as real fishkeeping guidance. This design pass does not include uploads, accounts, a backend, or the full PRD inventory/equipment system.

Built-in image generation was unavailable. Fish and plants use original SVG prototype artwork plus the supplied angelfish cutout; the source assets were preserved. [Design direction](docs/design.md).

## Deploy to Vercel

Import this directory as the project root, choose **Vite**, run `npm run build`, and publish **dist**. No environment variables are needed for this local-storage prototype. Vercel is not connected or deployed by this design task.

For cloud ownership and live sharing, the next step is Supabase Anonymous Auth, per-owner database policies, and a tank persistence service. This frontend currently uses browser storage only.
