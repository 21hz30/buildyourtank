// Small, deterministic SVG cut-outs: one silhouette and leaf arrangement per cultivar.
// They intentionally share the aquarium's soft illustrated palette rather than imitating a photograph.
const hash = value => [...value].reduce((number, letter) => (Math.imul(number, 31) + letter.charCodeAt(0)) >>> 0, 7)
const pick = (seed, step, span = 1) => ((Math.imul(seed ^ (step * 2654435761), 2246822519) >>> 0) % 1000) / 1000 * span
const escape = value => value.replace(/[&<>"']/g, letter => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[letter])

function leaf(x, y, width, height, rotation, fill, vein = true, shape = 'pointed') {
  const w = width, h = height
  const paths = {
    rounded: `M0 0 C${-w * 1.2} ${-h * .1},${-w * 1.2} ${-h},0 ${-h} C${w * 1.2} ${-h},${w * 1.2} ${-h * .1},0 0Z`,
    heart: `M0 0 C${-w * 1.5} ${-h * .4},${-w} ${-h * 1.2},0 ${-h * .7} C${w} ${-h * 1.2},${w * 1.5} ${-h * .4},0 0Z`,
    wavy: `M0 0 Q${-w} ${-h * .12} ${-w * .5} ${-h * .25} T${-w * .6} ${-h * .5} T${-w * .4} ${-h * .75} L0 ${-h} Q${w * .7} ${-h * .8} ${w * .4} ${-h * .65} T${w * .5} ${-h * .4} T${w * .6} ${-h * .15}Z`,
    lobed: `M0 0 L${-w * .3} ${-h * .18} ${-w} ${-h * .22} ${-w * .25} ${-h * .35} ${-w * .8} ${-h * .48} ${-w * .2} ${-h * .6} ${-w * .55} ${-h * .73} 0 ${-h} ${w * .55} ${-h * .73} ${w * .2} ${-h * .6} ${w * .8} ${-h * .48} ${w * .25} ${-h * .35} ${w} ${-h * .22} ${w * .3} ${-h * .18}Z`,
    ribbon: `M0 0 Q${-w * 1.8} ${-h * .55} ${w * .3} ${-h} Q${w * 1.8} ${-h * .5} 0 0Z`,
    pointed: `M0 0 C${-w * .85} ${-h * .32},${-w * .52} ${-h * .85},0 ${-h} C${w * .52} ${-h * .85},${w * .85} ${-h * .32},0 0Z`,
  }
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation.toFixed(1)})"><path d="${paths[shape]}" fill="${fill}" stroke="#477a62" stroke-width="1.5"/>${vein ? `<path d="M0 -2V${(-height * .86).toFixed(1)}" fill="none" stroke="#d6e8b3" stroke-opacity=".58" stroke-width="1"/>` : ''}</g>`
}

const leafShape = name => /pinnatifida|proserpinaca|ceratopteris/i.test(name) ? 'lobed'
  : /nymphaea|lagenandra/i.test(name) ? 'heart'
    : /bucephalandra|cryptocoryne|aponogeton|helferi|kirin/i.test(name) ? 'wavy'
      : /bacopa|ludwigia.*(?:ovalis|repens)|anubias|lobelia|lysimachia|micranthemum/i.test(name) ? 'rounded' : 'pointed'

function palette(name, seed) {
  const red = /red|pink|purple|rubin|rosanervig|lilacina|flamingo|orange|ozelot|rose|aflame|blood|brown|bronze/i.test(name)
  const golden = /gold|white|jade|snow|pinto|marble|coin|stardust/i.test(name)
  if (red) return ['#946a6d', '#b57779', '#d29383', '#e1aa8f']
  if (golden) return ['#7a9d70', '#a9b884', '#d3d8a0', '#e7d8ad']
  return pick(seed, 1) > .5 ? ['#568a69', '#70a77b', '#8dba82', '#b2cc91'] : ['#477b6a', '#649c77', '#83ae81', '#b3ca94']
}

function stems(name, seed, colors) {
  const feathered = /cabomba|myriophyllum|limnophila sessiliflora|hottonia/i.test(name)
  const whorled = /pogostemon|tonina|najas|ludwigia inclinata|limnophila/i.test(name)
  const narrow = /rotala|limnophila|myriophyllum|cabomba|mayaca|pogostemon erectus|hottonia|proserpinaca|najas/i.test(name)
  const count = 4 + Math.round(pick(seed, 2, 2))
  let result = ''
  for (let i = 0; i < count; i++) {
    const base = 38 + i * (164 / Math.max(1, count - 1))
    const bend = (pick(seed, i + 4) - .5) * 31
    const top = 27 + pick(seed, i + 17, 44)
    result += `<path d="M${base} 227 Q${base + bend * .8} 125 ${base + bend} ${top}" fill="none" stroke="${colors[0]}" stroke-width="3.3" stroke-linecap="round"/>`
    const tiers = 5 + Math.round(pick(seed, 93, 3))
    for (let j = 0; j < tiers; j++) {
      const y = 200 - j * (150 / (tiers - 1)) + pick(seed, i * 13 + j, 6)
      const x = base + bend * (227 - y) / (227 - top)
      const w = narrow ? 6 + pick(seed, i + j + 21, 3) : 12 + pick(seed, i + j + 21, 5)
      const h = narrow ? 29 + pick(seed, i + j + 31, 7) : 20 + pick(seed, i + j + 31, 6)
      if (feathered) {
        for (let side = -1; side <= 1; side += 2) {
          const tip = x + side * (22 + pick(seed, i + j, 7))
          result += `<path d="M${x} ${y}L${tip} ${y - 18}" stroke="${colors[0]}" stroke-width="1.3"/>`
          for (let k = 1; k <= 6; k++) result += leaf(x + (tip - x) * k / 7, y - 18 * k / 7, 2, 12, side * (65 + k * 3), colors[(j + k) % 4], false)
        }
      } else {
        const angles = whorled ? [-78, -35, 35, 78] : [-56, 56]
        for (const angle of angles) result += leaf(x, y, w * (whorled ? .7 : 1), h, angle + pick(seed, i + j + 72, 12), colors[(i + j + (angle > 0 ? 1 : 0)) % 4], true, leafShape(name))
      }
    }
  }
  return result
}

function rosette(name, seed, colors, grass = false) {
  const blades = (grass ? 16 : /echinodorus|aponogeton|nymphaea/i.test(name) ? 9 : 12) + Math.round(pick(seed, 3, 4))
  let result = ''
  for (let i = 0; i < blades; i++) {
    const angle = -32 + i * 64 / (blades - 1) + (pick(seed, i + 5) - .5) * 9
    const height = (grass ? 128 : 105) + pick(seed, i + 22, grass ? 88 : 100)
    const narrow = /spiralis|crispatula|crinum|blyxa|eriocaulon/i.test(name)
    const width = grass ? (/eleocharis|juncus/i.test(name) ? 1.1 : 3) + pick(seed, i + 43, 3) : narrow ? 4 + pick(seed, i + 43, 5) : 14 + pick(seed, i + 43, 11)
    result += leaf(120 + (pick(seed, i + 53) - .5) * 20, 226, width, height, angle, colors[i % colors.length], !grass, grass ? 'ribbon' : leafShape(name))
  }
  return `<g transform="translate(120 0) scale(.76 1) translate(-120 0)">${result}</g>`
}

function rhizome(name, seed, colors) {
  const pinnate = /bolbitis/i.test(name)
  const fern = /microsorum/i.test(name)
  let result = '<path d="M50 222 Q120 214 191 224" stroke="#786d53" stroke-width="8" fill="none" stroke-linecap="round"/>'
  for (let i = 0; i < 11; i++) {
    const x = 62 + i * 12
    const y = 82 + pick(seed, i + 6, 55)
    const lean = (i - 5) * 5
    result += `<path d="M${x} 220 Q${x + lean * .4} 165 ${x + lean} ${y}" stroke="${colors[0]}" stroke-width="2.6" fill="none"/>`
    if (pinnate) {
      for (let j = 0; j < 7; j++) {
        const fy = 188 - j * 14
        const fx = x + lean * (220 - fy) / (220 - y)
        result += leaf(fx - 2, fy, 6, 20, -65, colors[(i + j) % 4], false)
        result += leaf(fx + 2, fy - 4, 6, 20, 65, colors[(i + j + 1) % 4], false)
      }
    } else if (fern) {
      const baseY = 208, height = baseY - y + 20
      const width = /narrow|needle|trident/i.test(name) ? 6 : 11 + pick(seed, i + 33, 8)
      result += leaf(x, baseY, width, height, lean * .3, colors[i % 4])
      if (/trident|windelov/i.test(name)) for (const side of [-1, 1]) result += leaf(x + lean * .5, y + (/windelov/i.test(name) ? 18 : 65), width * .65, /windelov/i.test(name) ? 24 : 65, side * 32, colors[(i + 1) % 4])
    } else {
      const narrow = /angustifolia|needle|pangolino|kedagang/i.test(name)
      const round = /coin|petite|bonsai/i.test(name)
      const width = (narrow ? 5 : round ? 16 : /anubias/i.test(name) ? 18 : 10) + pick(seed, i + 65, 5)
      const height = (round ? 28 : narrow ? 58 : /anubias/i.test(name) ? 48 : 35) + pick(seed, i + 83, 10)
      result += leaf(x + lean, y + 18, width, height, lean * .35, colors[i % 4], true, leafShape(name))
    }
  }
  return result
}

function moss(name, seed, colors) {
  let result = ''
  for (let i = 0; i < 14; i++) {
    const x = 40 + pick(seed, i + 9, 155)
    const top = 75 + pick(seed, i + 23, 74)
    result += `<path d="M${x} 222 Q${x + (pick(seed, i + 34) - .5) * 34} 150 ${x + (pick(seed, i + 45) - .5) * 38} ${top}" stroke="${colors[0]}" stroke-width="2" fill="none"/>`
    for (let j = 0; j < 8; j++) {
      const y = 205 - j * 14
      const drift = (pick(seed, i + 45) - .5) * (222 - y) / 4
      const fan = /riccardia|monosolenium|riccia/i.test(name)
      const size = /christmas|vesicularia/i.test(name) ? 19 - j * 1.7 : 8 + pick(seed, i + j + 97, 7)
      const angle = /flame|erect/i.test(name) ? 22 : 58
      result += leaf(x + drift, y, fan ? 8 : 3, size, -angle, colors[(i + j) % 4], false, fan ? 'lobed' : 'pointed')
      result += leaf(x + drift, y - 3, fan ? 8 : 3, size, angle, colors[(i + j + 1) % 4], false, fan ? 'lobed' : 'pointed')
    }
  }
  return result
}

function carpet(name, seed, colors) {
  if (/helanthium|littorella/i.test(name)) return `<g transform="translate(0 148) scale(1 .34)">${rosette(name, seed, colors, true)}</g>`
  let result = ''
  for (let i = 0; i < 28; i++) {
    const x = 24 + pick(seed, i + 3, 191)
    const y = 154 + pick(seed, i + 37, 59)
    result += `<path d="M${x} 226 Q${x + 4} ${y + 15} ${x} ${y}" stroke="${colors[0]}" stroke-width="2" fill="none"/>`
    if (/marsilea|hydrocotyle/i.test(name)) {
      const lobes = /hydrocotyle/i.test(name) ? 3 : 4
      for (let k = 0; k < lobes; k++) result += leaf(x, y, 7 + pick(seed, i + 11, 2), 12, k * 360 / lobes, colors[(i + k) % 4], false, 'heart')
    } else {
      const broad = /staurogyne/i.test(name)
      result += leaf(x - 3, y + 6, broad ? 10 : 7, broad ? 24 : 12, -49, colors[i % 4], false, broad ? 'pointed' : 'rounded')
      result += leaf(x + 3, y + 4, broad ? 10 : 7, broad ? 24 : 12, 49, colors[(i + 1) % 4], false, broad ? 'pointed' : 'rounded')
    }
  }
  return result
}

function floating(name, seed, colors) {
  let result = '<path d="M24 79 Q121 89 218 80" stroke="#dce8dd" stroke-opacity=".7" fill="none" stroke-width="2"/>'
  for (let i = 0; i < 13; i++) {
    const x = 27 + i * 15
    const y = 61 + pick(seed, i + 11, 22)
    result += `<path d="M${x} ${y + 13} Q${x + 5} 133 ${x - 4} ${147 + pick(seed, i + 32, 45)}" stroke="#a79274" stroke-width="1.3" fill="none"/>`
    result += leaf(x, y + 16, /spirodela/i.test(name) ? 7 : 14 + pick(seed, i + 24, 5), /spirodela/i.test(name) ? 12 : 23, (pick(seed, i + 54) - .5) * 34, colors[i % 4], true, /limnobium/i.test(name) ? 'heart' : 'rounded')
  }
  return result
}

function algaeBall(seed, colors) {
  let speckles = ''
  for (let i = 0; i < 55; i++) {
    const angle = pick(seed, i + 5, Math.PI * 2)
    const radius = Math.sqrt(pick(seed, i + 75)) * 66
    speckles += `<circle cx="${(120 + Math.cos(angle) * radius).toFixed(1)}" cy="${(157 + Math.sin(angle) * radius).toFixed(1)}" r="${(1.5 + pick(seed, i + 105, 3)).toFixed(1)}" fill="${colors[i % 4]}" opacity=".9"/>`
  }
  return `<circle cx="120" cy="157" r="69" fill="${colors[0]}" stroke="#477a62" stroke-width="3"/>${speckles}`
}

export function plantModelSvg(name, type) {
  const seed = hash(name)
  const colors = palette(name, seed)
  const content = type === 'Floating plants' ? floating(name, seed, colors)
    : type === 'Algae balls' ? algaeBall(seed, colors)
    : type === 'Mosses & liverworts' ? moss(name, seed, colors)
      : type === 'Carpeting plants' ? carpet(name, seed, colors)
        : type === 'Grass-like plants' ? rosette(name, seed, colors, true)
          : type === 'Rhizome & epiphytes' ? rhizome(name, seed, colors)
            : type === 'Rosettes & swords' ? rosette(name, seed, colors)
              : stems(name, seed, colors)
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="Illustrated ${escape(name)}"><defs><filter id="s"><feGaussianBlur stdDeviation="1.2"/></filter></defs><ellipse cx="120" cy="226" rx="67" ry="5" fill="#315f54" opacity=".14" filter="url(#s)"/>${content}</svg>`
}

export const plantModelUri = (name, type) => `data:image/svg+xml,${encodeURIComponent(plantModelSvg(name, type))}`
