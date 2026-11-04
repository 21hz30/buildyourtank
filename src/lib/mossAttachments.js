// Coordinates follow the hardscape SVGs, so moss stays on their surfaces at
// every tank size. Each slot is [center x, center y, spread, surface angle].
import { expandedHardscapeSurfaces } from './generatedHardscapeSurfaces.js'

const surfaces = {
  classic: [[189, 158, 45, -45], [271, 206, 52, 2], [132, 195, 48, -20], [228, 100, 29, -69], [311, 160, 29, -80], [150, 181, 37, 12], [335, 216, 45, 8], [117, 155, 29, 74]],
  'stone-ridge': [[265, 307, 79, -57], [674, 200, 82, -69], [419, 385, 66, -48], [904, 331, 69, -65], [83, 366, 57, -49], [614, 326, 80, -59], [290, 393, 60, -76], [756, 290, 62, -84]],
  'fallen-timber': [[463, 363, 117, 8], [699, 402, 122, 13], [455, 236, 100, -23], [279, 209, 71, 56], [219, 363, 85, -42], [595, 326, 63, -69], [819, 443, 93, 9], [190, 125, 66, 29]],
  'woodland-pillars': [[180, 298, 75, 79], [414, 337, 81, 81], [724, 337, 80, 77], [889, 380, 62, 79], [299, 277, 72, -3], [598, 246, 70, -24], [324, 444, 59, 24], [613, 439, 64, -11]],
  'branching-banks': [[261, 303, 88, -34], [759, 253, 84, 20], [95, 290, 72, 75], [938, 221, 73, 82], [189, 395, 79, 8], [826, 423, 79, -22], [165, 291, 69, -59], [851, 205, 65, 64]],
}

export const isAttachedMoss = plant => plant.plantType === 'Mosses & liverworts'
export const MOSS_PATCHES_PER_PORTION = 3

export function mossAttachment(scape, index) {
  const id = surfaces[scape.id] ? scape.id : 'classic'
  const slots = [...surfaces[id], ...expandedHardscapeSurfaces[id].map(site => [site.x, site.y, site.width, site.angle])]
  const [x, y, width, angle] = slots[index % slots.length]
  // Spread across the existing surfaces first, then extend coverage along and
  // beside them. Never place later portions directly over the first eight.
  const pass = Math.floor(index / slots.length)
  const column = pass % 5
  const row = Math.floor(pass / 5)
  const along = Math.ceil(column / 2) * (column % 2 ? -1 : 1) * width * .28
  const across = Math.ceil(row / 2) * (row % 2 ? -1 : 1) * width * .075
  const radians = angle * Math.PI / 180
  return {
    x: x + Math.cos(radians) * along - Math.sin(radians) * across,
    y: y + Math.sin(radians) * along + Math.cos(radians) * across,
    width, angle, height: width * .2,
  }
}

export const hardscapeViewBox = scape => scape.id === 'classic' ? '0 0 450 250' : '0 0 1000 500'
