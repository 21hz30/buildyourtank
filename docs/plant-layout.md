# Aquatic planting layout

Plant placement follows the supplied aquascape reference: a low carpet over the
soil, fuller planted banks and taller foliage behind the hardscape. The selected
hardscape and substrate stay with the tank.

- Foreground pots of small plants divide into four plugs. Sites spread evenly
  across a physically scaled row before filling additional rows across the soil
  surface. Larger quantities add distinct sites and finer passes, rather than
  cycling through the former eight shared positions.
- Carpeting plugs form low, overlapping mats with small variations in height,
  width and orientation. The planting base meets the soil; the glass-facing
  substrate edge remains visible beneath it.
- Stem plants and rooted plants at least 25 cm tall form the rear banks, behind
  the hardscape. Other rooted plants over 12 cm sit in the middle, with smaller
  plants and carpets in front. These visual height rules override catalog
  position labels. The banks retain an open central swimming corridor.
- Rear, middle and foreground roots occupy separate depth bands. Taller plants
  root farther back within each bank and paint before shorter foliage, so adding
  a species cannot make its tall leaves cover the shorter plants in front.
  Stem/grass pots can divide into two bunches. Rosettes and algae balls stay whole.
- Rhizomes attach to wood or stone without being buried. Moss retains its thin,
  masked hardscape attachment. Floaters stay at the surface.
- Attached foliage fans away from the local surface slope, with stable variations
  in angle and facing. Additional plants fill distinct positions along surfaces.
  Rotation pivots around the rhizome, including the illustrated fallback, so the
  base stays attached. Rotated foliage fits within the tank at every size.
- Plant height and spacing respond to tank dimensions and photo aspect ratio.
  SVG fallback artwork compensates for its transparent margin to keep its roots
  at the same planting base as a tightly cropped photograph.

The inventory count still represents purchased pots/portions. Visual divisions
do not add inventory or change prices. Planting geometry and trimmed carpet
height are visual approximations, not a simulation of growth over time.

Broad straight edges in an isolated photograph indicate surrounding aquarium
foliage. Those images use the existing species illustration in the tank instead
of displaying rectangular photo backgrounds. Original catalog photographs and
their credits are preserved.

Implementation: `plantLayout.js`, `PhotoPlant.jsx` and `TankScene.jsx`.
`plantLayout.test.js` covers increasing coverage sites, planting depth, physical
bounds, surface attachment, photo quality and fallback root alignment.
