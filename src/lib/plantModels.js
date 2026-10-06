// Cultivar-specific cut-outs with curved leaves, directional light and fine veins.
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
  const ribs = vein ? Array.from({ length: 5 }, (_, i) => {
    const y = -h * (.16 + i * .13), span = w * Math.sin((i + 1) / 7 * Math.PI) * .55
    return `<path d="M0 ${y}q${-span * .6} ${-h * .04} ${-span} ${-h * .1}M0 ${y}q${span * .6} ${-h * .04} ${span} ${-h * .1}" fill="none" stroke="#d5e6a6" stroke-opacity=".23" stroke-width=".45"/>`
  }).join('') : ''
  return `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rotation.toFixed(1)})"><path d="${paths[shape]}" fill="url(#leaf-${fill.slice(1)})" stroke="${fill}" stroke-opacity=".65" stroke-width=".45"/>${vein ? `<path d="M0 -2Q${w * .09} ${-h * .44} 0 ${(-height * .91).toFixed(1)}" fill="none" stroke="#d6e8b3" stroke-opacity=".48" stroke-width=".65"/>${ribs}` : ''}</g>`
}

const leafShape = name => /pinnatifida|proserpinaca|ceratopteris/i.test(name) ? 'lobed'
  : /nymphaea|lagenandra/i.test(name) ? 'heart'
    : /bucephalandra|cryptocoryne|aponogeton|helferi|kirin/i.test(name) ? 'wavy'
      : /bacopa|ludwigia.*(?:ovalis|repens)|anubias|lobelia|lysimachia|micranthemum/i.test(name) ? 'rounded' : 'pointed'

function palette(name, seed) {
  const red = /red|pink|purple|rubin|rosanervig|lilacina|flamingo|orange|ozelot|rose|aflame|blood|brown|bronze/i.test(name)
  const golden = /gold|white|jade|snow|pinto|marble|coin|stardust/i.test(name)
  if (red) return ['#623d36', '#934b46', '#b3644f', '#d78a66']
  if (golden) return ['#486b2b', '#7e943e', '#b3be72', '#d5cf91']
  return pick(seed, 1) > .5 ? ['#254d20', '#3d762b', '#58943a', '#8ab653'] : ['#214c32', '#35692c', '#518836', '#91af59']
}

function stems(name, seed, colors) {
  const feathered = /cabomba|myriophyllum|limnophila sessiliflora|hottonia/i.test(name)
  const whorled = /pogostemon|tonina|najas|ludwigia inclinata|limnophila/i.test(name)
  const narrow = /rotala|limnophila|myriophyllum|cabomba|mayaca|pogostemon erectus|hottonia|proserpinaca|najas/i.test(name)
  const count = 7 + Math.round(pick(seed, 2, 3))
  let result = ''
  for (let i = 0; i < count; i++) {
    const base = 38 + i * (164 / Math.max(1, count - 1)) + (pick(seed, i + 113) - .5) * 18
    const bend = (pick(seed, i + 4) - .5) * 48
    const top = 18 + pick(seed, i + 17, 65)
    result += `<path d="M${base} 227 Q${base + bend * .5} 125 ${base + bend} ${top}" fill="none" stroke="${colors[0]}" stroke-width="1.8" stroke-linecap="round"/>`
    const tiers = (narrow ? 12 : 8) + Math.round(pick(seed, i + 93, 5))
    for (let j = 0; j < tiers; j++) {
      const y = 216 - j * ((200 - top) / (tiers - 1)) + (pick(seed, i * 13 + j) - .5) * 5
      const x = base + bend * (227 - y) / (227 - top)
      const taper = .62 + Math.sin((j + 1) / (tiers + 1) * Math.PI) * .38
      const w = (narrow ? 3 + pick(seed, i * 17 + j + 21, 2.5) : 8 + pick(seed, i * 17 + j + 21, 5)) * taper
      const h = (narrow ? 16 + pick(seed, i * 17 + j + 31, 9) : 19 + pick(seed, i * 17 + j + 31, 9)) * taper
      if (feathered) {
        for (let side = -1; side <= 1; side += 2) {
          const tip = x + side * (22 + pick(seed, i + j, 7))
          result += `<path d="M${x} ${y}L${tip} ${y - 18}" stroke="${colors[0]}" stroke-width="1.3"/>`
          for (let k = 1; k <= 6; k++) result += leaf(x + (tip - x) * k / 7, y - 18 * k / 7, 2, 12, side * (65 + k * 3), colors[(j + k) % 4], false)
        }
      } else {
        const angles = whorled ? [-78, -35, 35, 78] : [-56, 56]
        for (const angle of angles) result += leaf(x, y + pick(seed, i * 19 + j + (angle > 0 ? 103 : 119), 4), w * (whorled ? .7 : 1), h, angle + (pick(seed, i * 23 + j + (angle > 0 ? 72 : 81)) - .5) * 31, colors[(i + j + (angle > 0 ? 1 : 0)) % 4], true, leafShape(name))
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
  const fan = /riccardia|monosolenium|riccia/i.test(name)
  let result = ''
  // A shallow, irregular mat of tiny leaflets, without upright stalks or roots.
  for (let i = 0; i < 28; i++) {
    const x = 24 + i * 7.1
    const y = 121 + (pick(seed, i + 9) - .5) * 5
    result += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="10" ry="${(4 + pick(seed, i + 23, 3)).toFixed(1)}" fill="${colors[0]}"/>`
  }
  for (let i = 0; i < 230; i++) {
    const x = 18 + pick(seed, i + 34, 204)
    const taper = Math.sin((x - 18) / 204 * Math.PI)
    const y = 121 + (pick(seed, i + 45) - .5) * 17 * taper
    const angle = pick(seed, i + 97, 160) - 80
    result += `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${fan ? 1.8 : .8}" ry="${(1.5 + pick(seed, i + 73, 2)).toFixed(1)}" transform="rotate(${angle.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="${colors[i % 4]}"/>`
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
  return `<circle cx="120" cy="157" r="69" fill="url(#leaf-${colors[1].slice(1)})" stroke="${colors[0]}" stroke-width=".5"/>${speckles}`
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
  const shadow = type === 'Mosses & liverworts' ? '' : '<ellipse cx="120" cy="226" rx="67" ry="5" fill="#315f54" opacity=".14" filter="url(#s)"/>'
  const leafPaint = colors.map(color => `<linearGradient id="leaf-${color.slice(1)}" x1="0" y1=".1" x2="1" y2=".85"><stop stop-color="#152b18"/><stop offset=".3" stop-color="${color}"/><stop offset=".48" stop-color="${color}"/><stop offset=".51" stop-color="#c1d68c" stop-opacity=".88"/><stop offset=".57" stop-color="${color}"/><stop offset="1" stop-color="#20371d"/></linearGradient>`).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" role="img" aria-label="${escape(name)} model"><defs>${leafPaint}<filter id="s"><feGaussianBlur stdDeviation="1.2"/></filter><filter id="leaf-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="2" seed="${seed % 127}"/><feColorMatrix type="saturate" values="0"/><feComposite in2="SourceGraphic" operator="in"/><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs>${shadow}<g filter="url(#leaf-grain)">${content}</g></svg>`
}

export const plantModelUri = (name, type) => `data:image/svg+xml,${encodeURIComponent(plantModelSvg(name, type))}`
