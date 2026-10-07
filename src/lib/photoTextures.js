import { plantAlpha, plantPhotoHasBackdrop } from './photoModels'
import { segmentFish } from './photoSegmentation'

const cache = new Map()
const canvas = (width, height) => Object.assign(document.createElement('canvas'), { width, height })

async function isolate(image, spec, type, name) {
  const limit = spec.bounds && !spec.contour ? 320 : 700
  const scale = Math.min(1, limit / Math.max(image.naturalWidth, image.naturalHeight))
  const width = Math.round(image.naturalWidth * scale), height = Math.round(image.naturalHeight * scale)
  const work = canvas(width, height), ctx = work.getContext('2d', { willReadFrequently: true })
  ctx.drawImage(image, 0, 0, width, height)
  const pixels = ctx.getImageData(0, 0, width, height), data = pixels.data
  if (type === 'plant') {
    const red = /red|pink|purple|rubin|lilac|flamingo|orange|rose|aflame|blood|brown|bronze|alternanthera|ludwigia|rotala/i.test(name)
    const coverage = new Float32Array(height)
    let cupTop = height, neutralRun = 0, seenFoliage = false
    for (let y = 0; y < height; y++) {
      let neutral = 0
      for (let x = 0; x < width; x++) {
        const i = (y * width + x) * 4, r = data[i], g = data[i + 1], b = data[i + 2]
        const alpha = plantAlpha(r, g, b, red)
        coverage[y] += alpha
        if (x > width * .18 && x < width * .82 && Math.max(r,g,b) < 224 && Math.min(r,g,b) > 40 && Math.max(r,g,b) - Math.min(r,g,b) < 26) neutral++
        data[i + 3] *= alpha
      }
      if (coverage[y] > width * .05) seenFoliage = true
      if (seenFoliage && y > height * .3 && neutral > width * .19) neutralRun++
      else neutralRun = 0
      if (neutralRun === 4) { cupTop = y - 3; break }
    }
    // A clear tissue-culture cup can carry a green printed label. Stop at the
    // first sustained gap below the leafy crown, before any packaging graphics.
    if (spec.plantType === 'Carpeting plants' || spec.plantType === 'Mosses & liverworts') {
      let peak = 0
      for (let y = 0; y < height * .8; y++) if (coverage[y] > coverage[peak]) peak = y
      let gap = 0
      for (let y = peak + 1; y < Math.min(cupTop, height); y++) {
        gap = coverage[y] < coverage[peak] * .16 ? gap + 1 : 0
        if (gap === 5) { cupTop = y - 4; break }
      }
    }
    for (let y = cupTop; y < height; y++) for (let x = 0; x < width; x++) data[(y * width + x) * 4 + 3] = 0
  } else if (spec.contour) {
    const outline = canvas(width, height), mask = outline.getContext('2d')
    const points = spec.points.map(([x,y]) => [x * width, y * height])
    const last = points.at(-1), first = points[0]
    mask.beginPath(); mask.moveTo((last[0] + first[0]) / 2, (last[1] + first[1]) / 2)
    points.forEach(([x,y], i) => {
      const next = points[(i + 1) % points.length]
      mask.quadraticCurveTo(x, y, (x + next[0]) / 2, (y + next[1]) / 2)
    })
    mask.closePath(); mask.fill()
    const alpha = mask.getImageData(0, 0, width, height).data
    for (let i = 3; i < data.length; i += 4) data[i] *= alpha[i] / 255
  } else if (spec.bounds) {
    const alpha = await segmentFish(pixels, spec.bounds, spec.core)
    for (let i = 0; i < alpha.length; i++) data[i * 4 + 3] = alpha[i]
  } else if (!spec.points && !spec.alpha) {
    // Flood only from the photo's borders, keeping white scales, eyes and dark
    // body markings. Connected background pixels become transparent.
    const marked = new Uint8Array(width * height), queue = new Int32Array(width * height)
    const samples = []
    for (let x = 0; x < width; x += Math.max(1, Math.floor(width / 16))) for (const y of [0, height - 1]) samples.push([data[(y * width + x) * 4], data[(y * width + x) * 4 + 1], data[(y * width + x) * 4 + 2]])
    let head = 0, tail = 0
    const background = p => {
      const i = p * 4, r = data[i], g = data[i + 1], b = data[i + 2]
      if (Math.min(r, g, b) > 216 && Math.max(r, g, b) - Math.min(r, g, b) < 38) return true
      return !spec.white && samples.some(([sr, sg, sb]) => Math.hypot(r - sr, g - sg, b - sb) < 33)
    }
    const push = p => { if (!marked[p] && background(p)) { marked[p] = 1; queue[tail++] = p } }
    for (let x = 0; x < width; x++) { push(x); push((height - 1) * width + x) }
    for (let y = 0; y < height; y++) { push(y * width); push(y * width + width - 1) }
    while (head < tail) {
      const p = queue[head++], x = p % width
      if (x) push(p - 1)
      if (x < width - 1) push(p + 1)
      if (p >= width) push(p - width)
      if (p < width * (height - 1)) push(p + width)
    }
    for (let p = 0; p < marked.length; p++) {
      if (marked[p]) data[p * 4 + 3] = 0
      else if (marked[p - 1] || marked[p + 1] || marked[p - width] || marked[p + width]) data[p * 4 + 3] *= .65
    }
  }
  let left = width, right = 0, top = height, bottom = 0
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (data[(y * width + x) * 4 + 3] > 80) {
    left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y)
  }
  if (left >= right || top >= bottom) throw new Error('No visible photo subject')
  if (type === 'plant' && plantPhotoHasBackdrop(data, width, height, [left, top, right, bottom])) throw new Error('Plant photograph contains aquarium surroundings')
  ctx.putImageData(pixels, 0, 0)
  const cropped = canvas(right - left + 1, bottom - top + 1)
  cropped.getContext('2d').drawImage(work, left, top, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height)
  const angle = (spec.rotate || 0) * Math.PI / 180
  const oriented = canvas(Math.ceil(cropped.width * Math.abs(Math.cos(angle)) + cropped.height * Math.abs(Math.sin(angle))), Math.ceil(cropped.width * Math.abs(Math.sin(angle)) + cropped.height * Math.abs(Math.cos(angle))))
  const output = oriented.getContext('2d')
  output.translate(oriented.width / 2, oriented.height / 2)
  output.scale(spec.facing === -1 ? -1 : 1, 1)
  output.rotate(angle)
  output.drawImage(cropped, -cropped.width / 2, -cropped.height / 2)
  return { canvas: oriented, aspectRatio: oriented.width / oriented.height }
}

export function photoTexture(spec, type, name) {
  const key = `${type}:${spec.source}`
  if (!cache.has(key)) {
    const promise = new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = () => { isolate(image, spec, type, name).then(resolve, reject) }
      image.onerror = () => reject(new Error(`Could not load ${spec.source}`))
      image.src = spec.source
    })
    cache.set(key, promise)
    if (cache.size > 64) cache.delete(cache.keys().next().value)
    promise.catch(() => cache.delete(key))
  }
  return cache.get(key)
}

// One scheduler for the whole page. Hidden tanks and reduced-motion viewers
// get a still photo; unmounted fish remove their callbacks immediately.
const painters = new Set()
let frame = null, previous = 0
function tick(now) {
  if (now - previous > 32) { previous = now; painters.forEach(paint => paint(now / 1000)) }
  frame = painters.size ? requestAnimationFrame(tick) : null
}
export function subscribePhotoMotion(paint) {
  painters.add(paint)
  if (frame === null) frame = requestAnimationFrame(tick)
  return () => { painters.delete(paint); if (!painters.size && frame !== null) { cancelAnimationFrame(frame); frame = null } }
}
