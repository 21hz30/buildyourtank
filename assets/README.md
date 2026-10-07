# BuildYourTank asset workspace

This folder contains generated visual assets for the BuildYourTank virtual aquarium website.

## First asset pass

The first pass is intentionally small and reusable:

- `betta-idle-2x2`: hero fish idle animation
- `neon-tetra-idle-2x2`: small schooling fish idle animation
- `java-fern-single`: aquarium plant prop
- `driftwood-single`: aquarium decor prop
- `bubble-loop-1x4`: transparent bubble FX
- `freshwater-tank-scene`: website hero/background scene

The sprite sheets follow the installed `generate2dsprite` contract: raw art uses a solid `#FF00FF` background, each cell has safe padding, and the postprocessor is responsible for chroma-key cleanup, frame extraction, alignment, and QC.

## Generation status

The sprite/map skills are installed under `~/.codex/skills/`.

A first reference-based static cutout is available at `processed/zebra-angelfish-single/clean.png`. It is extracted from the supplied reference image and is suitable for an initial website fish selector or aquarium placement. It is not an animated idle sheet; new fin and tail poses still require the built-in image generator.

A first aquarium-category icon approximation is available at `processed/zebra-angelfish-icon/aquarium-icon.png`. It uses the screenshot's compact centered composition, navy outline, saturated palette, and reduced detail. Treat it as a visual direction mockup until a generated redraw is available.

## Aquarium hardscapes

The five transparent SVG hardscapes use individually drawn wood and stone
silhouettes, with clipped grain, knots, growth rings, fractures, strata and pores.
Their editable source is `tools/build_hardscapes.mjs`; regenerate the artwork with
`node assets/tools/build_hardscapes.mjs` from the project root. The script writes
`public/art/driftwood.svg` and the four illustrations in `public/art/scapes/`.
Moss attachment coordinates in `src/lib/mossAttachments.js` follow these shapes.
Each preset now contains three times its former number of pieces: 30, 39, 33,
48 and 60 respectively. Surface-height rocks and forked wood form the background;
small stones and broken roots fill the foreground. The generator also writes
`src/lib/generatedHardscapeSurfaces.js`, shared by moss and fish resting routes.

## Aquarium models and photo references

Plants use the cultivar models in `plantModels.js`, with leaf veins, modeled
variegation, and species-specific foliage and pigments. Foreground planting
portions render at 90% of their previous size; other layers retain their scale.
Fish use the species-specific models in `fishModels.js`,
with independently animated tails, dorsal, anal and pectoral fins, and gill covers.
Photographs remain reference material and catalog previews. Tank animals, rooted
plants, floating plants, and attached moss use modeled artwork.

The 100 formerly remote fish photographs are cached in `public/art/fish-photos`.
Restore missing originals with `python scripts/cache-fish-photos.py`.
`assets/fish-photo-sources.json` records original URLs, credits and available
licenses; the catalog retains the existing photo credits and source links.
The existing 269 plant reference photos are reused from `public/art/plants`.
The photo compositing utilities are retained for reference work; they are not
used to render aquarium inhabitants.

OpenCV.js 4.12.0-release.1 is vendored byte-for-byte from the pinned
`@techstark/opencv-js` npm package. Its included Apache 2.0 license is preserved at
`public/vendor/OPENCV-LICENSE.txt`. It loads only when a photograph needs graph-cut
extraction in the retained photo utilities; the tank's modeled fish do not load it.
All computation stays local; no image is sent to a service.
Visual checks are available during development at
`/scripts/photo-model-preview.html` and `?type=plants`; these pages are not included
as entry points in the production build.

## Naming

Use lowercase kebab-case names. Keep raw generated sheets, processed transparent sheets, extracted frames, and QC metadata in separate subfolders when generation is enabled.
