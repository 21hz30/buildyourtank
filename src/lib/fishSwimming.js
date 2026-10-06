import { fishWidthPercent } from './fishScale.js'
import { fishHabit, fishHabitatSites } from './fishHabits.js'

const clamp = (value, low, high) => Math.max(low, Math.min(value, high))
const hash = value => {
  let seed = [...value].reduce((seed, char) => (Math.imul(seed, 31) + char.charCodeAt(0)) >>> 0, 17)
  seed = Math.imul(seed ^ seed >>> 16, 2246822507)
  seed = Math.imul(seed ^ seed >>> 13, 3266489909)
  return (seed ^ seed >>> 16) >>> 0
}
const random = seed => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
  return seed / 4294967296
}

export function fishSwimPlan(fish, size, identity, scape = { id: 'classic' }) {
  const width = fishWidthPercent(fish, size)
  const height = width * size.lengthCm / size.heightCm / (fish.artAspectRatio || 2)
  const bounds = { left: width / 2 + 2, right: 98 - width / 2, top: height / 2 + 3, bottom: 84 - height / 2 }
  const habit = fishHabit(fish)
  const waterHeight = bounds.bottom - bounds.top
  const swimBounds = { ...bounds, top: bounds.top + waterHeight * habit.band[0], bottom: bounds.top + waterHeight * habit.band[1] }
  const fits = site => {
    const angle = Math.abs(site.angle) * Math.PI / 180
    const artHeightX = height * size.heightCm / size.lengthCm
    const artWidthY = width * size.lengthCm / size.heightCm
    // Include the entire CSS turn from horizontal to the resting tangent,
    // whose widest/tallest intermediate pose can exceed both endpoints.
    const halfWidth = (angle >= Math.atan2(artHeightX, width) ? Math.hypot(width, artHeightX) : width * Math.cos(angle) + artHeightX * Math.sin(angle)) / 2
    const halfHeight = (angle >= Math.atan2(artWidthY, height) ? Math.hypot(height, artWidthY) : height * Math.cos(angle) + artWidthY * Math.sin(angle)) / 2
    return site.x >= bounds.left && site.x <= bounds.right && site.y >= bounds.top && site.y <= bounds.bottom && site.x - halfWidth >= 2 && site.x + halfWidth <= 98 && site.y - halfHeight >= 3 && site.y + halfHeight <= 84
  }
  const sites = fishHabitatSites(scape, size, habit.materials).flatMap(site => {
    // A large pleco can rest across a branch rather than turn vertically and
    // extend through the substrate. Keep the center on the same real surface.
    const pose = [site, { ...site, angle: site.angle / 2 }, { ...site, angle: 0 }].find(fits)
    return pose ? [pose] : []
  })
  const shelteredSites = sites.filter(site => site.y >= swimBounds.top)
  const habitatSites = habit.mode === 'shelter' && shelteredSites.length ? shelteredSites : sites
  const hardscapeSites = habitatSites.filter(site => site.material !== 'glass')
  const preferredSites = hardscapeSites.length ? hardscapeSites : sites
  const seed = hash(identity)
  const rng = random(seed)
  const freeStart = {
    x: bounds.left + rng() * (bounds.right - bounds.left),
    y: swimBounds.top + rng() * (swimBounds.bottom - swimBounds.top),
    angle: 0, attached: false,
  }
  const start = preferredSites.length && ['cling', 'shelter'].includes(habit.mode) ? { ...preferredSites[seed % preferredSites.length] } : freeStart
  return {
    width, bounds, swimBounds, habit, sites, start,
    leg(position, step) {
      const rng = random((seed + Math.imul(step + 1, 2654435761)) >>> 0)
      const spanX = bounds.right - bounds.left, spanY = swimBounds.bottom - swimBounds.top
      // Long passages are interspersed with short foraging/hovering moves.
      // Preferences change the route without anchoring fish to a home point.
      const towardsRight = position.x < (bounds.left + bounds.right) / 2
      const local = ['hover', 'forage'].includes(habit.mode) && step % 4 !== 3
      let end = {
        x: local ? clamp(position.x + (rng() - .5) * spanX * .38, bounds.left, bounds.right) : bounds.left + spanX * (towardsRight ? .74 + rng() * .23 : .03 + rng() * .23),
        y: swimBounds.top + spanY * (.04 + rng() * .92),
        angle: 0, attached: false,
      }
      if (sites.length && step % 4 !== 2) {
        const pool = step % 7 === 6 ? sites : preferredSites
        let available = pool.filter(site => Math.hypot(site.x - position.x, site.y - position.y) > 3)
        if (!available.length) available = sites.filter(site => Math.hypot(site.x - position.x, site.y - position.y) > 3)
        if (available.length) end = { ...available[Math.floor(rng() * available.length)] }
      }
      const points = [position]
      const routeBounds = position.attached || end.attached ? bounds : swimBounds
      for (const progress of [.33, .67]) points.push({
        x: position.x + (end.x - position.x) * progress,
        y: clamp(position.y + (end.y - position.y) * progress + (rng() - .5) * spanY * .16, routeBounds.top, routeBounds.bottom),
      })
      points.push(end)
      // Corydoras make brief return trips; labyrinth fish visit air regularly.
      const airVisit = habit.air && (step + seed % 5) % (habit.id === 'labyrinth' ? 4 : 9) === 3
      if (airVisit) points.splice(1, 2,
        { x: position.x + (end.x - position.x) * .4, y: bounds.top },
        { x: position.x + (end.x - position.x) * .5, y: bounds.top },
      )
      if (airVisit) points.forEach((point, index) => { points[index] = { ...point, offset: [0, .46, .5, 1][index] } })
      const distanceCm = points.slice(1).reduce((distance, point, i) => distance + Math.hypot((point.x - points[i].x) * size.lengthCm / 100, (point.y - points[i].y) * size.heightCm / 100), 0)
      const speed = clamp(2.5 + fish.adultLengthCm * .35, 3, 8) * habit.speed * (.85 + rng() * .35) * (airVisit && habit.id !== 'labyrinth' ? 2.4 : 1)
      const dwellDuration = end.attached ? (habit.mode === 'browse' ? 1500 + rng() * 2500 : 7000 + rng() * 13000) : ['hover', 'forage', 'shelter'].includes(habit.mode) ? 1000 + rng() * 4000 : 0
      return { points, end, facing: Math.sign(end.x - position.x) || 1, duration: clamp(distanceCm / speed * 1000, 1800, 40000), dwellDuration, airVisit }
    },
  }
}

export const swimTransform = point => `translate(${point.x}%, ${point.y}%)`
