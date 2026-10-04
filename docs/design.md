# Build Your Tank — student prototype

## Direction

An inviting aquarium workbench: white surfaces, a very pale mint page, ink-colored type, sage accents, and a coral action. The aquarium is the largest object on the screen. The first viewport contains the actual builder; no introductory marketing page is required.

Built-in image generation is unavailable in this session. Use the supplied angelfish raster non-destructively and original vector aquatic illustrations as an explicit prototype-art deviation. No AI-generated concept has been accepted, so do not claim comparison against one.

## Screen and copy

- Header: Build Your Tank, My tank, Tank ideas, How it works, current coin balance.
- Heading: "A little world. All yours." with one sentence explaining the build activity.
- Builder: tank preview and care actions on the left; fish, plants, and setup catalog on the right.
- Tank footer: add/remove summary, editable name, browser-save indicator.
- Actions: feed fish, change water, preview 30 days, save, share snapshot.
- Tank ideas: three reusable starting arrangements in a dialog, each showing its contents and price.
- Help: three clear steps plus explanation of this-browser storage and educational simulation.

## Tokens

- Page `#f6f9f7`; surfaces `#ffffff`; primary ink `#233a35`; muted type `#77837d`; lines `#e4ebe5`.
- Sage `#779f87`; pale sage `#eaf2eb`; coral `#ed9b72`; gold `#e4b34c`.
- Display: Georgia/Times serif, 56–62 px desktop and 42 px mobile. UI: system sans, 13–15 px, explicit control typography.
- Layout: max width 1320 px; two columns, roughly 2:1; 28 px gap; rounded aquarium frame (20 px), catalog tabs and unframed list rows.
- Motion: subtle swimming, rising bubbles, brief feeding particles. Reduced-motion users get a still scene.

## Behaviors and boundaries

Versioned local storage saves every change and validates restored data. Shares encode a validated, size-limited snapshot in the URL fragment and open read-only; "Make it mine" copies it into the local workspace. This is not a live cloud share.

Catalog prices and water behavior are toy-model values for interface exploration. Purchases and larger tanks must fit the available coins. Removing items refunds their full demo price. Daily care rewards can be claimed once per action per browser-local day. A 30-day preview gives calculated educational outcomes without changing the live tank.

Vercel-compatible static Vite build. Supabase and cloud storage are not connected in this prototype.
