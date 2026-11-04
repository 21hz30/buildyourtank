// Non-destructive photo compositing. Contours are normalized to original photos;
// source photographs and their existing credit/license metadata stay untouched.
import { fishPhotoBounds } from './fishPhotoBounds.js'
export const fishPhotoContours = {
  tetra: { facing: -1, points: [[.065,.48],[.105,.39],[.24,.23],[.43,.14],[.57,.12],[.69,.17],[.78,.31],[.81,.32],[.87,.19],[.90,.20],[.89,.32],[.96,.53],[.94,.61],[.89,.60],[.86,.57],[.83,.59],[.86,.69],[.79,.71],[.72,.68],[.64,.64],[.57,.79],[.58,.86],[.52,.87],[.44,.83],[.36,.73],[.28,.68],[.20,.64],[.10,.55]] },
  betta: { facing: 1, white: true },
  angelfish: { source: '/art/angelfish.png', facing: 1, alpha: true },
  danio: { facing: -1, rotate: 24, points: [[.20,.74],[.24,.63],[.29,.51],[.39,.37],[.49,.29],[.48,.26],[.55,.23],[.61,.23],[.61,.27],[.73,.27],[.80,.26],[.87,.29],[.87,.32],[.85,.35],[.89,.48],[.86,.44],[.79,.37],[.72,.37],[.65,.43],[.72,.43],[.71,.49],[.64,.52],[.60,.48],[.54,.54],[.52,.63],[.50,.63],[.47,.57],[.40,.66],[.33,.72],[.24,.77]] },
  rasbora: { facing: 1, points: [[.86,.68],[.82,.64],[.77,.60],[.75,.58],[.75,.55],[.72,.58],[.66,.61],[.55,.66],[.51,.66],[.43,.64],[.47,.71],[.46,.74],[.52,.72],[.58,.74],[.57,.80],[.62,.77],[.67,.76],[.72,.76],[.79,.73],[.84,.70]] },
  cichlid: { facing: 1, rotate: 10, points: [[.72,.60],[.67,.53],[.55,.48],[.48,.44],[.44,.46],[.35,.53],[.28,.53],[.20,.51],[.14,.56],[.19,.57],[.20,.63],[.13,.65],[.075,.64],[.03,.65],[.01,.76],[.07,.89],[.13,.91],[.24,.85],[.26,.87],[.35,.85],[.49,.82],[.60,.76],[.68,.69]] },
  'cardinal-tetra': { facing: 1, points: [[.95,.40],[.90,.36],[.70,.28],[.55,.27],[.45,.29],[.24,.35],[.14,.36],[.16,.32],[.11,.34],[.10,.39],[.10,.44],[.16,.45],[.18,.42],[.28,.42],[.38,.50],[.60,.54],[.73,.53],[.84,.48],[.94,.45]] },
  'black-neon-tetra': { facing: -1, points: [[.08,.49],[.17,.38],[.31,.29],[.49,.28],[.59,.16],[.49,.32],[.75,.41],[.90,.30],[.86,.47],[.91,.54],[.76,.50],[.62,.63],[.62,.77],[.56,.65],[.39,.70],[.34,.85],[.29,.69],[.19,.61]] },
  'neon-tetra': { facing: -1, points: [[.13,.55],[.24,.47],[.48,.32],[.59,.30],[.60,.27],[.64,.29],[.77,.29],[.81,.16],[.80,.34],[.83,.44],[.76,.41],[.64,.51],[.66,.58],[.61,.61],[.45,.65],[.37,.71],[.33,.65],[.23,.66],[.16,.62]] },
  'rummy-nose-tetra': { facing: -1, points: [[.24,.30],[.31,.25],[.38,.28],[.44,.36],[.43,.30],[.47,.37],[.48,.44],[.60,.58],[.70,.56],[.66,.64],[.67,.73],[.61,.68],[.54,.67],[.51,.63],[.44,.62],[.34,.49],[.28,.39]] },
  'ember-tetra': { facing: 1, points: [[.58,.68],[.50,.59],[.42,.57],[.33,.56],[.26,.61],[.18,.58],[.17,.67],[.23,.66],[.27,.69],[.35,.74],[.37,.77],[.40,.73],[.48,.75],[.54,.72]] },
  'red-phantom-tetra': { facing: 1, points: [[.39,.66],[.33,.60],[.27,.58],[.21,.49],[.18,.47],[.20,.59],[.09,.61],[.06,.54],[.07,.63],[.08,.68],[.17,.75],[.21,.79],[.27,.83],[.29,.76],[.32,.72],[.37,.71]] },
  'rosy-tetra': { facing: -1, points: [[.03,.57],[.15,.44],[.31,.35],[.36,.24],[.46,.15],[.42,.34],[.48,.38],[.74,.47],[.83,.38],[.95,.34],[.88,.51],[.93,.65],[.84,.63],[.77,.60],[.64,.65],[.60,.70],[.47,.64],[.46,.77],[.38,.73],[.36,.62],[.19,.63]] },
  'serpae-tetra': { facing: 1, points: [[.94,.49],[.85,.41],[.72,.36],[.57,.28],[.37,.22],[.41,.38],[.32,.47],[.20,.42],[.13,.29],[.14,.51],[.10,.69],[.24,.59],[.35,.60],[.46,.71],[.68,.70],[.70,.65],[.80,.60],[.87,.55]] },
  'golden-tetra': { facing: -1, points: [[.17,.36],[.29,.30],[.34,.28],[.51,.31],[.62,.36],[.70,.32],[.70,.37],[.68,.39],[.70,.42],[.64,.43],[.60,.41],[.44,.46],[.42,.52],[.39,.46],[.27,.43],[.22,.40]] },
  'gold-neon-tetra': { facing: -1, points: [[.09,.59],[.19,.52],[.40,.43],[.52,.45],[.73,.39],[.68,.44],[.70,.52],[.57,.51],[.44,.61],[.42,.67],[.31,.70],[.24,.68],[.15,.65]] },
  'green-neon-tetra': { facing: 1, points: [[.63,.52],[.50,.50],[.41,.51],[.31,.53],[.28,.52],[.30,.55],[.29,.57],[.32,.56],[.42,.58],[.53,.57],[.60,.56]] },
  'diamond-head-neon-tetra': { facing: 1, points: [[.70,.48],[.61,.44],[.48,.43],[.47,.40],[.51,.44],[.31,.44],[.25,.40],[.26,.47],[.24,.50],[.32,.49],[.45,.49],[.47,.53],[.50,.50],[.61,.52],[.69,.51]] },
  'emperor-tetra': { facing: 1, points: [[.73,.53],[.69,.49],[.53,.47],[.46,.42],[.46,.47],[.37,.49],[.32,.50],[.25,.49],[.26,.53],[.22,.55],[.32,.55],[.39,.55],[.44,.59],[.59,.59],[.66,.56],[.71,.55]] },
  'blue-emperor-tetra': { facing: 1, points: [[.68,.43],[.61,.39],[.47,.40],[.44,.37],[.43,.41],[.37,.44],[.32,.44],[.33,.46],[.34,.48],[.39,.48],[.42,.50],[.53,.49],[.63,.46]] },
  'flame-tetra': { facing: 1, points: [[.86,.58],[.80,.49],[.73,.43],[.51,.34],[.52,.19],[.44,.12],[.45,.36],[.27,.37],[.16,.40],[.06,.22],[.09,.43],[.04,.51],[.18,.47],[.27,.47],[.34,.57],[.37,.69],[.48,.74],[.61,.72],[.62,.78],[.67,.72],[.77,.66],[.84,.65]] },
}

export function fishPhotoSpec(fish) {
  const bounds = fishPhotoBounds[fish.id]
  const spec = { source: fish.photo.startsWith('https:') ? `/art/fish-photos/${fish.id}.jpg` : fish.photo, facing: bounds?.[4] || 1, bounds: bounds?.slice(0, 4), ...fishPhotoContours[fish.id] }
  if (spec.points) {
    // The hand-measured guide chooses one fish in a group photograph. Graph
    // cuts find its real edges; the guide itself never clips the photograph.
    spec.bounds = [Math.max(.01, Math.min(...spec.points.map(p=>p[0]))-.035), Math.max(.01, Math.min(...spec.points.map(p=>p[1]))-.035), Math.min(.99, Math.max(...spec.points.map(p=>p[0]))+.035), Math.min(.99, Math.max(...spec.points.map(p=>p[1]))+.035)]
  }
  if (fish.id === 'green-neon-tetra') { spec.bounds = [.29,.40,.68,.57]; spec.facing = -1 }
  if (fish.id === 'ember-tetra') { spec.bounds = [.04,.48,.38,.96]; spec.rotate = -32 }
  if (fish.id === 'red-phantom-tetra') { spec.bounds = [.12,.50,.76,.92]; spec.facing = -1; spec.rotate = -10 }
  // These two photographs have fins almost indistinguishable from the scenery.
  // Their measured outline preserves the complete photographed animal.
  if (fish.id === 'rasbora' || fish.id === 'flame-tetra') spec.contour = true
  return spec
}

export function photoMotion(x, y, time, rig = {}) {
  const tailRoot = rig.tailRoot ?? .28, middle = rig.middle ?? .5
  const tail = Math.max(0, (tailRoot - x) / tailRoot) ** 1.5
  const fin = Math.max(0, Math.abs(y - middle) - .13) * Math.sin(Math.PI * Math.min(1, x / .8))
  const gill = Math.exp(-((x - .77) ** 2 / .002 + (y - middle) ** 2 / .025))
  return {
    x: x + Math.sin(time * 3.9) * gill * .007 + Math.sin(time * 9) * tail * .012,
    y: y + Math.sin(time * 9 + x * 4) * tail * .022 + Math.sin(time * 6.5 + x * 9) * fin * .025,
  }
}

// Nursery cups and labels are neutral; green, bronze and red foliage is retained.
export function plantAlpha(r, g, b, red = false) {
  const green = g - Math.max(r * .88, b * 1.08)
  const warm = red ? r - Math.max(g * 1.03, b * 1.06) : -100
  return Math.max(0, Math.min(1, (Math.max(green, warm) - 6) / 13))
}

// Aquarium/landscape photos retain broad, straight foliage edges after color
// isolation. They cannot serve as standalone planted clumps without carrying
// their surroundings into the tank; use the cultivar illustration instead.
export function plantPhotoHasBackdrop(data, width, height, bounds = [0, 0, width - 1, height - 1]) {
  const [left, top, right, bottom] = bounds
  if (right - left < 3 || bottom - top < 3) return false
  const horizontal = y => {
    let opaque = 0
    for (let x = left; x <= right; x++) if (data[(y * width + x) * 4 + 3] > 80) opaque++
    return opaque / (right - left + 1)
  }
  const vertical = x => {
    let opaque = 0
    for (let y = top; y <= bottom; y++) if (data[(y * width + x) * 4 + 3] > 80) opaque++
    return opaque / (bottom - top + 1)
  }
  return Math.max(horizontal(top + 1), horizontal(bottom - 1)) > .55 && Math.max(vertical(left + 1), vertical(right - 1)) > .55
}
