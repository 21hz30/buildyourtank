// Editable, individually drawn silhouettes with deterministic surface detail.
// Run with: node assets/tools/build_hardscapes.mjs
import { writeFileSync } from 'node:fs'

const random = seed => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 4294967296
}
const n = value => Number(value.toFixed(2))
const woodColors = [
  ['#b6a086', '#89735e', '#493f35'], // water-worn bogwood
  ['#9b7d61', '#66503e', '#342e2a'], // old bark
  ['#c3ab89', '#967b59', '#534734'], // exposed root
  ['#857b69', '#575245', '#2d322e'], // submerged heartwood
]
const rockColors = [
  ['#b1b8b0', '#7a8987', '#3d5157'],
  ['#899aa0', '#546972', '#283e49'],
  ['#c3b5a0', '#928d79', '#555e53'],
  ['#bcb5aa', '#858782', '#535e61'],
  ['#b6a58b', '#83745f', '#49493f'],
]
const expandedSurfaces = {}

// Each added piece gets a different silhouette, palette, grain, fractures and
// wear. Background forms are tall; foreground fragments stay low and small.
function populate(a, width, height, key, baseline) {
  const seed = [...key].reduce((value, letter) => value * 31 + letter.charCodeAt(0) >>> 0, 29)
  const rng = random(seed), count = baseline * 2
  const rearCount = Math.ceil(count * .45), middleCount = Math.floor(count * .25)
  const stoneBias = key === 'stone-ridge' ? .78 : key === 'branching-banks' ? .5 : .34
  const layers = { background: [], middle: [], foreground: [] }
  const surfaces = []
  for (let index = 0; index < count; index++) {
    const layer = index < rearCount ? 'background' : index < rearCount + middleCount ? 'middle' : 'foreground'
    const localIndex = layer === 'background' ? index : layer === 'middle' ? index - rearCount : index - rearCount - middleCount
    const layerCount = layer === 'background' ? rearCount : layer === 'middle' ? middleCount : count - rearCount - middleCount
    const stone = index === 0 || (index !== 1 && rng() < stoneBias)
    const x = width * (.05 + .9 * (localIndex + .2 + rng() * .6) / layerCount)
    const bottom = height * (layer === 'foreground' ? .965 + rng() * .03 : .88 + rng() * .08)
    const top = index < 2 ? 0 : height * (layer === 'background' ? .015 + rng() * .3 : layer === 'middle' ? .35 + rng() * .31 : .81 + rng() * .08)
    const span = width * (layer === 'foreground' ? .055 + rng() * .085 : stone ? .09 + rng() * .09 : .065 + rng() * .08)
    const left = Math.max(1, x - span / 2), right = Math.min(width - 1, x + span / 2)
    const tall = bottom - top, broad = right - left
    const id = `${layer === 'background' ? 'rear' : layer === 'foreground' ? 'foreground' : 'middle'}-${stone ? 'rock' : 'wood'}-${index}`
    const start = a.pieces.length
    if (stone) {
      // Unequal shoulders, split peaks, chipped corners and sloping faces.
      const summit = left + broad * (.25 + rng() * .5)
      const shoulderY = top + tall * (.12 + rng() * .24)
      const ridge = left + broad * (.36 + rng() * .25)
      const profiles = [
        `M${n(left)} ${n(bottom)}L${n(left + broad * .04)} ${n(top + tall * .64)} ${n(left + broad * .18)} ${n(shoulderY)} ${n(summit)} ${n(top)} ${n(summit + broad * .08)} ${n(top + tall * .035)} ${n(right - broad * .12)} ${n(top + tall * (.22 + rng() * .2))} ${n(right - broad * .07)} ${n(top + tall * .59)} ${n(right)} ${n(bottom - tall * .08)} ${n(right - broad * .16)} ${n(bottom)}Z`,
        `M${n(left)} ${n(bottom)}L${n(left + broad * .02)} ${n(top + tall * .5)} ${n(left + broad * .15)} ${n(top + tall * .48)} ${n(left + broad * .16)} ${n(top + tall * .13)} ${n(left + broad * .43)} ${n(top)} ${n(right - broad * .21)} ${n(top + tall * .03)} ${n(right - broad * .19)} ${n(top + tall * .33)} ${n(right - broad * .04)} ${n(top + tall * .4)} ${n(right)} ${n(bottom - tall * .05)}Z`,
        `M${n(left + broad * .08)} ${n(bottom)}Q${n(left - broad * .06)} ${n(top + tall * .7)} ${n(left + broad * .09)} ${n(top + tall * .3)}Q${n(left + broad * .24)} ${n(top)} ${n(left + broad * .51)} ${n(top)}L${n(right - broad * .15)} ${n(top + tall * .08)}Q${n(right + broad * .02)} ${n(top + tall * .32)} ${n(right - broad * .03)} ${n(top + tall * .66)}L${n(right)} ${n(bottom - tall * .06)} ${n(right - broad * .18)} ${n(bottom)}Z`,
        `M${n(left)} ${n(bottom)}L${n(left + broad * .1)} ${n(top + tall * .26)} ${n(left + broad * .28)} ${n(top + tall * .03)} ${n(left + broad * .41)} ${n(top)} ${n(left + broad * .49)} ${n(top + tall * .32)} ${n(left + broad * .62)} ${n(top + tall * .12)} ${n(right - broad * .18)} ${n(top + tall * .08)} ${n(right - broad * .04)} ${n(top + tall * .49)} ${n(right)} ${n(bottom - tall * .1)} ${n(right - broad * .14)} ${n(bottom)}Z`,
      ]
      const d = profiles[index < 2 ? 0 : index % profiles.length]
      const seam = `M${n(summit)} ${n(top + tall * .07)}L${n(ridge)} ${n(top + tall * .37)} ${n(ridge - broad * .14)} ${n(top + tall * .48)} ${n(ridge + broad * .06)} ${n(top + tall * .65)} ${n(ridge - broad * .1)} ${n(bottom - tall * .05)}`
      a.rock(id, d, [left, top, broad, tall], [
        `M${n(left)} ${n(bottom)}L${n(left + broad * .18)} ${n(shoulderY)} ${n(summit)} ${n(top)} ${n(ridge)} ${n(top + tall * .6)}Z`,
        `M${n(ridge)} ${n(top + tall * .6)}L${n(right - broad * .12)} ${n(top + tall * .3)} ${n(right)} ${n(bottom - tall * .08)} ${n(right - broad * .16)} ${n(bottom)}Z`,
      ], [seam, `M${n(ridge)} ${n(top + tall * .37)}l${n(broad * .22)} ${n(tall * .04)} ${n(broad * .09)} ${n(-tall * .08)}`], (index + Math.floor(rng() * 4)) % rockColors.length, seed + index * 101, index % 3 ? n(rng() * 22 - 11) : 0, [
        [n(left + broad * .32), n(top + tall * .74), n(broad * .035), n(tall * .025), n(rng() * 60 - 30)],
        [n(left + broad * .69), n(top + tall * .84), n(broad * .055), n(tall * .018), n(rng() * 60 - 30)],
      ])
      surfaces.push({ x: n(left + broad * .52), y: n(top + tall * .7), width: n(Math.min(broad * .6, tall * .35)), angle: n(-45 + rng() * 30), material: 'stone', layer, piece: id })
    } else if (layer === 'foreground') {
      const y = bottom - height * (.025 + rng() * .016)
      const thickness = height * (.018 + rng() * .013)
      const d = `M${n(left)} ${n(y + thickness)}Q${n(left + broad * .2)} ${n(y - thickness * .7)} ${n(left + broad * .46)} ${n(y)}L${n(left + broad * .58)} ${n(y - thickness * .65)} ${n(left + broad * .64)} ${n(y - thickness * .6)} ${n(left + broad * .62)} ${n(y + thickness * .08)}Q${n(right - broad * .18)} ${n(y - thickness * .16)} ${n(right)} ${n(y + thickness * .44)}L${n(right - broad * .015)} ${n(y + thickness * 1.2)}Q${n(left + broad * .67)} ${n(y + thickness * .48)} ${n(left + broad * .39)} ${n(y + thickness * .85)}L${n(left + broad * .12)} ${n(y + thickness * 1.35)}Z`
      a.wood(id, d, [left, y - thickness, broad, thickness * 2.5], [`M${n(left + broad * .04)} ${n(y + thickness * .6)}Q${n(left + broad * .27)} ${n(y - thickness * .1)} ${n(left + broad * .48)} ${n(y + thickness * .4)}T${n(right)} ${n(y + thickness * .75)}`], [[n(x), n(y + thickness * .4), n(broad * .055), n(thickness * .18), n(rng() * 20 - 10)]], index % woodColors.length, seed + index * 131, [[n(right - broad * .02), n(y + thickness * .8), n(thickness * .2), n(thickness * .35), n(rng() * 30 - 15)]])
      surfaces.push({ x: n(x), y: n(y + thickness * .4), width: n(broad * .5), angle: n(rng() * 12 - 6), material: 'wood', layer, piece: id })
    } else {
      const trunk = broad * (layer === 'foreground' ? .34 : .25)
      const lean = (rng() - .5) * broad * .7
      const tipX = x + lean, elbowY = top + tall * .55, elbowX = x - lean * .35
      const forkX = lean > 0 ? left : right
      const forkY = top + tall * (.16 + rng() * .28)
      const d = `M${n(x - trunk)} ${n(bottom)}Q${n(elbowX - trunk)} ${n(elbowY)} ${n(tipX - trunk * .3)} ${n(top + tall * .06)}L${n(tipX)} ${n(top)} ${n(tipX + trunk * .25)} ${n(top + tall * .07)}Q${n(tipX + trunk * .25)} ${n(top + tall * .31)} ${n(elbowX + trunk * .16)} ${n(elbowY)}L${n(forkX - trunk * .15)} ${n(forkY + tall * .035)} ${n(forkX)} ${n(forkY)} ${n(forkX + trunk * .17)} ${n(forkY + tall * .09)} ${n(elbowX + trunk)} ${n(elbowY + tall * .1)}Q${n(x + trunk * .45)} ${n(bottom - tall * .2)} ${n(x + trunk)} ${n(bottom)}Z`
      const grain = [`M${n(x - trunk * .45)} ${n(bottom)}Q${n(elbowX - trunk * .5)} ${n(elbowY)} ${n(tipX)} ${n(top + tall * .025)}`, `M${n(x + trunk * .3)} ${n(bottom)}Q${n(elbowX + trunk * .65)} ${n(elbowY + tall * .07)} ${n(forkX)} ${n(forkY + tall * .025)}`]
      a.wood(id, d, [left, top, broad, tall], grain, [[n(elbowX), n(elbowY + tall * .19), n(trunk * .22), n(Math.min(tall * .05, trunk * .65)), n(lean / broad * 40)]], (index + Math.floor(rng() * 3)) % woodColors.length, seed + index * 131, layer === 'foreground' || index % 3 === 0 ? [[n(tipX), n(top + tall * .06), n(trunk * .3), n(trunk * .12), n(lean / broad * 20)]] : [])
      surfaces.push({ x: n(x), y: n(bottom - tall * .08), width: n(trunk * 1.1), angle: n(-78 + lean / broad * 25), material: 'wood', layer, piece: id })
    }
    const generated = a.pieces.splice(start)
    // Slight water haze separates distant forms; front pieces retain contrast.
    layers[layer].push(`<g data-depth="${layer}"${layer === 'background' ? ' opacity=".78"' : ''}>${generated.join('')}</g>`)
  }
  expandedSurfaces[key] = surfaces
  return layers
}

function illustration(viewBox, title) {
  const defs = ['<filter id="wood-surface" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".18 .025" numOctaves="3" seed="17"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter><filter id="stone-surface" x="-2%" y="-2%" width="104%" height="104%"><feTurbulence type="fractalNoise" baseFrequency=".085" numOctaves="4" seed="32"/><feDiffuseLighting surfaceScale="2.8" diffuseConstant=".8" lighting-color="#e4e5dc"><feDistantLight azimuth="235" elevation="48"/></feDiffuseLighting><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="multiply"/></filter>'], pieces = []
  function material(id, d, colors, surface = 'wood') {
    defs.push(`<clipPath id="${id}-clip"><path d="${d}"/></clipPath><linearGradient id="${id}-color" x1=".1" y1="0" x2=".9" y2="1"><stop stop-color="${colors[0]}"/><stop offset=".38" stop-color="${colors[1]}"/><stop offset="1" stop-color="${colors[2]}"/></linearGradient>`)
    return `<path d="${d}" fill="url(#${id}-color)" stroke="${colors[2]}" stroke-width=".7" stroke-linejoin="round" filter="url(#${surface}-surface)"/>`
  }
  function wood(id, d, box, grain, knots = [], color = 0, seed = 1, cuts = []) {
    const rng = random(seed), colors = woodColors[color]
    let detail = ''
    // Grain follows each hand-drawn limb, rather than a tiled wood texture.
    grain.forEach((path, i) => {
      for (let j = -5; j <= 5; j++) detail += `<path d="${path}" transform="translate(${n(j * (box[2] < 150 ? 1.4 : 2.1))} ${n(j * 1.5)})" fill="none" stroke="${j % 2 ? colors[0] : colors[2]}" stroke-width="${j % 3 ? .75 : 1.5}" opacity="${j % 2 ? .35 : .45}"/>`
      detail += `<path d="${path}" fill="none" stroke="${colors[2]}" stroke-width="${1.4 + i % 3}" opacity=".6"/>`
    })
    for (let i = 0; i < 170; i++) {
      const x = box[0] + rng() * box[2], y = box[1] + rng() * box[3]
      detail += `<path d="M${n(x)} ${n(y)}q${n(rng() * 5 - 2)} ${n(2 + rng() * 6)} ${n(rng() * 4 - 2)} ${n(3 + rng() * 9)}" fill="none" stroke="${i % 3 ? colors[2] : colors[0]}" opacity="${n(.15 + rng() * .25)}" stroke-width="${n(.45 + rng() * .75)}"/>`
    }
    for (const [x, y, rx, ry, rotation] of knots) {
      detail += `<g transform="translate(${x} ${y}) rotate(${rotation})">`
      for (let i = 4; i > 0; i--) detail += `<ellipse rx="${n(rx * i / 3)}" ry="${n(ry * i / 3)}" fill="${i === 1 ? colors[2] : 'none'}" stroke="${i % 2 ? colors[2] : colors[0]}" stroke-width="${i === 1 ? 1.3 : .8}" opacity=".7"/>`
      detail += '</g>'
    }
    for (const [x, y, rx, ry, rotation] of cuts) {
      detail += `<g transform="translate(${x} ${y}) rotate(${rotation})"><ellipse rx="${rx}" ry="${ry}" fill="${colors[0]}" stroke="${colors[2]}" stroke-width="2"/>`
      for (let i = 1; i < 6; i++) detail += `<ellipse cx="${n(i * .4)}" rx="${n(rx * i / 6)}" ry="${n(ry * i / 6)}" fill="none" stroke="${colors[1]}" stroke-width=".8"/>`
      detail += `<path d="M0 0 ${rx} ${n(ry * .1)}M-2 -1 ${n(-rx * .45)} ${n(ry * .8)}" stroke="${colors[2]}" stroke-width="1"/></g>`
    }
    pieces.push(`<g data-piece="${id}">${material(id, d, colors)}<g clip-path="url(#${id}-clip)" stroke-linecap="round">${detail}</g></g>`)
  }
  function rock(id, d, box, facets = [], cracks = [], color = 0, seed = 1, strata = 0, pores = []) {
    const rng = random(seed), colors = rockColors[color]
    let detail = facets.map((path, i) => `<path d="${path}" fill="${i % 2 ? colors[2] : colors[0]}" opacity="${i % 2 ? .4 : .28}"/>`).join('')
    if (strata) for (let i = 0; i < 18; i++) {
      const y = box[1] + i * box[3] / 17
      detail += `<path d="M${box[0] - 20} ${n(y)}q${n(box[2] * .25)} ${n(strata + rng() * 9)} ${n(box[2] * .5)} ${n(strata * .4)}t${n(box[2] * .7)} ${n(-strata)}" fill="none" stroke="${i % 3 ? colors[2] : colors[0]}" stroke-width="${i % 4 ? .8 : 2.2}" opacity=".4"/>`
    }
    for (let i = 0; i < 210; i++) {
      const x = box[0] + rng() * box[2], y = box[1] + rng() * box[3]
      detail += `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(.4 + rng() * 1.7)}" ry="${n(.35 + rng() * 1.2)}" fill="${i % 3 ? colors[2] : '#e5dfcb'}" opacity="${n(.12 + rng() * .38)}"/>`
    }
    for (const path of cracks) detail += `<path d="${path}" fill="none" stroke="${colors[0]}" stroke-width="3.3" opacity=".55" transform="translate(-1 -1)"/><path d="${path}" fill="none" stroke="${colors[2]}" stroke-width="1.7" opacity=".9"/>`
    for (const [x, y, rx, ry, angle] of pores) detail += `<g transform="translate(${x} ${y}) rotate(${angle})"><ellipse rx="${rx + 1.5}" ry="${ry + 1}" fill="${colors[0]}" opacity=".5"/><ellipse rx="${rx}" ry="${ry}" fill="${colors[2]}" opacity=".75"/><path d="M${-rx} 0q${rx} ${-ry * 1.5} ${rx * 2} 0" fill="none" stroke="${colors[1]}" stroke-width="1.5"/></g>`
    pieces.push(`<g data-piece="${id}">${material(id, d, colors, 'stone')}<g clip-path="url(#${id}-clip)" stroke-linecap="round">${detail}</g></g>`)
  }
  const path = (d, fill, stroke = 'none', width = 1) => pieces.push(`<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`)
  return { wood, rock, path, pieces, save(file) {
    const [, , width, height] = viewBox.split(' ').map(Number)
    const key = file.endsWith('driftwood.svg') ? 'classic' : file.split('/').at(-1).replace('.svg', '')
    const baseline = pieces.filter(piece => piece.includes('data-piece=')).length
    const layers = populate({ wood, rock, pieces }, width, height, key, baseline)
    writeFileSync(new URL(`../..${file}`, import.meta.url), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" preserveAspectRatio="none" data-baseline-pieces="${baseline}" data-piece-count="${baseline * 3}"><title>${title}</title><defs>${defs.join('')}</defs>${layers.background.join('\n')}${layers.middle.join('\n')}${pieces.join('\n')}${layers.foreground.join('\n')}</svg>\n`)
  } }
}

// A twisted bogwood crown: hollow elbow, forked antlers and exposed roots.
{
  const a = illustration('0 0 450 250', 'Twisted bogwood with a hollow elbow and exposed roots')
  a.wood('rear-left-antler', 'M12 210Q33 174 43 128L39 82 29 40 34 26 48 62 55 94 64 70 69 46 76 58 69 112Q73 155 58 198L49 228Z', [10,25,72,205], ['M28 211Q60 151 49 96L35 32','M50 159Q68 113 71 54'], [[51,129,3,8,9]], 3, 121)
  a.wood('rear-right-antler', 'M366 226Q375 186 383 147 391 110 381 75L375 36 382 24 392 66 401 86 406 54 413 43 417 61 410 105Q418 149 409 189L425 231Z', [365,20,65,215], ['M382 218Q405 166 396 111L383 32','M399 164Q421 116 412 51'], [[401,129,4,9,-8]], 1, 129)
  a.wood('rear-fork', 'M146 190C162 163 187 152 204 125L219 82 223 58 229 64 230 87 243 42 248 47 238 91 226 127C214 151 198 174 180 196Z', [140,40,110,160], ['M155 188C182 155 211 146 226 98L241 49', 'M173 186Q214 150 223 92'], [[215,128,4,8,30]], 2, 17)
  a.wood('right-hook', 'M233 206C255 181 283 180 296 159 308 140 300 124 313 111L321 107 316 124C312 143 325 150 322 168 317 188 300 199 280 217Z', [230,105,100,115], ['M242 207Q292 191 307 167T315 116'], [[306,171,5,8,25]], 3, 39)
  a.wood('left-spur', 'M67 211C99 189 118 164 111 139L104 117 109 87 117 112 125 100 122 135C123 153 143 169 159 184L135 207Z', [60,85,105,125], ['M80 209Q128 177 118 142L111 98'], [[119,166,4,7,-22]], 1, 44)
  a.wood('hollow-crown', 'M40 216C61 207 67 193 93 190 116 187 124 177 139 170 155 164 163 168 176 174 191 178 202 168 213 155L225 162C223 182 236 188 254 189 272 186 283 199 298 196 319 191 331 198 343 203L365 210 383 228C354 225 344 229 325 226 306 222 291 226 274 222 259 217 244 217 229 223 211 231 197 220 177 216 156 213 143 223 126 226 102 229 96 219 75 222Z', [35,150,355,85], ['M45 215C106 209 124 191 149 186S185 206 215 186Q235 207 286 207T374 224', 'M73 216Q127 215 147 204T188 206Q215 225 241 208T336 215'], [[165,189,13,5,20],[265,204,9,4,-8]], 0, 67)
  a.path('M172 184C181 178 195 182 202 190 193 200 182 198 172 194Z', '#302e26', '#a89070', 1.4)
  a.path('M185 186q9 0 13 5', 'none', '#685941', .9)
  a.wood('front-root', 'M171 211C147 220 140 230 111 232L75 235 56 233 90 227C111 225 129 211 154 205Z', [50,200,130,38], ['M62 233Q127 230 165 209'], [], 2, 98)
  a.wood('curl-root', 'M264 215C292 217 304 230 328 232 347 235 367 231 385 235L395 240 366 241C331 243 299 233 273 226Z', [260,208,140,40], ['M270 219Q304 239 386 238'], [], 1, 116)
  a.wood('left-front-rootlet', 'M12 238Q42 226 68 226L106 231 118 240Q75 235 52 241Z', [10,220,110,25], ['M17 237Q74 225 108 237'], [], 2, 138)
  a.wood('right-front-rootlet', 'M345 238Q375 222 407 224L448 234 446 242Q400 230 376 243Z', [340,220,110,27], ['M352 238Q400 223 445 237'], [], 0, 144)
  a.path('M117 220q-10 12-29 15m105-13q3 11 18 16m88-17q14 9 13 18', 'none', '#665943', 2)
  a.save('/public/art/driftwood.svg')
}

// Individual stones: chipped shelf, leaning fin, split monolith, folded slab,
// quartz-capped outcrop, broken pedestal and a pitted shoulder stone.
{
  const a = illustration('0 0 1000 500', 'Asymmetric stone ridge with unique fractured and stratified rocks')
  a.rock('rear-left-spire', 'M12 461 28 267 53 201 81 127 105 53 130 96 154 142 163 236 182 322 171 463Z', [10,50,175,415], ['M28 267 105 53 117 161 90 311 42 451Z','M117 161 154 142 163 236 182 322 171 463 98 463Z'], ['M73 192 101 213 114 181','M112 283 142 305 150 352'], 1, 21, -12)
  a.rock('rear-center-peak', 'M332 467 348 292 380 202 414 126 449 85 480 149 505 244 535 340 554 466Z', [330,80,225,390], ['M348 292 449 85 459 227 412 369 365 463Z','M459 227 505 244 535 340 554 466 428 469Z'], ['M391 233 423 260 448 249','M455 323 486 347 493 409'], 0, 27, 8)
  a.rock('left-shelf', 'M7 458 18 380 41 362 39 318 85 291 122 305 146 348 129 377 159 414 181 463Z', [5,290,180,180], ['M41 362 86 323 122 305 108 371 71 421 18 448Z','M108 371 146 348 129 377 159 414 133 460 83 463Z'], ['M37 430 61 394 88 393 109 369','M57 339 85 344 94 330'], 0, 51, 9)
  a.rock('leaning-fin', 'M149 462 177 391 192 323 230 297 246 260 293 213 310 227 306 274 334 298 313 355 328 402 294 464Z', [145,210,190,260], ['M177 391 230 297 293 213 275 284 257 359 209 460Z','M275 284 306 274 334 298 313 355 294 464 250 463Z'], ['M228 424 249 380 242 356 271 306 283 268','M196 383 224 369 242 356'], 1, 87, -17)
  a.rock('folded-slab', 'M321 468 328 406 362 393 379 336 420 301 452 312 479 347 466 368 508 408 522 462 469 474Z', [320,300,205,180], ['M362 393 420 301 433 345 397 415 344 459Z','M433 345 479 347 466 368 508 408 469 474 423 432Z'], ['M349 435 384 430 416 403 444 405 477 427','M423 324 418 358 434 376'], 3, 102, 22)
  a.rock('split-monolith', 'M520 459 556 367 574 282 609 238 606 181 642 151 659 99 705 60 743 69 762 119 755 160 777 193 786 261 815 309 805 370 832 464 746 473 679 463Z', [515,55,320,420], ['M556 367 609 238 642 151 659 99 705 60 708 128 679 207 669 299 618 439Z','M708 128 743 69 762 119 755 160 777 193 747 246 751 346 711 463 679 463 700 310Z','M751 346 786 261 815 309 805 370 832 464 746 473Z'], ['M722 87 716 137 733 159 711 199 719 239 689 271 697 316 675 375 689 421','M719 239 757 244 780 221','M697 316 742 332 751 346'], 1, 137, -8)
  a.rock('quartz-shoulder', 'M801 467 812 413 839 378 858 296 889 273 912 239 948 254 961 287 951 315 981 343 996 408 986 468Z', [800,235,200,240], ['M839 378 858 296 912 239 932 276 902 311 889 383 846 451Z','M902 311 951 315 981 343 961 387 962 466 888 463Z'], ['M832 421 880 401 906 350 941 338','M918 258 931 291 916 325'], 0, 143, 13)
  a.path('M871 306 889 294 906 280 929 274 932 280 911 288 894 303 878 313Z', '#d4d0b9')
  a.rock('broken-pedestal', 'M77 468 93 427 117 415 144 430 176 429 193 449 188 476 129 478Z', [75,410,120,70], ['M93 427 117 415 144 430 126 443 88 457Z'], ['M140 438 145 455 167 465'], 2, 174, 5)
  a.rock('pocket-stone', 'M461 471Q448 441 470 426L503 421 529 441 555 449 563 475Z', [445,420,120,58], ['M465 447 500 429 529 441 509 467Z'], ['M474 454 493 459 502 445'], 4, 198, 0, [[482,444,5,3,10],[520,456,8,4,-12],[538,468,3,3,0]])
  a.rock('shale-chip', 'M304 475 327 450 348 443 367 460 359 480Z', [300,440,70,42], ['M327 450 348 443 337 466 310 475Z'], ['M335 452 347 462'], 1, 206, -5)
  a.rock('front-scree-left', 'M17 481 31 463 61 457 79 472 75 488Z', [15,453,68,37], ['M31 463 61 457 46 480Z'], ['M45 471 57 479'], 3, 211, 3)
  a.rock('front-scree-right', 'M629 481 647 451 675 444 702 460 711 485Z', [625,440,90,50], ['M647 451 675 444 665 475Z'], ['M667 468 692 473'], 1, 217, -5)
  a.rock('front-corner-chip', 'M916 485 934 459 955 452 981 474 978 489Z', [912,448,72,43], ['M934 459 955 452 946 480Z'], [], 0, 222, 4)
  a.save('/public/art/scapes/stone-ridge.svg')
}

// A hollow fallen trunk, with a broad cut end, peeling bark and slender limbs.
{
  const a = illustration('0 0 1000 500', 'Hollow fallen timber with peeling bark, broken limbs and growth rings')
  a.wood('rear-upright-stump', 'M780 444Q826 381 837 309L834 237Q828 173 842 115L855 63 868 35 878 41 865 105 869 163 886 125 906 102 910 111 884 185Q903 271 886 337L907 444Z', [775,32,140,420], ['M793 438Q864 347 853 239T870 45','M877 333Q900 221 900 113'], [[856,258,8,16,8]], 3, 183)
  a.wood('rear-middle-snag', 'M481 390Q497 327 501 248L498 185 510 114 519 85 527 91 521 179 533 210 552 180 565 172 561 191Q538 233 538 277L546 395Z', [480,80,90,320], ['M495 383Q525 266 510 179L520 91'], [], 2, 193)
  a.wood('rear-limb', 'M288 340C328 287 380 243 448 222 504 205 539 201 567 174L609 159 582 187C548 219 490 232 456 252 416 276 388 310 350 359Z', [285,155,330,210], ['M304 333Q387 250 453 236T596 168'], [[437,245,9,5,-33]], 2, 215)
  a.wood('upper-snapped-limb', 'M299 318C303 266 276 206 245 173 214 138 154 113 136 74L125 46 140 50 152 70 154 52 169 88C187 111 235 119 268 147 309 182 342 229 363 297Z', [120,40,250,285], ['M134 51Q157 113 229 146T334 301','M169 90Q254 156 290 218T315 300'], [[264,177,8,14,-36]], 1, 229)
  a.wood('far-right-branch', 'M673 385C702 359 755 326 808 333L857 346 887 342 871 357 846 361 798 352C754 352 731 390 709 414Z', [670,320,225,100], ['M684 392Q750 331 806 343L873 349'], [], 3, 256)
  a.wood('fallen-hollow-trunk', 'M51 461C102 415 143 407 177 376 203 351 203 322 233 298L253 286 268 296 287 278 312 292 335 286C386 295 407 321 455 327L628 346C703 351 765 372 833 388L918 411 952 445 932 468C883 481 853 464 811 465 747 467 717 446 658 446L487 429C416 425 374 396 327 385 283 375 249 396 217 424L177 466Z', [45,275,915,205], ['M59 453Q149 416 233 344T396 357C556 377 718 394 937 447','M81 466Q198 431 266 367T459 391L807 451','M324 310Q374 338 455 347T733 400L926 432'], [[416,374,20,8,11],[734,415,15,7,17]], 1, 277)
  a.wood('peeled-ribbon', 'M322 331C395 345 448 350 503 347 516 346 526 337 541 333L550 338 538 351C521 365 495 370 470 367L382 357Z', [320,328,235,45], ['M338 340Q436 364 489 357T544 337'], [], 2, 304)
  a.path('M872 417C895 414 935 434 939 450 936 465 915 466 895 459 872 451 857 433 872 417Z', '#b09673', '#493e31', 2.5)
  a.path('M881 426C897 423 926 438 929 449 919 459 900 450 888 440Z', '#2d302b', '#715c42', 3)
  a.path('M883 421C909 419 941 439 943 452M870 431Q897 464 930 463M891 422l10 8m30 14 10 3', 'none', '#dec7a0', 1.2)
  a.wood('splinter-spur', 'M549 374C563 341 585 323 590 294L588 274 596 260 604 283 619 264 612 294C607 332 597 357 577 381Z', [545,255,80,135], ['M559 372Q597 326 599 278'], [], 2, 311, [[601,289,9,4,-18]])
  a.wood('front-curled-root', 'M311 387C367 409 403 426 443 440 476 452 497 448 520 460L518 468 484 463C435 466 405 443 371 437L288 411Z', [285,380,240,95], ['M303 399Q388 433 436 448T513 462'], [[391,435,7,3,22]], 0, 326)
  a.wood('foreground-splinter-left', 'M12 477Q61 447 102 444L145 456 147 468Q86 456 42 489Z', [10,440,140,50], ['M18 478Q78 449 136 461'], [], 2, 331)
  a.wood('foreground-splinter-right', 'M749 481Q789 456 843 458L905 473 918 489Q824 465 776 493Z', [745,453,180,45], ['M755 480Q830 455 904 483'], [], 0, 337)
  a.save('/public/art/scapes/fallen-timber.svg')
}

// Four different tree forms, not repeated pillars: forked, hollow, bowed and
// split, standing among individually shaped river stones.
{
  const a = illustration('0 0 1000 500', 'Root woodland with four distinct ancient trunks and a natural bridge')
  a.wood('far-left-trunk', 'M6 465Q39 402 51 318L44 231 49 151 68 91 76 43 86 36 83 108 95 158 93 229 107 280 99 379 126 463Z', [5,32,125,438], ['M24 454Q86 345 65 233T80 42'], [[69,279,6,15,8]], 3, 342)
  a.wood('far-middle-trunk', 'M503 463Q529 387 527 309L514 237 522 153 542 74 549 35 558 42 553 119 571 180 565 246 587 327 607 460Z', [500,32,110,433], ['M518 451Q562 334 539 237T552 43'], [[544,257,7,13,0]], 0, 347)
  a.wood('left-forked-stump', 'M114 465C146 422 166 384 161 340L144 259C137 219 155 174 168 146L165 100 174 83 189 120 207 111 199 155C188 185 175 224 186 259L206 301C214 343 220 368 244 400L276 433 274 456 227 443 199 411 175 460Z', [105,80,175,390], ['M127 457Q192 391 180 323T165 232Q167 175 183 124','M244 446Q190 380 179 299'], [[168,237,9,15,8],[204,382,5,10,-30]], 0, 351)
  a.wood('left-fork-twig', 'M171 223C195 204 218 188 224 161L233 128 242 115 240 145 251 142 244 165C237 196 214 223 190 242Z', [165,110,95,140], ['M181 229Q231 198 239 128'], [], 2, 370)
  a.wood('bridge-root', 'M216 277C262 254 298 248 330 258 356 267 366 292 391 291 435 289 466 263 500 261 549 258 568 225 612 223L663 230 697 214 717 220 698 241 650 252C612 241 585 265 560 279 530 297 492 288 467 305 429 327 397 342 363 323L319 291C291 280 258 293 227 304Z', [210,210,515,140], ['M223 289Q294 258 329 279T397 313Q457 283 503 278T615 237L704 226'], [[368,304,12,5,30],[560,272,9,4,-25]], 3, 388)
  a.wood('hollow-center', 'M341 464C389 430 405 394 396 355L383 310C370 273 375 235 399 198L422 163 430 104 449 93 448 138 465 123 464 159C464 193 443 205 430 237 417 267 443 292 446 324L447 371C451 407 477 435 505 458L479 470 444 448 421 417 399 453Z', [335,90,175,385], ['M351 459Q431 401 416 345T404 260Q414 211 443 157L441 110','M488 459Q429 400 429 361T413 279'], [[410,350,10,18,-8]], 1, 412)
  a.path('M404 263C397 243 405 224 423 213 429 231 418 245 420 263L411 273Z', '#252c28', '#9d8667', 2)
  a.wood('bowed-trunk', 'M635 466C666 420 696 386 700 347 703 306 677 287 668 253 657 214 679 195 701 170 723 143 720 115 709 94L714 68 733 86 744 80 751 110C757 143 745 167 726 189 707 211 706 231 721 256 742 288 765 310 759 349 753 394 772 427 799 462L771 472 740 441 729 404 692 458Z', [630,65,180,410], ['M650 463Q731 394 724 338T689 245Q684 217 715 178T734 99','M785 465Q741 400 745 349T712 267'], [[696,236,10,13,-15],[745,365,7,15,10]], 2, 433)
  a.wood('bowed-hook', 'M716 283C747 267 768 242 765 213L756 184 765 164 778 190C794 235 769 265 743 300Z', [710,160,90,145], ['M730 285Q786 244 769 180'], [], 0, 449)
  a.wood('short-split-stump', 'M831 466C856 431 871 387 867 352L855 321 858 286 871 267 877 307 887 318 895 279 910 259 920 274 915 313C932 350 919 382 929 406L960 460 929 472 899 440 890 397 876 460Z', [825,255,145,220], ['M843 463Q901 396 884 346L868 291','M947 461Q902 404 907 355T908 280'], [[884,366,7,12,12]], 3, 471, [[877,308,8,4,18],[909,280,6,3,-30]])
  a.rock('rounded-river-boulder', 'M42 465C33 440 42 419 61 412 70 391 97 395 119 406 141 407 152 430 151 452L133 470Z', [30,390,130,85], ['M49 436Q57 407 89 407L119 418 104 431 73 433Z'], ['M79 439 89 455 110 461'], 3, 497, 0, [[54,446,3,2,0]])
  a.rock('ochre-crag', 'M273 470 279 428 305 402 327 391 347 414 365 422 381 461 356 475Z', [270,385,120,95], ['M279 428 327 391 335 428 304 456Z','M335 428 347 414 365 422 381 461 356 475Z'], ['M306 425 320 436 314 458'], 4, 518, 11)
  a.rock('flat-veined-stone', 'M556 470 551 443 578 408 611 392 649 398 673 430 668 461 642 476Z', [545,390,135,95], ['M565 440 611 392 629 414 613 438 578 459Z'], ['M572 453 607 438 631 445 658 433'], 0, 539, -6)
  a.rock('small-ripple-stone', 'M788 475Q781 451 803 441L829 444 846 460 839 478Z', [780,435,70,45], ['M791 452 809 445 829 450 807 458Z'], [], 2, 557, 5)
  a.rock('foreground-river-pebble-left', 'M182 486Q181 468 203 461L231 468 243 486Z', [180,458,66,32], ['M192 472 213 462 231 468 217 478Z'], [], 3, 562, 0)
  a.rock('foreground-river-pebble-center', 'M477 488Q483 464 510 461L538 474 546 489Z', [474,458,75,33], ['M487 472 510 461 537 476 512 483Z'], [], 0, 569, 0)
  a.wood('foreground-root-finger', 'M702 490Q737 465 778 466L810 476 807 486Q758 469 725 495Z', [700,463,112,35], ['M706 489Q751 461 803 482'], [], 2, 575)
  a.save('/public/art/scapes/woodland-pillars.svg')
}

// The banks deliberately contrast: pale root fan over porous ochre stone on
// the left; dark arching heartwood over blue layered shelves on the right.
{
  const a = illustration('0 0 1000 500', 'Contrasting root banks with porous stone and blue layered shelves')
  a.rock('left-rear-highland', 'M29 409 31 249 49 181 83 107 113 74 138 133 157 219 170 318 183 406Z', [25,70,160,340], ['M31 249 113 74 119 197 78 328 43 399Z','M119 197 157 219 170 318 183 406 102 405Z'], ['M66 233 98 249 119 227','M124 301 150 322'], 4, 579, 8)
  a.rock('right-rear-highland', 'M804 401 811 257 843 170 881 96 906 72 932 124 939 238 967 401Z', [800,70,170,340], ['M811 257 906 72 911 227 859 389Z','M911 227 939 238 967 401 881 403Z'], ['M848 210 881 235 907 212','M910 296 938 323'], 1, 581, -8)
  a.rock('left-porous-cliff', 'M1 468 5 404 25 385 24 349 44 306 71 294 102 309 116 347 148 350 174 388 189 462 164 477Z', [0,290,195,190], ['M12 411 44 306 71 294 80 352 58 395 62 465Z','M80 352 102 309 116 347 148 350 153 404 117 473Z'], ['M54 414 81 404 93 369 108 362'], 4, 582, 0, [[43,366,9,16,-17],[65,334,7,9,10],[100,399,12,7,-15],[137,381,6,13,-25],[39,440,7,5,4],[121,451,9,4,15]])
  a.rock('left-fluted-stone', 'M150 471 159 429 181 395 211 389 229 408 251 413 274 460 255 479Z', [145,385,135,95], ['M159 429 181 395 211 389 210 432 192 466Z'], ['M196 409 184 438 193 458','M223 426 216 452'], 2, 601, -8, [[242,450,5,4,0]])
  a.rock('left-low-splinter', 'M281 474 303 438 324 424 352 431 359 452 387 465 383 480Z', [280,420,110,65], ['M303 438 324 424 345 444 303 461Z'], ['M334 451 351 461'], 4, 622, 7)
  a.wood('left-root-fan', 'M58 410C81 365 75 332 65 293 58 264 69 239 76 220L74 173 63 147 66 118 73 106 87 145C102 173 95 197 96 221 96 251 111 270 117 295 124 323 112 349 127 369L175 397 230 417 252 435 226 437 174 420 128 404 100 394 84 423Z', [55,100,205,345], ['M74 115Q104 172 84 230T99 308Q89 369 123 389L240 433','M94 197Q80 267 109 295T111 371L182 411'], [[95,280,8,11,12],[122,386,7,4,27]], 2, 649)
  a.wood('left-curved-lance', 'M100 333C134 311 151 287 163 254 174 225 164 197 180 171L204 150 222 143 209 161 201 189C192 222 200 240 187 273 173 309 142 342 122 361Z', [95,140,135,225], ['M110 344Q183 288 182 239T210 152'], [[181,252,5,13,25]], 0, 672)
  a.wood('left-reaching-root', 'M105 351C156 334 185 327 215 305 243 281 274 265 316 257 361 249 397 230 427 207L449 202 467 192 455 211 427 230C398 255 363 266 325 277 287 288 273 307 240 328 201 353 175 367 131 378Z', [100,185,375,200], ['M116 365Q198 345 238 315T326 266Q397 247 457 202'], [[279,291,9,4,-24],[174,347,7,4,-18]], 2, 691)
  a.wood('left-fine-twig', 'M296 269C305 243 308 226 326 211L353 198 370 178 360 202 339 220 328 247 318 276Z', [290,175,90,105], ['M305 269Q319 228 346 211L365 190'], [], 0, 706)
  a.wood('left-front-sweep', 'M128 376C172 377 210 373 246 389 271 401 289 421 312 430L334 439 336 447 306 445 270 432 235 418 188 408 153 403Z', [125,370,215,85], ['M143 392Q225 383 261 413T326 441'], [[241,410,6,3,19]], 1, 725)
  a.rock('right-stepped-slate', 'M606 476 613 444 641 436 649 418 686 406 723 409 742 432 757 438 766 469 742 481Z', [605,400,165,85], ['M613 444 649 418 686 406 709 427 665 451Z'], ['M653 456 685 444 718 447'], 1, 748, 4)
  a.rock('right-cut-boulder', 'M759 469 766 421 791 385 822 371 853 385 874 416 867 437 893 467 864 481Z', [755,365,145,120], ['M766 421 822 371 835 407 805 457Z','M835 407 853 385 874 416 867 437 893 467 864 481Z'], ['M794 411 823 418 831 443 859 452'], 3, 766, -14)
  a.rock('right-blue-shelf', 'M874 474 881 422 913 391 920 362 954 349 980 366 990 413 998 436 993 478Z', [870,340,130,145], ['M881 422 920 362 954 349 955 397 929 439 915 478Z'], ['M898 452 934 432 962 436 982 414'], 1, 791, 7)
  a.wood('right-arching-trunk', 'M931 433C908 398 921 374 934 347 951 314 941 285 926 266 903 236 902 211 911 180 923 147 930 129 919 102L920 67 927 52 934 90 949 107C967 134 959 164 946 190 932 219 938 235 956 260 979 291 979 321 966 351 956 377 959 401 992 431L990 457 962 452Z', [900,50,100,415], ['M935 442Q922 410 952 350T946 278Q912 231 932 183T938 122L928 73','M978 447Q936 405 959 349T955 290'], [[932,226,8,13,-8],[957,323,7,13,14]], 3, 817)
  a.wood('right-bent-antler', 'M929 305C895 292 860 270 847 241 834 211 820 190 796 176 766 158 756 137 737 121L710 110 697 88 726 102 748 104 773 128C795 146 831 151 851 175 875 200 871 223 892 244L951 281Z', [690,80,270,235], ['M713 104Q758 124 781 151T836 184Q852 231 886 259L939 289'], [[841,197,8,13,-30]], 1, 838)
  a.wood('right-center-reaching', 'M930 353C873 341 835 324 807 298 787 279 771 260 742 253L676 242C630 233 605 217 571 210L537 192 555 191 593 202 634 206C679 211 704 224 748 229 789 234 811 262 835 279 870 303 901 302 945 322Z', [530,185,425,175], ['M547 195Q627 229 695 231T803 278Q855 325 934 339'], [[765,253,12,5,15],[874,318,11,4,15]], 0, 857)
  a.wood('right-exposed-root', 'M943 398C906 390 880 387 848 395 817 403 794 415 759 426L707 434 677 450 701 449 736 443 780 440C822 433 858 414 890 416L962 431Z', [670,380,300,80], ['M688 448Q768 441 823 417T951 418'], [[858,406,8,3,-7]], 3, 883)
  a.rock('front-center-chip', 'M409 488 429 466 454 458 477 473 483 490Z', [405,454,82,40], ['M429 466 454 458 446 484Z'], ['M445 468 464 481'], 2, 899, 3)
  a.rock('front-left-chip', 'M190 487 202 466 226 459 248 478 246 490Z', [186,456,65,37], ['M202 466 226 459 217 484Z'], [], 4, 907, 1)
  a.wood('front-right-rootlet', 'M533 489Q583 462 634 462L678 479 676 489Q601 466 551 495Z', [530,460,150,38], ['M539 488Q609 456 674 485'], [], 2, 916)
  a.path('M912 359q-7 14-1 23l13-8 4-19Z', '#292e29', '#87775d', 1.5)
  a.save('/public/art/scapes/branching-banks.svg')
}

writeFileSync(new URL('../../src/lib/generatedHardscapeSurfaces.js', import.meta.url), `// Generated by assets/tools/build_hardscapes.mjs; coordinates use each SVG viewBox.\nexport const expandedHardscapeSurfaces = ${JSON.stringify(expandedSurfaces, null, 2)}\n`)
console.log('Rebuilt five detailed hardscapes with three times the pieces, foreground fragments and surface-height backdrops.')
