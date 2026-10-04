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

## Naming

Use lowercase kebab-case names. Keep raw generated sheets, processed transparent sheets, extracted frames, and QC metadata in separate subfolders when generation is enabled.
