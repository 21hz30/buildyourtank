import { plantPlacement } from './plantScale.js'
import { fishHabitatSites } from './fishHabits.js'
import { expandedHardscapeSurfaces } from './generatedHardscapeSurfaces.js'

const clamp = (value, low, high) => Math.max(low, Math.min(value, high))
const fraction = index => {
  let value = 0, place = .5
  for (let i = index + 1; i; i = Math.floor(i / 2)) { value += (i % 2) * place; place /= 2 }
  return value
}
const variation = identity => {
  let seed = [...identity].reduce((seed, char) => (Math.imul(seed, 31) + char.charCodeAt(0)) >>> 0, 23)
  seed = Math.imul(seed ^ seed >>> 16, 2246822507)
  seed = Math.imul(seed ^ seed >>> 13, 3266489909)
  return ((seed ^ seed >>> 16) >>> 0) / 4294967296
}

export function plantLayer(plant) {
  if (plant.plantType === 'Mosses & liverworts') return 'moss'
  if (plant.plantType === 'Floating plants') return 'surface'
  if (plant.plantType === 'Rhizome & epiphytes') return 'hardscape'
  if (plant.plantType === 'Carpeting plants' || plant.plantType === 'Algae balls') return 'foreground'
  // Visual height takes precedence over catalogue position: tall swords and
  // grasses must not cover the carpet, and stems always form the rear bank.
  if (plant.plantType === 'Stem plants' || plant.heightCm >= 25) return 'background'
  return plant.heightCm > 12 ? 'midground' : 'foreground'
}

// Start with four evenly spaced planting sites, then fill the widest gaps.
// New rows and finer passes extend density instead of reusing eight slots.
function columnOrder(columns) {
  const order = [...new Set([.125, .375, .625, .875].map(x => Math.round(x * (columns - 1))))]
  while (order.length < columns) {
    let best = -1, distance = -1
    for (let column = 0; column < columns; column++) {
      if (order.includes(column)) continue
      const gap = Math.min(...order.map(old => Math.abs(column - old)))
      if (gap > distance) { best = column; distance = gap }
    }
    order.push(best)
  }
  return order
}

function attachedPlacement(sites, scape, size, index, key) {
  const site = sites[index % sites.length]
  if (!site) return { x: 50, y: 83, angle: 0, flip: 1 }
  const [nativeWidth, nativeHeight] = scape.id === 'classic' ? [450, 250] : [1000, 500]
  const surface = (expandedHardscapeSurfaces[scape.id] || []).find(point =>
    Math.abs(point.x / nativeWidth * 100 - site.x) < .001 && Math.abs(point.y / nativeHeight * 92 - site.y) < .001)
  const span = surface?.width || nativeWidth * .055
  const radians = site.angle * Math.PI / 180
  // Shift along the actual surface, rather than scattering rhizomes in water.
  // Finer passes fill between earlier roots without moving existing plants.
  const pass = Math.floor(index / sites.length)
  const along = (fraction(pass) - .5 + (variation(`${key}-root`) - .5) * .2) * span * .3 * size.lengthCm / nativeWidth
  const x = site.x + Math.cos(radians) * along / size.lengthCm * 100
  const y = site.y + Math.sin(radians) * along / size.heightCm * 100
  const slope = ((site.angle + 270) % 180) - 90
  // Leaves grow upward but fan away from sloped wood and rock faces.
  const angle = clamp(slope * .6 + (variation(`${key}-angle`) - .5) * 18, -55, 55)
  return { x, y, angle, flip: variation(`${key}-side`) < .5 ? -1 : 1, anchor: site }
}

// Bounds relative to the rhizome, accounting for physical tank proportions.
export function attachedFoliageBounds(width, height, size, angle, rootFraction = 1) {
  const radians = angle * Math.PI / 180, cos = Math.cos(radians), sin = Math.sin(radians)
  const w = width * size.lengthCm / 100, h = height * size.heightCm / 100
  const points = [-w / 2, w / 2].flatMap(x => [-h * rootFraction, h * (1 - rootFraction)].map(y => ({
    x: (x * cos - y * sin) / size.lengthCm * 100,
    y: (x * sin + y * cos) / size.heightCm * 100,
  })))
  return { left: Math.min(...points.map(p => p.x)), right: Math.max(...points.map(p => p.x)), top: Math.min(...points.map(p => p.y)), bottom: Math.max(...points.map(p => p.y)) }
}

export function plantingLayout(plants, size, scape) {
  const columns = Math.max(8, Math.ceil(size.lengthCm / 5.5))
  const order = columnOrder(columns), counters = {}, result = []
  const attachmentSites = fishHabitatSites(scape, size, ['wood', 'stone'])
  for (const plant of plants) {
    const layer = plantLayer(plant)
    if (layer === 'moss') continue
    const low = plant.heightCm <= 12 && plant.plantType !== 'Algae balls'
    // A purchased pot is divided into plugs/stems, not extra inventory plants.
    const parts = layer === 'foreground' && low ? 4
      : ['Stem plants', 'Grass-like plants'].includes(plant.plantType) && layer !== 'surface' ? 2 : 1
    for (let part = 0; part < parts; part++) {
      const index = counters[layer] || 0
      counters[layer] = index + 1
      const key = `${plant.key}-${part}`, noise = variation(key)
      let x, y, depth, attachment, heightScale = 1
      if (layer === 'foreground') {
        const pass = Math.floor(index / (columns * 4))
        x = clamp(2 + order[index % columns] / (columns - 1) * 96 + (pass ? (fraction(pass) - .5) * 48 / columns : 0), 2, 98)
        y = [94.5, 90.5, 89.5, 96.3][Math.floor(index / columns) % 4] + (noise - .5) * .5 + (fraction(pass) - .5) * .25
        depth = 8
        heightScale = (low ? .68 + noise * .12 : .94) * .9
      } else if (layer === 'hardscape') {
        const margin = Math.min(25, plant.heightCm / size.lengthCm * 85)
        const safe = attachmentSites.filter(site => site.x >= margin && site.x <= 100 - margin && site.y >= Math.min(78, plant.heightCm / size.heightCm * 100 + 5) && site.y <= 84)
        const sites = safe.length ? safe : attachmentSites
        attachment = attachedPlacement(sites, scape, size, index, key)
        x = attachment.x; y = attachment.y
        depth = 6
      } else if (layer === 'surface') {
        x = 4 + fraction(index) * 92; y = 1; depth = 8
      } else {
        // Planted banks leave an open central swimming corridor like the
        // reference. Tall species sit behind the scape, shorter groups in front.
        const bank = index % 2, along = fraction(Math.floor(index / 2))
        x = bank ? 64 + along * 31 : 5 + along * 31
        // Disjoint root bands keep every rear/middle plant behind the carpet.
        // Taller members of a bank root farther back, independent of inventory
        // order; tiny variation cannot reverse the catalogue height ordering.
        y = layer === 'background'
          ? 85.3 + (1 - clamp(plant.heightCm / 60, 0, 1)) * 1.8 + noise * .01
          : 88.1 + (1 - clamp(plant.heightCm / 25, 0, 1)) * .65 + noise * .01
        depth = layer === 'background' ? 2 : 5
        heightScale = .9 + noise * .1
      }
      const spread = layer === 'foreground' && plant.plantType === 'Carpeting plants' ? 1.9 + noise * .4 : 1
      result.push({ plant, key, layer, x, y, depth, heightScale, spread, flip: part % 2 ? -1 : 1, angle: 0, ...attachment, index })
    }
  }
  // Farther rows paint first; closer leaves cover roots and gaps naturally.
  return result.sort((a, b) => a.depth - b.depth
    || (['background', 'midground', 'foreground'].includes(a.layer) && a.layer === b.layer ? b.plant.heightCm - a.plant.heightCm : 0)
    || a.y - b.y || a.index - b.index)
}

export function plantingStyle(plant, size, placement) {
  const scaled = { ...plant, heightCm: plant.heightCm * placement.heightScale }
  const style = plantPlacement(scaled, size, [placement.x, 0])
  if (placement.layer === 'surface') return { ...style, zIndex: placement.depth }
  const spread = placement.spread || 1
  let width = Math.min(98, parseFloat(style.width) * spread)
  if (placement.layer === 'hardscape') width = Math.min(width, Math.max(1, 2 * Math.min(placement.x, 100 - placement.x) - .1))
  let boxHeight = width / spread * size.lengthCm / size.heightCm / (plant.photoAspectRatio || 1)
  if (boxHeight > placement.y - 2) { width *= (placement.y - 2) / boxHeight; boxHeight = placement.y - 2 }
  if (placement.layer === 'hardscape') {
    const bounds = attachedFoliageBounds(width, boxHeight, size, placement.angle || 0, plant.photoAspectRatio ? 1 : 226 / 240)
    const fit = Math.min(1, (placement.x - 1) / -bounds.left, (99 - placement.x) / bounds.right,
      (placement.y - 2) / -bounds.top, bounds.bottom > 0 ? (98 - placement.y) / bounds.bottom : 1)
    width *= fit; boxHeight *= fit
  }
  // Segmented photographs have tight bounds. SVG fallback foliage roots sit
  // at y=226 in a 240px viewBox; compensate for its transparent bottom margin.
  const inset = plant.photoAspectRatio ? 0 : boxHeight * 14 / 240
  return { ...style, width: `${width}%`, height: `${boxHeight}%`, left: `${clamp(placement.x, width / 2, 100 - width / 2)}%`, bottom: `${100 - placement.y - inset}%`, zIndex: placement.depth }
}
