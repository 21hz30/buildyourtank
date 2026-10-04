# BuildYourTank first-pass image specifications

These prompts are written for the installed `generate2dsprite` and `generate2dmap` skills. Generate each sprite sheet separately; do not combine unrelated actions into one atlas.

## Reference image

The user-provided reference is stored at `assets/references/zebra-angelfish-reference.png`. Use it as a visual reference for identity and material language only. Do not reproduce the original aquarium background.

## 0. zebra-angelfish-idle-2x2

- Asset type: `creature`
- Action: `idle`
- View: `3/4`
- Sheet: `2x2`, 4 frames
- Bundle: `single_asset`
- Art style: `clean_hd`, aquarium-game sprite
- Anchor: `center`
- Reference: `local_file`

Prompt:

> Use the visible reference image just shown as the visual reference for the same zebra angelfish identity. Preserve the fish's tall triangular body silhouette, golden-silver scales, three strong vertical black bands, large dark eye with warm amber ring, translucent striped dorsal and anal fins, broad tail, and two long white ventral filaments. Create a clean hand-painted HD 2D game sprite sheet for BuildYourTank, with four subtle idle phases arranged as an exact 2x2 sheet: neutral hover, slight dorsal-fin pulse, gentle tail sway, and return to neutral. Keep the same fish identity, camera distance, facing direction, material detail, and standing-equivalent scale in every cell. Center the full fish in each invisible cell and keep every fin tip and filament inside the central 68% safe area. Use a 100% solid flat `#FF00FF` background for chroma-key cleanup. No aquarium background, no plants, no gravel, no bubbles, no text, labels, UI, borders, frames, or detached effects. Nothing may touch or cross a cell edge. Do not redesign the species or change the stripe pattern.


## 1. betta-idle-2x2

- Asset type: `creature`
- Action: `idle`
- View: `3/4`
- Sheet: `2x2`, 4 frames
- Bundle: `single_asset`
- Art style: `clean_hd`
- Anchor: `center`

Prompt:

> A graceful halfmoon betta fish for a calm freshwater virtual aquarium website, shown in a clean hand-painted HD 2D game asset style. Four subtle idle phases arranged as an exact 2x2 sheet: fins gently opening, neutral glide, slight tail sway, and return to neutral. Keep the fish identity, turquoise and deep cobalt body palette, translucent fins, eye placement, camera distance, and scale identical in every cell. Center the whole fish in each invisible cell and keep the full silhouette in the central 68% safe area. Use a 100% solid flat `#FF00FF` background with no gradient. No text, labels, UI, borders, frames, bubbles, gravel, plants, or detached effects. Nothing may touch or cross a cell edge; leave clear magenta margin on all sides.

## 2. neon-tetra-idle-2x2

- Asset type: `creature`
- Action: `idle`
- View: `side`
- Sheet: `2x2`, 4 frames
- Bundle: `single_asset`
- Art style: `clean_hd`
- Anchor: `center`

Prompt:

> A small neon tetra fish for a calm freshwater virtual aquarium website, clean hand-painted HD 2D game asset style, side view. Four matching idle phases in an exact 2x2 sheet: neutral, tiny fin flutter, slight body pulse, and return to neutral. Preserve the same cyan stripe, red tail accent, eye, silhouette, camera distance, and scale across all cells. Keep the full fish inside the central 64% safe area of each invisible cell. 100% solid flat `#FF00FF` background, no gradient. No text, labels, UI, tank, plants, gravel, bubbles, borders, frames, or detached effects. No body part may touch or cross a cell edge.

## 3. java-fern-single

- Asset type: `prop`
- Action: `single`
- View: `3/4`
- Sheet: one asset
- Bundle: `single_asset`
- Art style: `clean_hd`
- Anchor: `bottom`

Prompt:

> A single Java fern aquarium plant prop for BuildYourTank, clean hand-painted HD 2D game asset style, upright front-facing aquarium object with a small visible top face and a clear rooted base. Deep green leaves with varied but coherent leaf shapes, readable silhouette, subtle painted texture, and controlled soft lighting. Center the plant with a generous transparent-ready margin. Use a 100% solid flat `#FF00FF` background. No pot, fish, gravel, tank glass, text, labels, UI, border, frame, or extra props. Do not make pixel art and do not use a diagonal isometric rotation.

## 4. driftwood-single

- Asset type: `prop`
- Action: `single`
- View: `3/4`
- Sheet: one asset
- Bundle: `single_asset`
- Art style: `clean_hd`
- Anchor: `bottom`

Prompt:

> A single natural driftwood aquarium decoration prop for BuildYourTank, clean hand-painted HD 2D game asset style, centered and readable from a slightly elevated 3/4 aquarium-object view. Warm brown branching wood, compact irregular silhouette, smooth painted grain, stable grounded base, and no leaves or moss. Use a 100% solid flat `#FF00FF` background. No fish, gravel, tank glass, text, labels, UI, border, frame, or extra props. Do not make pixel art and do not use a wide landscape composition.

## 5. bubble-loop-1x4

- Asset type: `fx`
- Action: `idle`
- View: `side`
- Sheet: `strip_1x4`, 4 frames
- Bundle: `single_asset`
- Art style: `clean_hd`
- Anchor: `center`

Prompt:

> A compact loopable aquarium bubble effect for a virtual aquarium website, clean hand-painted HD 2D game FX. Exact 1x4 strip with four frames of the same small bubble cluster: small, rising, slightly expanding, and returning to the initial shape. Keep the effect centered in each cell with consistent scale and plenty of margin. Use a 100% solid flat `#FF00FF` background for chroma-key cleanup. No tank, fish, plants, gravel, text, labels, UI, border, frame, or smoke. Bubbles must remain fully inside each cell and stay tightly grouped.

## 6. freshwater-tank-scene

- Asset type: `map background`
- Mode: `layered_map_mode`, foundation-only base
- Art style: `clean_hd`
- Canvas: 1536x1024

Prompt:

> A serene freshwater aquarium interior scene for the BuildYourTank website hero area, clean hand-painted HD 2D environment art, wide 3:2 composition. Show clear blue-green water, soft light rays, a quiet open central swimming area, subtle distant aquatic plants, and a clean lower substrate band. Reserve calm negative space in the upper-left for website copy. This is a scenery-only foundation image: no fish, no bubbles, no driftwood, no foreground decorations, no UI, no text, no labels, no borders, and no annotation graphics. Keep the camera, horizon, lighting direction, and dimensions stable for later placement of separate runtime props.
